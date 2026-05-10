import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import React from 'react';

interface SkillProps {
  name: string;
  href: string;
  children: React.ReactNode;
  compact?: boolean;
}

export default function Skill({
  name,
  href,
  children,
  compact = false,
}: SkillProps) {
  if (compact) {
    const chipStyle = {
      '--label-width': `${Math.max(name.length + 1, 6)}ch`,
    } as React.CSSProperties;

    return (
      <Link
        href={href ?? ''}
        target="_blank"
        style={chipStyle}
        className={cn(
          'group/skill skill-inner-shadow inline-flex h-10 items-center overflow-hidden rounded-md border border-dashed border-black/20 bg-black/5 text-black dark:border-white/30 dark:bg-white/15 dark:text-white',
          'transition-[width,background-color,border-color] duration-200 ease-out will-change-[width]',
          'w-10 px-0 hover:w-[calc(2.5rem+var(--label-width))] hover:px-2',
        )}
      >
        <span className="flex size-10 shrink-0 items-center justify-center">
          <span className="size-4">{children}</span>
        </span>
        <span className="overflow-hidden text-sm font-bold whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover/skill:opacity-100">
          {name}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href ?? ''}
      target="_blank"
      className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black dark:border-white/30 dark:bg-white/15 dark:text-white"
    >
      <div className="size-4 flex-shrink-0">{children}</div>
      <p className="ml-1 text-sm font-bold">{name}</p>
    </Link>
  );
}
