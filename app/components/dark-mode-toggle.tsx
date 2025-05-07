'use client';

import * as React from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useTheme } from 'next-themes';

// Create animated SVG elements with proper typing
const AnimatedSvg = animated('svg');
const AnimatedCircle = animated('circle');
const AnimatedG = animated('g');

export interface Props {
  style?: React.CSSProperties;
  size?: number | string;
  moonColor?: string;
  sunColor?: string;
  className?: string;
}

export const DarkModeToggle: React.FC<Props> = ({
  size = 24,
  moonColor = 'white',
  sunColor = 'black',
  style,
  className,
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const uniqueId = React.useId();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const properties = {
    dark: {
      r: 9,
      transform: 'rotate(40deg)',
      cx: '50%',
      cy: '23%',
      opacity: 0,
    },
    light: {
      r: 5,
      transform: 'rotate(90deg)',
      cx: '100%',
      cy: '0%',
      opacity: 1,
    },
  };

  const springConfig = {
    mass: 4,
    tension: 250,
    friction: 35,
  };

  const { transform, opacity, r, cx, cy } = useSpring({
    transform: isDark ? properties.dark.transform : properties.light.transform,
    opacity: isDark ? properties.dark.opacity : properties.light.opacity,
    r: isDark ? properties.dark.r : properties.light.r,
    cx: isDark ? properties.dark.cx : properties.light.cx,
    cy: isDark ? properties.dark.cy : properties.light.cy,
    config: springConfig,
  });

  if (!mounted) {
    return null;
  }

  const svgContainerProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    stroke: 'currentColor',
    style: {
      cursor: 'pointer',
      transform,
    },
    onClick: () => setTheme(isDark ? 'light' : 'dark'),
    className,
  };

  return (
    <div style={style}>
      <AnimatedSvg {...svgContainerProps}>
        <defs>
          <mask id={uniqueId}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <AnimatedCircle
              r="9"
              fill="black"
              cx={cx}
              cy={cy}
            />
          </mask>
        </defs>

        <AnimatedCircle
          cx="12"
          cy="12"
          fill={isDark ? moonColor : sunColor}
          r={r}
          mask={`url(#${uniqueId})`}
        />

        <AnimatedG style={{ opacity }}>
          <g stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </AnimatedG>
      </AnimatedSvg>
    </div>
  );
};
