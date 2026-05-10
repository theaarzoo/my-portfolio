'use client';

import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useId, useState } from 'react';

import Skill from '../common/Skill';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExperienceCardProps {
  experience: Experience;
  isCollapsible?: boolean;
}

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

export function ExperienceCard({
  experience,
  isCollapsible = false,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(!isCollapsible);
  const detailsId = useId();

  const showDetails = !isCollapsible || isExpanded;

  return (
    <div className="group/card flex flex-col gap-4">
      {/* Company Header */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <Image
            src={experience.image}
            alt={experience.company}
            width={100}
            height={100}
            className="size-12 rounded-md"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  'text-lg font-bold',
                  experience.isBlur ? 'blur-[5px]' : 'blur-none',
                )}
              >
                {experience.company}
              </h3>
              {experience.website && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.website}
                      target="_blank"
                      className="size-4 text-neutral-500"
                    >
                      <Website />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Visit Website</TooltipContent>
                </Tooltip>
              )}
              {experience.x && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.x}
                      target="_blank"
                      className="size-4 text-neutral-500"
                    >
                      <X />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Follow on X</TooltipContent>
                </Tooltip>
              )}
              {experience.linkedin && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.linkedin}
                      target="_blank"
                      className="size-4 text-neutral-500"
                    >
                      <LinkedIn />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Connect on LinkedIn</TooltipContent>
                </Tooltip>
              )}
              {experience.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.github}
                      target="_blank"
                      className="size-4 text-neutral-500"
                    >
                      <Github />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View GitHub</TooltipContent>
                </Tooltip>
              )}
              {experience.isCurrent && (
                <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                  <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
                  Working
                </div>
              )}
              {isCollapsible && (
                <button
                  type="button"
                  aria-controls={detailsId}
                  aria-expanded={isExpanded}
                  onClick={() => setIsExpanded((prev: boolean) => !prev)}
                  className={cn(
                    'text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex size-6 items-center justify-center rounded-[10px] border border-transparent bg-transparent transition-all focus-visible:ring-3',
                    'opacity-100 md:opacity-0 md:group-focus-within/card:opacity-100 md:group-hover/card:opacity-100',
                    isExpanded && 'bg-muted text-foreground md:opacity-100',
                  )}
                  aria-label={
                    isExpanded ? 'Collapse details' : 'Expand details'
                  }
                >
                  <ChevronDownIcon
                    className={cn(
                      'size-4 transition-transform',
                      isExpanded && 'rotate-180',
                    )}
                  />
                </button>
              )}
            </div>
            <p>{experience.position}</p>
          </div>
        </div>
        {/* Right Side */}
        <div className="text-secondary flex flex-col md:text-right">
          <p>
            {experience.startDate} -{' '}
            {experience.isCurrent ? 'Present' : experience.endDate}
          </p>
          <p>{experience.location}</p>
        </div>
      </div>

      {showDetails && (
        <div id={detailsId} className="animate-in fade-in-0 duration-200">
          {/* Technologies */}
          <div>
            <h4 className="text-md mt-4 mb-2 font-semibold">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((technology, techIndex: number) => (
                <Skill
                  key={techIndex}
                  name={technology.name}
                  href={technology.href}
                >
                  {technology.icon}
                </Skill>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="text-secondary mt-4 flex flex-col">
            {experience.description.map(
              (description: string, descIndex: number) => (
                <p
                  key={descIndex}
                  dangerouslySetInnerHTML={{
                    __html: ` ${parseDescription(description)}`,
                  }}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
