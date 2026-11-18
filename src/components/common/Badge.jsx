import React from 'react';

const BADGE_VARIANTS = {
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  amber: 'bg-amber-50 text-amber-700 border-amber-200/80',
  rose: 'bg-rose-50 text-rose-700 border-rose-200/80',
  sky: 'bg-sky-50 text-sky-700 border-sky-200/80',
  purple: 'bg-purple-50 text-purple-700 border-purple-200/80',
  slate: 'bg-slate-100 text-slate-700 border-slate-200/80'
};

const DOT_COLORS = {
  indigo: 'bg-indigo-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  sky: 'bg-sky-500',
  purple: 'bg-purple-500',
  slate: 'bg-slate-400'
};

export default function Badge({
  children,
  variant = 'indigo',
  size = 'sm',
  dot = false,
  className = ''
}) {
  const variantClass = BADGE_VARIANTS[variant] || BADGE_VARIANTS.indigo;
  const dotColor = DOT_COLORS[variant] || DOT_COLORS.indigo;
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-md border ${variantClass} ${sizeClass} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {children}
    </span>
  );
}
