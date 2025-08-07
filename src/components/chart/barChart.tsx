'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { ChartDataPoint } from '@/types/dashboardTypes';

interface BarChartProps {
  data: ChartDataPoint[];
  metric?: 'CLS' | 'FCP' | 'LCP' | 'TTFB' | 'INP'; // 막대 차트의 기준이 될 메트릭
}

export default function BarChart({ data, metric = 'LCP' }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.bottom - margin.top;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const filteredData = data.filter((d) => d.name === metric);
    if (!filteredData.length) {
      g.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#6b7280')
        .text('데이터가 없습니다.');
      return;
    }

    // Create histogram bins for the selected metric
    const histogram = d3
      .bin<ChartDataPoint, number>()
      .value((d) => d.value)
      .domain(d3.extent(filteredData, (d) => d.value) as [number, number]) // 동적으로 도메인 설정
      .thresholds(12);

    const bins = histogram(filteredData);

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, (d) => d.value) as [number, number])
      .range([0, width])
      .nice(); // 눈금을 보기 좋게 조정

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length) || 1])
      .nice()
      .range([height, 0]);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale).tickFormat((d: d3.NumberValue) => {
          const value = typeof d === 'number' ? d : Number(d.valueOf());
          return metric === 'CLS' ? value.toFixed(2) : `${value}ms`;
        })
      );

    g.append('g').call(d3.axisLeft(yScale));
    const thresholds = getMetricThresholds(metric);
    if (thresholds) {
      // Good threshold
      g.append('line')
        .attr('x1', xScale(thresholds.good))
        .attr('x2', xScale(thresholds.good))
        .attr('y1', 0)
        .attr('y2', height)
        .attr('stroke', '#10b981')
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.7);

      // Poor threshold
      g.append('line')
        .attr('x1', xScale(thresholds.poor))
        .attr('x2', xScale(thresholds.poor))
        .attr('y1', 0)
        .attr('y2', height)
        .attr('stroke', '#ef4444')
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.7);
    }

    // Add bars with color coding
    g.selectAll('.bar')
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.x0 || 0))
      .attr('y', (d) => yScale(d.length))
      .attr('width', (d) => Math.max(0, xScale(d.x1 || 0) - xScale(d.x0 || 0) - 1))
      .attr('height', (d) => height - yScale(d.length))
      .attr('fill', (d) => {
        const midpoint = ((d.x0 || 0) + (d.x1 || 0)) / 2;
        const rating = getRatingFromValue(metric, midpoint);
        return getRatingColor(rating);
      })
      .attr('opacity', 0.7)
      .on('mouseover', function () {
        d3.select(this).attr('opacity', 1);
      })
      .on('mouseout', function () {
        d3.select(this).attr('opacity', 0.7);
      });

    // Add labels for thresholds
    if (thresholds) {
      g.append('text')
        .attr('x', xScale(thresholds.good))
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', '#10b981')
        .text('Good');

      g.append('text')
        .attr('x', xScale(thresholds.poor))
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', '#ef4444')
        .text('Poor');
    }
  }, [data, metric]);

  const getMetricThresholds = (metric: string) => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 }
    };
    return thresholds[metric];
  };

  const getRatingFromValue = (metric: string, value: number) => {
    const thresholds = getMetricThresholds(metric);
    if (!thresholds) return 'good'; // Default

    if (value <= thresholds.good) {
      return 'good';
    } else if (value <= thresholds.poor) {
      return 'needs-improvement';
    } else {
      return 'poor';
    }
  };

  const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good':
        return '#10b981';
      case 'needs-improvement':
        return '#f59e0b';
      case 'poor':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={svgRef} className="w-full h-[300px]" />
    </div>
  );
}
