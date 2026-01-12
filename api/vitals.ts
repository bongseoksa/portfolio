/** 서버리스 api 정의 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
} else if (!supabaseUrl.startsWith('https://') && !supabaseUrl.startsWith('http://')) {
  console.error('Invalid Supabase URL: must start with http:// or https://');
}

const supabase = (supabaseUrl && supabaseKey && (supabaseUrl.startsWith('https://') || supabaseUrl.startsWith('http://')))
  ? createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    }
  })
  : null;

/** 데이터 조회 */
const handleGet = async (req: VercelRequest, res: VercelResponse) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized' });
  }

  const { data, error } = await supabase
    .from('web_vitals')
    .select('name, value, rating, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase select error]', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }

  return res.status(200).json(data);
};

/** 데이터 추가 */
const handlePost = async (req: VercelRequest, res: VercelResponse) => {
  try {
    // body가 파싱되어 있지 않으면 직접 파싱
    console.log('raw req.body:', req.body);
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log('parsed body:', body);

    const { name, value, delta, rating, navigationType } = body;

    if (!supabase) {
      return res.status(500).json({ error: 'Supabase client not initialized' });
    }

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
      console.error('Supabase insert error:', error);
      return res.status(500).json({ success: false, error });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ success: false, error: String(err) });
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') return await handlePost(req, res);
  else if (req.method === 'GET') return await handleGet(req, res);
  else {
    return res.status(405).end();
  }
}
