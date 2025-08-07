'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GaugeChartProps {
  value: number;
  label: string;
  max: number;
}

export default function GaugeChart({ value, label, max }: GaugeChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 200;
    const height = 120;
    const radius = 80;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height - 10})`);

    // Background arc
    const backgroundArc = d3
      .arc()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    g.append('path').attr('d', backgroundArc).attr('fill', '#e5e7eb');

    // Value arc
    const valueArc = d3
      .arc()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(-Math.PI / 2 + (Math.PI * value) / max);

    // Color based on performance score
    const color = value >= 80 ? '#10b981' : value >= 50 ? '#f59e0b' : '#ef4444';

    g.append('path').attr('d', valueArc).attr('fill', color);

    // Center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', -10)
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .attr('fill', color)
      .text(`${Math.round(value)}`);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 10)
      .attr('font-size', '12px')
      .attr('fill', '#6b7280')
      .text(label);

    // Add score indicators
    const scoreText = value >= 80 ? '좋음' : value >= 50 ? '보통' : '나쁨';
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 25)
      .attr('font-size', '10px')
      .attr('fill', color)
      .text(scoreText);
  }, [value, label, max]);

  return (
    <div className="flex justify-center">
      <svg ref={svgRef} className="w-[200px] h-[120px]" />
    </div>
  );
}
