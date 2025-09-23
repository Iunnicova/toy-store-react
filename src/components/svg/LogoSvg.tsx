import React, { FC } from 'react';

type LogoSvgProps = {
  className?: string;
  type?: 'primary' | 'secondary';
};

export const LogoSvg: React.FC<LogoSvgProps> = ({ className, type }) => {
  const strokeColor = type === 'primary' ? '#f9c449' : '#b38300';

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="-3"
            dy="-2"
            stdDeviation="2"
            floodColor="rgba(0,0,0,0.6)"
          />
        </filter>

        <linearGradient id="vGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="60%" stopColor="#9c88e2" />
          <stop offset="100%" stopColor="#5c4e91" />
        </linearGradient>
        <linearGradient id="uGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="40%" stopColor="#8375b4" />
          <stop offset="100%" stopColor="#483b78" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="10%" stopColor={strokeColor} />
          <stop offset="100%" stopColor="#b38300" />
        </linearGradient>
      </defs>

      <path
        d="M20,30 L40,80 L60,20"
        style={{ stroke: '#2a2148', strokeWidth: 10, fill: 'none' }}
        transform="translate(1.5,1.5)"
      />
      <path
        d="M20,30 L40,80 L60,20"
        style={{
          stroke: 'url(#vGradient)',
          strokeWidth: 8,
          fill: 'none',
          filter: 'url(#shadow)',
        }}
        strokeLinecap="round"
      />
      <path
        d="M69,24 L56,60 Q76,80 90,93 Q35,106 19,54 L87,58"
        style={{ stroke: '#2a2148', strokeWidth: 9, fill: 'none' }}
        transform="translate(1.5,1.5)"
      />
      <path
        d="M69,24 L56,60 Q76,80 90,93 Q35,106 19,54 L87,58"
        style={{
          stroke: 'url(#uGradient)',
          strokeWidth: 7,
          fill: 'none',
          filter: 'url(#shadow)',
        }}
      />
      <line
        x1="42"
        y1="91"
        x2="65"
        y2="21.5"
        style={{ stroke: '#7a6400', strokeWidth: 5 }}
        transform="translate(1.5,1.5)"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="91"
        x2="65"
        y2="21.5"
        style={{
          stroke: 'url(#lineGradient)',
          strokeWidth: 3,
          filter: 'url(#shadow)',
        }}
        strokeLinecap="round"
      />
    </svg>
  );
};
