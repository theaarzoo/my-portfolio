import { ArrowRight } from 'lucide-react';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Code from '../svgs/Code';
import Gear from '../svgs/Gear';
import { Card } from '../ui/card';

const setup = [
  {
    name: 'Gears Used',
    description: 'Productivity Tools, Gears i use to get my work done.',
    icon: <Gear className="size-4" />,
    href: '/gears',
  },
  {
    name: 'VS Code / Cursor Setup',
    description: 'VS Code / Cursor Setup i use daily.',
    icon: <Code className="size-4" />,
    href: '/setup',
  },
];

export default function Setup() {
  return (
    <Container className="mt-10">
      <SectionHeading heading="Development" />
      <div className="mt-8 flex flex-col gap-4">
        {setup.map((item) => (
          <Link className="group" href={item.href} key={item.name}>
            <Card className="border-border/80 hover:border-border hover:bg-muted/30 flex flex-row items-center justify-between gap-4 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5">
              <div className="bg-muted flex items-center justify-center rounded-md p-2 transition-transform duration-200 group-hover:scale-105">
                {item.icon}
              </div>
              <div className="flex w-full flex-col">
                <h3 className="text-base font-semibold">{item.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
