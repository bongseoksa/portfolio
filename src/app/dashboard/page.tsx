import { getVitals } from '@/api/vitals';
import { useEffect } from 'react';

export default function DashboardPage() {
  const temp = async () => {
    const res = await getVitals();
    console.log('getVital', res);
  };

  useEffect(() => {
    temp();
  }, []);

  return (
    <div>
      <h1>Web Vitals Dashboard</h1>
      {/* 필터 UI + D3 차트 넣을 위치 */}
    </div>
  );
}
