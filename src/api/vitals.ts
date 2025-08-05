import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

const sendToVercel = (metric: Metric) => {
  fetch('/api/vitals', {
    method: 'POST',
    body: JSON.stringify(metric),
    headers: { 'Content-Type': 'application/json' }
  });
};

const postVitals = () => {
  onCLS(sendToVercel);
  onFCP(sendToVercel);
  onLCP(sendToVercel);
  onTTFB(sendToVercel);
  onINP?.(sendToVercel);
};

export { postVitals };
