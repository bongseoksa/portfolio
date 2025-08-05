import { supabase } from '@/lib/superbaseClient';
import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

const isLocal = import.meta.env.VITE_ENV === 'local';

const sendToServer = async (metric: Metric) => {
  if (isLocal) {
    const { error } = await supabase.from('web_vitals').insert([
      {
        name: metric.name,
        value: metric.value,
        delta: metric.delta,
        rating: metric.rating,
        navigation_type: metric.navigationType
      }
    ]);
    if (error) console.error('[Supabase insert error]', error);
    return;
  }

  fetch('/api/vitals', {
    method: 'POST',
    body: JSON.stringify(metric),
    headers: { 'Content-Type': 'application/json' }
  });
};

/** 성능지표 데이터 조회 */
const getVitals = async () => {
  if (isLocal) {
    // ✅ 로컬 환경 → Supabase 직접 조회
    const { data, error } = await supabase
      .from('web_vitals')
      .select('name, value, rating, inserted_at')
      .order('inserted_at', { ascending: false });

    if (error) {
      console.error('[Supabase select error]', error);
      return [];
    }

    return data;
  }

  // ✅ 서버리스 환경 → API 경유 조회
  try {
    const response = await fetch('/api/vitals-data');
    if (!response.ok) throw new Error('API fetch failed');
    return await response.json();
  } catch (err) {
    console.error('[API fetch error]', err);
    return [];
  }
};

/** 성능지표 superbase로 저장 */
const postVitals = () => {
  onCLS(sendToServer);
  onFCP(sendToServer);
  onLCP(sendToServer);
  onTTFB(sendToServer);
  onINP?.(sendToServer);
};

export { getVitals, postVitals };
