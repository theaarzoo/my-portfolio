import { BookOpen, Clapperboard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type PersonalLink = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type BookItem = {
  title: string;
  author: string;
};

export type BookCategory = {
  title: string;
  items: BookItem[];
};

export type MovieItem = {
  title: string;
  year: string;
};

export const personalLinks: PersonalLink[] = [
  {
    name: 'Books',
    description: 'Books that have influenced my thinking.',
    href: '/books',
    icon: BookOpen,
  },
  {
    name: 'Movies',
    description: 'Films and shows that I liked and entertained me.',
    href: '/movies',
    icon: Clapperboard,
  },
];

export const booksConfig = {
  title: 'Books',
  description: 'A collection of books that have influenced my thinking.',
  categories: [
    {
      title: 'Power & Influence',
      items: [
        {
          title: 'The 48 Laws of Power',
          author: 'Robert Greene',
        },
        {
          title: 'The Art of Seduction',
          author: 'Robert Greene',
        },
        {
          title: 'The Laws of Human Nature',
          author: 'Robert Greene',
        },
        {
          title: 'Surrounded by Idiots',
          author: 'Thomas Erikson',
        },
      ],
    },
    {
      title: 'Mastery & Focus',
      items: [
        {
          title: 'Mastery',
          author: 'Robert Greene',
        },
        {
          title: 'Deep Work',
          author: 'Cal Newport',
        },
        {
          title: 'Limitless',
          author: 'Jim Kwik',
        },
      ],
    },
  ] as BookCategory[],
};

export const moviesConfig = {
  title: 'Movies',
  description: 'Movies and shows that I liked and entertained me.',
  items: [
    {
      title: 'Ford v Ferrari',
      year: '2019',
    },
    {
      title: 'Whiplash',
      year: '2014',
    },
    {
      title: 'The Social Network',
      year: '2010',
    },
    {
      title: 'Rush',
      year: '2013',
    },
    {
      title: 'Steve Jobs',
      year: '2015',
    },
    {
      title: 'The Founder',
      year: '2016',
    },
    {
      title: 'Silicon Valley',
      year: '2014',
    },
    {
      title: 'Black Swan',
      year: '2010',
    },
    {
      title: 'The Big Short',
      year: '2015',
    },
    {
      title: 'F1',
      year: '2025',
    },
  ] as MovieItem[],
  quote: {
    text: 'A man who is master of patience is master of everything else.',
    author: 'George Savile',
  },
};
