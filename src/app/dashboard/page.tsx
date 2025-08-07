import { getVitals } from '@/api/vitals';
import { ChartDataPoint, DbMetricEntry, LatestMetrics } from '@/types/dashboardTypes';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MousePointer,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GaugeChart from '@/components/chart/gaugeChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LineChart from '@/components/chart/lineChart';
import DonutChart from '@/components/chart/donutChart';
import BarChart from '@/components/chart/barChart';

export default function DashboardPage() {
  const [dbMetrics, setDbMetrics] = useState<DbMetricEntry[]>([]);
  const temp = async () => {
    const res = await getVitals();
    console.log('getVital', res);
    setDbMetrics(res);
  };

  useEffect(() => {
    temp();
  }, []);

  // 데이터가 없는 경우 처리
  if (dbMetrics.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>데이터 없음</CardTitle>
            <CardDescription>
              표시할 데이터가 없습니다. 더미 데이터를 생성하거나 Supabase에 데이터를 추가해주세요.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // KPI 카드에 표시할 최신 데이터 추출
  const latestMetricsMap = new Map<string, DbMetricEntry>();
  dbMetrics.forEach((metric) => {
    const existing = latestMetricsMap.get(metric.name);
    if (!existing || new Date(metric.created_at) > new Date(existing.created_at)) {
      latestMetricsMap.set(metric.name, metric);
    }
  });

  const latestData: LatestMetrics = {
    CLS: latestMetricsMap.get('CLS') || { value: 0, rating: 'good' },
    FCP: latestMetricsMap.get('FCP') || { value: 0, rating: 'good' },
    LCP: latestMetricsMap.get('LCP') || { value: 0, rating: 'good' },
    TTFB: latestMetricsMap.get('TTFB') || { value: 0, rating: 'good' },
    INP: latestMetricsMap.get('INP') || { value: 0, rating: 'good' }
  } as LatestMetrics; // 타입 단언으로 오류 방지

  // 차트에서 사용할 데이터 포맷팅
  const chartData: ChartDataPoint[] = dbMetrics.map((d) => ({
    timestamp: new Date(d.created_at),
    value: d.value,
    rating: d.rating,
    name: d.name
  }));

  const formatMetricValue = (metricName: keyof LatestMetrics, value: number) => {
    switch (metricName) {
      case 'CLS':
        return value.toFixed(3);
      case 'FCP':
      case 'LCP':
      case 'TTFB':
      case 'INP':
        return `${Math.round(value)}ms`;
      default:
        return value.toString();
    }
  };

  const getStatusBadgeVariant = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good':
        return 'default';
      case 'needs-improvement':
        return 'secondary';
      case 'poor':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusBadgeIcon = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      case 'needs-improvement':
        return <AlertTriangle className="h-4 w-4" />;
      case 'poor':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">웹 성능 모니터링 대시보드</h1>
          <p className="text-muted-foreground">
            Core Web Vitals 누적 데이터 • 마지막 업데이트: {new Date().toLocaleTimeString('ko-KR')}
          </p>
        </div>
      </div>

      {/* Core Web Vitals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CLS</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMetricValue('CLS', latestData.CLS.value)}
            </div>
            <p className="text-xs text-muted-foreground mb-2">Cumulative Layout Shift</p>
            <Badge variant={getStatusBadgeVariant(latestData.CLS.rating)} className="gap-1">
              {getStatusBadgeIcon(latestData.CLS.rating)}
              {latestData.CLS.rating === 'good'
                ? '좋음'
                : latestData.CLS.rating === 'needs-improvement'
                  ? '개선필요'
                  : '나쁨'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FCP</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMetricValue('FCP', latestData.FCP.value)}
            </div>
            <p className="text-xs text-muted-foreground mb-2">First Contentful Paint</p>
            <Badge variant={getStatusBadgeVariant(latestData.FCP.rating)} className="gap-1">
              {getStatusBadgeIcon(latestData.FCP.rating)}
              {latestData.FCP.rating === 'good'
                ? '좋음'
                : latestData.FCP.rating === 'needs-improvement'
                  ? '개선필요'
                  : '나쁨'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LCP</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMetricValue('LCP', latestData.LCP.value)}
            </div>
            <p className="text-xs text-muted-foreground mb-2">Largest Contentful Paint</p>
            <Badge variant={getStatusBadgeVariant(latestData.LCP.rating)} className="gap-1">
              {getStatusBadgeIcon(latestData.LCP.rating)}
              {latestData.LCP.rating === 'good'
                ? '좋음'
                : latestData.LCP.rating === 'needs-improvement'
                  ? '개선필요'
                  : '나쁨'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TTFB</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMetricValue('TTFB', latestData.TTFB.value)}
            </div>
            <p className="text-xs text-muted-foreground mb-2">Time to First Byte</p>
            <Badge variant={getStatusBadgeVariant(latestData.TTFB.rating)} className="gap-1">
              {getStatusBadgeIcon(latestData.TTFB.rating)}
              {latestData.TTFB.rating === 'good'
                ? '좋음'
                : latestData.TTFB.rating === 'needs-improvement'
                  ? '개선필요'
                  : '나쁨'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">INP</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMetricValue('INP', latestData.INP.value)}
            </div>
            <p className="text-xs text-muted-foreground mb-2">Interaction to Next Paint</p>
            <Badge variant={getStatusBadgeVariant(latestData.INP.rating)} className="gap-1">
              {getStatusBadgeIcon(latestData.INP.rating)}
              {latestData.INP.rating === 'good'
                ? '좋음'
                : latestData.INP.rating === 'needs-improvement'
                  ? '개선필요'
                  : '나쁨'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Performance Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            성능 점수 개요
          </CardTitle>
          <CardDescription>Core Web Vitals 기준 전체 성능 평가</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <GaugeChart
              value={
                latestData.CLS.rating === 'good'
                  ? 100
                  : latestData.CLS.rating === 'needs-improvement'
                    ? 50
                    : 0
              }
              label="CLS"
              max={100}
            />
            <GaugeChart
              value={
                latestData.FCP.rating === 'good'
                  ? 100
                  : latestData.FCP.rating === 'needs-improvement'
                    ? 50
                    : 0
              }
              label="FCP"
              max={100}
            />
            <GaugeChart
              value={
                latestData.LCP.rating === 'good'
                  ? 100
                  : latestData.LCP.rating === 'needs-improvement'
                    ? 50
                    : 0
              }
              label="LCP"
              max={100}
            />
            <GaugeChart
              value={
                latestData.TTFB.rating === 'good'
                  ? 100
                  : latestData.TTFB.rating === 'needs-improvement'
                    ? 50
                    : 0
              }
              label="TTFB"
              max={100}
            />
            <GaugeChart
              value={
                latestData.INP.rating === 'good'
                  ? 100
                  : latestData.INP.rating === 'needs-improvement'
                    ? 50
                    : 0
              }
              label="INP"
              max={100}
            />
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">전체 개요</TabsTrigger>
          <TabsTrigger value="loading">로딩 성능</TabsTrigger>
          <TabsTrigger value="interactivity">상호작용</TabsTrigger>
          <TabsTrigger value="stability">시각적 안정성</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals 추이</CardTitle>
                <CardDescription>시간별 주요 성능 지표 변화</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={chartData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>성능 지표 등급 분포</CardTitle>
                <CardDescription>누적 데이터 기준 성능 지표 등급 비율</CardDescription>
              </CardHeader>
              <CardContent>
                <DonutChart data={chartData} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>LCP 값 분포</CardTitle>
              <CardDescription>누적 데이터 기준 LCP 값 히스토그램</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart data={chartData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loading" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>FCP 추이</CardTitle>
                <CardDescription>First Contentful Paint 시간별 변화</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={chartData} metric="FCP" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>LCP 추이</CardTitle>
                <CardDescription>Largest Contentful Paint 시간별 변화</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={chartData} metric="LCP" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>TTFB 추이</CardTitle>
              <CardDescription>Time to First Byte 시간별 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart data={chartData} metric="TTFB" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>INP 추이</CardTitle>
              <CardDescription>Interaction to Next Paint 시간별 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart data={chartData} metric="INP" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CLS 추이</CardTitle>
              <CardDescription>Cumulative Layout Shift 시간별 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart data={chartData} metric="CLS" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
