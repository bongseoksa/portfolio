/** 서버리스 api - Supabase ping health check */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET 메소드만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const startTime = Date.now();
  let status: 'success' | 'error' = 'success';
  let httpCode = 200;
  let errorMessage: string | null = null;

  try {
    // Supabase 연결 테스트 - ping 테이블에 가벼운 쿼리 수행
    const { error } = await supabase.from('ping').select('id', { count: 'exact', head: true });

    if (error) {
      console.error('[Supabase ping error]', error);
      status = 'error';
      httpCode = 500;
      errorMessage = error.message;
    }

    // 응답 시간 계산
    const responseTime = Date.now() - startTime;

    // User-agent 확인하여 트리거 소스 결정
    const userAgent = req.headers['user-agent'] || '';
    const triggeredBy = userAgent.includes('github-actions') ? 'github_actions' : 'manual';

    // ping 결과를 테이블에 기록
    const { error: insertError } = await supabase.from('ping').insert([
      {
        status,
        http_code: httpCode,
        response_time_ms: responseTime,
        error_message: errorMessage,
        triggered_by: triggeredBy
      }
    ]);

    if (insertError) {
      console.error('[Supabase insert error]', insertError);
      // 로깅 실패해도 ping 자체는 성공으로 처리
      return res.status(200).json({
        success: true,
        message: 'Ping successful but logging failed',
        response_time_ms: responseTime
      });
    }

    return res.status(httpCode).json({
      success: status === 'success',
      message: status === 'success' ? 'Ping successful' : 'Ping failed',
      response_time_ms: responseTime,
      error: errorMessage
    });
  } catch (err) {
    console.error('[Unexpected ping error]', err);

    // 에러 발생 시에도 테이블에 기록 시도
    const responseTime = Date.now() - startTime;
    await supabase
      .from('ping')
      .insert([
        {
          status: 'error',
          http_code: 500,
          response_time_ms: responseTime,
          error_message: String(err),
          triggered_by: 'github_actions'
        }
      ])
      .catch(console.error);

    return res.status(500).json({
      success: false,
      error: String(err),
      response_time_ms: responseTime
    });
  }
}
