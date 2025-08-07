/** 서버리스 api 정의 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

/** 데이터 조회 */
const handleGet = async (req: VercelRequest, res: VercelResponse) => {
  const { data, error } = await supabase
    .from('web_vitals')
    .select('name, value, rating, inserted_at')
    .order('inserted_at', { ascending: false });

  if (error) {
    console.error('[Supabase select error]', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }

  return res.status(200).json(data);
};

/** 데이터 추가 */
const handlePost = async (req: VercelRequest, res: VercelResponse) => {
  // body가 파싱되어 있지 않으면 직접 파싱
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { name, value, delta, rating, navigationType } = body;

  const { error } = await supabase.from('web_vitals').insert([
    {
      name,
      value,
      delta,
      rating,
      navigation_type: navigationType
    }
  ]);

  if (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }

  return res.status(200).json({ success: true });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') return await handlePost(req, res);
  else if (req.method === 'GET') return await handleGet(req, res);
  else {
    return res.status(405).end();
  }
}
