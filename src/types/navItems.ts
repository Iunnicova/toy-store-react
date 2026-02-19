import { ReactNode } from 'react';

export type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

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
