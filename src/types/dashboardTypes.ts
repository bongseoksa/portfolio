// Supabase에서 가져올 데이터의 인터페이스 (더미 데이터 구조에 맞춤)
export interface DbMetricEntry {
  created_at: string; // timestamptz (ISO 8601 string)
  name: 'INP' | 'TTFB' | 'CLS' | 'LCP' | 'FCP'; // text
  value: number; // float8
  delta: number; // float8 (더미 데이터에서는 사용하지 않지만, 구조 유지를 위해 포함)
  rating: 'good' | 'needs-improvement' | 'poor'; // text
  navigation_type: string; // text (더미 데이터에서는 사용하지 않지만, 구조 유지를 위해 포함)
}

// 차트에서 사용할 데이터 포인트 (타임스탬프를 Date 객체로 변환)
export interface ChartDataPoint {
  timestamp: Date;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  name: 'INP' | 'TTFB' | 'CLS' | 'LCP' | 'FCP';
}

// KPI 카드에 표시할 최신 데이터
export interface LatestMetrics {
  CLS: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  FCP: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  LCP: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  TTFB: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  INP: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
}
