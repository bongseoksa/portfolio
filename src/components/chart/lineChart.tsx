'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { ChartDataPoint } from '@/types/dashboardTypes';

interface LineChartProps {
  data: ChartDataPoint[];
  metric?: 'CLS' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
}

export default function LineChart({ data, metric }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.bottom - margin.top;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.timestamp) as [Date, Date])
      .range([0, width]);

    let yScale: d3.ScaleLinear<number, number>;
    let lines: {
      key: string;
      color: string;
      accessor: (d: ChartDataPoint) => number;
      label: string;
    }[];

    if (metric) {
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

      const getValue = (d: ChartDataPoint) => d.value;
      yScale = d3
        .scaleLinear()
        .domain(d3.extent(filteredData, getValue) as [number, number])
        .nice()
        .range([height, 0]);

      lines = [
        {
          key: metric,
          color: getMetricColor(metric),
          accessor: getValue,
          label: getMetricLabel(metric)
        }
      ];
    } else {
      // 전체 개요에서는 각 메트릭별 데이터를 필터링하여 사용
      const metricNames: ('CLS' | 'FCP' | 'LCP' | 'TTFB' | 'INP')[] = [
        'CLS',
        'FCP',
        'LCP',
        'TTFB',
        'INP'
      ];
      yScale = d3.scaleLinear().domain([0, 4000]).range([height, 0]); // 모든 메트릭을 포함할 수 있는 적절한 범위

      lines = metricNames.map((name) => ({
        key: name,
        color: getMetricColor(name),
        accessor: (d) => d.value, // 실제 값 사용
        label: getMetricLabel(name)
      }));
    }

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale).tickFormat((domainValue: Date | d3.NumberValue) => {
          // domainValue가 Date 타입이면 포맷 적용, 아니면 빈 문자열 반환
          if (domainValue instanceof Date) {
            return d3.timeFormat('%H:%M')(domainValue);
          }
          // d3.scaleTime이 아닌 경우에도 대비
          return '';
        })
      );

    const yAxis =
      metric === 'CLS'
        ? d3.axisLeft(yScale).tickFormat(d3.format('.3f'))
        : metric && ['FCP', 'LCP', 'TTFB', 'INP'].includes(metric)
          ? d3.axisLeft(yScale).tickFormat((d) => `${d}ms`)
          : d3.axisLeft(yScale).tickFormat((d) => `${d}ms`); // 전체 개요에서도 ms 단위로 표시

    g.append('g').call(yAxis);

    // Add threshold lines for single metrics
    if (metric) {
      const thresholds = getMetricThresholds(metric);
      if (thresholds) {
        // Good threshold
        g.append('line')
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', yScale(thresholds.good))
          .attr('y2', yScale(thresholds.good))
          .attr('stroke', '#10b981')
          .attr('stroke-dasharray', '5,5')
          .attr('opacity', 0.7);

        // Poor threshold
        g.append('line')
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', yScale(thresholds.poor))
          .attr('y2', yScale(thresholds.poor))
          .attr('stroke', '#ef4444')
          .attr('stroke-dasharray', '5,5')
          .attr('opacity', 0.7);
      }
    }

    // Add lines
    lines.forEach((lineConfig) => {
      const lineData = data.filter((d) => d.name === lineConfig.key);
      if (!lineData.length) return;

      const lineGenerator = d3
        .line<ChartDataPoint>()
        .x((d) => xScale(d.timestamp))
        .y((d) => yScale(lineConfig.accessor(d)))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', lineConfig.color)
        .attr('stroke-width', 2)
        .attr('d', lineGenerator);

      // Add dots
      g.selectAll(`.dot-${lineConfig.key}`)
        .data(lineData)
        .enter()
        .append('circle')
        .attr('class', `dot-${lineConfig.key}`)
        .attr('cx', (d) => xScale(d.timestamp))
        .attr('cy', (d) => yScale(lineConfig.accessor(d)))
        .attr('r', 2)
        .attr('fill', lineConfig.color);
    });

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-height)
          .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.3);

    g.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.3);
  }, [data, metric]);

  const getMetricColor = (metric: string) => {
    const colors: Record<string, string> = {
      CLS: '#ef4444',
      FCP: '#3b82f6',
      LCP: '#10b981',
      TTFB: '#f59e0b',
      INP: '#8b5cf6'
    };
    return colors[metric] || '#6b7280';
  };

  const getMetricLabel = (metric: string) => {
    const labels: Record<string, string> = {
      CLS: 'CLS',
      FCP: 'FCP',
      LCP: 'LCP',
      TTFB: 'TTFB',
      INP: 'INP'
    };
    return labels[metric] || metric;
  };

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

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={svgRef} className="w-full h-[300px]" />
    </div>
  );
}
