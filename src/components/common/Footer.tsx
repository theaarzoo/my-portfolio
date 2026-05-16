import { footerConfig } from '@/config/Footer';
import { socialLinks } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from './Container';

export default function Footer() {
  return (
    <footer className="border-border bg-muted/30 mt-24 border-t">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
              {footerConfig.sections.nav}
            </p>
            <nav className="flex max-w-md flex-wrap gap-x-6 gap-y-2">
              {footerConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-secondary hover:text-primary text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
              {footerConfig.sections.connect}
            </p>
            <div className="flex max-w-xs flex-wrap gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="border-border bg-background text-muted-foreground hover:bg-muted hover:text-primary flex size-10 items-center justify-center rounded-lg border transition-colors"
                >
                  <span className="size-5 [&_svg]:size-5">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-border mt-10 grid gap-2 border-t pt-8 text-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} {footerConfig.developer}.{' '}
            {footerConfig.copyright}
          </p>
          {/* Visitor analytics will be added after the tracking service is configured. */}
          {/* <p className="text-muted-foreground">
            You&apos;re the <span className="text-primary font-medium">37,139th</span> visitor
          </p> */}
          <p className="text-muted-foreground sm:text-right">
            {footerConfig.text}{' '}
            <span className="text-primary font-medium">
              {footerConfig.developer}
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
