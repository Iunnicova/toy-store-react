import { JSX } from 'react';

export type IconComponent = (
  props: React.SVGProps<SVGSVGElement>
) => JSX.Element;

// SVGSVGElement —
// Это DOM-тип для тега <svg>, такой же как:
// HTMLDivElement → <div>
// HTMLButtonElement → <button>

// React.SVGProps<SVGSVGElement> включает:

//  className
//  style
//  width, height
//  viewBox
//  fill, stroke
//  onClick, onMouseEnter
// aria-hidden, role
// tabIndex
