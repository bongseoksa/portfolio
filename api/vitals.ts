/** 서버리스 api 정의 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, value, delta, rating, navigationType } = req.body;

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
}
