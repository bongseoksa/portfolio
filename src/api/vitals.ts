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

const postVitals = () => {
  onCLS(sendToServer);
  onFCP(sendToServer);
  onLCP(sendToServer);
  onTTFB(sendToServer);
  onINP?.(sendToServer);
};

export { postVitals };
