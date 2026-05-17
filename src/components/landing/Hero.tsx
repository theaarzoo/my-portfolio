'use client';

import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import Copied from '../svgs/Copied';
import Copy from '../svgs/Copy';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

export default function Hero() {
  const { name, title, avatar, skills, description, buttons, tagline } =
    heroConfig;
  const [isCopied, setIsCopied] = useState(false);
  const role = title.replace(/^a\s+/i, '').replace(/\.$/, '');
  const email =
    socialLinks
      .find((item) => item.name === 'Email')
      ?.href.replace('mailto:', '') ?? '';

  const copyEmail = async () => {
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      }

      if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="text-primary whitespace-pre-wrap">
            {part.text}
          </b>
        );
      }

      if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }

      return null;
    });
  };

  return (
    <Container>
      <div className="flex flex-col gap-6 md:gap-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Image
            src={avatar}
            alt={name}
            width={112}
            height={112}
            className="size-24 rounded-full bg-blue-300 object-cover sm:size-28 dark:bg-yellow-300"
          />

          <div className="min-w-0 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {name}
            </h1>

            <div className="text-secondary flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base">
              <span>{role}</span>
              <span className="hidden text-neutral-400 sm:inline">
                &middot;
              </span>
              <span>{tagline}</span>
              {email && (
                <>
                  <span className="hidden text-neutral-400 sm:inline">
                    &middot;
                  </span>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="hover:text-primary inline-flex items-center gap-1.5 transition-colors"
                    aria-label={
                      isCopied ? 'Email copied' : 'Copy email address'
                    }
                  >
                    <span className="truncate">{email}</span>
                    {isCopied ? (
                      <Copied className="size-4 text-green-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {socialLinks.map((link) => (
                <Tooltip key={link.name} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className="text-secondary hover:text-primary flex items-center gap-2 transition-colors"
                    >
                      <span className="size-5">{link.icon}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        <div className="flex max-w-2xl flex-wrap items-center gap-x-1.5 gap-y-2 text-sm leading-7 whitespace-pre-wrap text-neutral-500 md:text-base">
          {renderDescription()}
        </div>

        <div className="flex flex-wrap gap-3">
          {buttons.map((button) => {
            const IconComponent =
              buttonIcons[button.icon as keyof typeof buttonIcons];

            return (
              <Button
                key={button.text}
                variant={button.variant as 'outline' | 'default'}
                className={cn(
                  'h-10',
                  button.variant === 'outline' && 'inset-shadow-indigo-500',
                  button.variant === 'default' && 'inset-shadow-indigo-500',
                )}
                asChild
              >
                <Link href={button.href}>
                  {IconComponent && <IconComponent />}
                  {button.text}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
