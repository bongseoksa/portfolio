'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { ChartDataPoint } from '@/types/dashboardTypes';

interface DonutChartProps {
  data: ChartDataPoint[];
}

export default function DonutChart({ data }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.6;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // 등급별 데이터 집계
    const ratingCounts = data.reduce(
      (acc, d) => {
        acc[d.rating] = (acc[d.rating] || 0) + 1;
        return acc;
      },
      {} as Record<'good' | 'needs-improvement' | 'poor', number>
    );

    const chartData = [
      { label: '좋음', value: ratingCounts.good || 0, color: '#10b981' },
      { label: '개선필요', value: ratingCounts['needs-improvement'] || 0, color: '#f59e0b' },
      { label: '나쁨', value: ratingCounts.poor || 0, color: '#ef4444' }
    ].filter((d) => d.value > 0); // 값이 0인 항목은 제외

    if (!chartData.length) {
      g.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .attr('fill', '#6b7280')
        .text('데이터가 없습니다.');
      return;
    }

    const pie = d3
      .pie<(typeof chartData)[0]>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<(typeof chartData)[0]>>()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    const arcs = g.selectAll('.arc').data(pie(chartData)).enter().append('g').attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color)
      .attr('opacity', 0.8)
      .on('mouseover', function (event, d) {
        d3.select(this).attr('opacity', 1);
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('opacity', 0.8);
      });

    // Add labels
    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .each(function (d) {
        const text = d3.select(this);
        const percentage = ((d.data.value / d3.sum(chartData, (d) => d.value)) * 100).toFixed(1);
        text.append('tspan').attr('x', 0).attr('dy', '-0.2em').text(d.data.label);
        text.append('tspan').attr('x', 0).attr('dy', '1.2em').text(`${percentage}%`);
      });

    // Add center text showing total count
    const totalCount = d3.sum(chartData, (d) => d.value);
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', -5)
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .attr('fill', '#333')
      .text(`${totalCount}`);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 15)
      .attr('font-size', '12px')
      .attr('fill', '#6b7280')
      .text('총 데이터');
  }, [data]);

  return (
    <div className="flex justify-center">
      <svg ref={svgRef} className="w-[300px] h-[300px]" />
    </div>
  );
}
