/** 서버리스 api 정의 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const metric = req.body;

    console.log('📊 Web Vital Received:', metric);

    res.status(200).json({ message: 'Received' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
