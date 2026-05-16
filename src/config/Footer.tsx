export interface FooterLink {
  label: string;
  href: string;
}

export const footerConfig = {
  developer: 'Md. Aarzoo Alam',
  text: 'Design & Developed by',
  copyright: 'All rights reserved.',
  sections: {
    nav: 'Navigate',
    connect: 'Connect',
  },
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Work',
      href: '/work-experience',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Resume',
      href: '/resume',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Gears',
      href: '/gears',
    },
    {
      label: 'Setup',
      href: '/setup',
    },
    {
      label: 'Journey',
      href: '/journey',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ] as FooterLink[],
};
