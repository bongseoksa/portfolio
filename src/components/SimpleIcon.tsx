import React from 'react';
import SVG from 'react-inlinesvg';

interface SimpleIconProps {
  svgData: string;
  width?: number;
  height?: number;
}

const SimpleIcon: React.FC<SimpleIconProps> = ({ svgData, width = 24, height = 24 }) => {
  const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`;

  return <SVG src={svgDataUri} width={width} height={height} />;
};

export default SimpleIcon;
