"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export interface Props {
  style?: React.CSSProperties;
  size?: number | string;
  moonColor?: string;
  sunColor?: string;
  className?: string;
}

export const DarkModeToggle: React.FC<Props> = ({
  size = 24,
  moonColor = "#FCD34D",
  sunColor = "#D97706",
  style,
  className,
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const uniqueId = React.useId();

  if (!mounted) {
    return (
      <div
        style={{ width: size, height: size, ...style }}
        className={className}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      style={style}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        style={{
          cursor: "pointer",
          transform: isDark ? "rotate(40deg)" : "rotate(90deg)",
          transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <defs>
          <mask id={uniqueId}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle
              r="9"
              fill="black"
              cx={isDark ? "50%" : "100%"}
              cy={isDark ? "23%" : "0%"}
              style={{
                transition: "cx 0.45s ease-out, cy 0.45s ease-out",
              }}
            />
          </mask>
        </defs>

        <circle
          cx="12"
          cy="12"
          r={isDark ? 9 : 5}
          fill={isDark ? moonColor : sunColor}
          mask={`url(#${uniqueId})`}
          style={{
            transition:
              "r 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), fill 0.35s ease",
          }}
        />

        <g
          stroke="currentColor"
          style={{
            opacity: isDark ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
};
