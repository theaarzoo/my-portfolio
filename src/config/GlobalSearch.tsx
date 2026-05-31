import { socialLinks } from '@/config/Hero';
import {
  ArrowUp,
  BookOpen,
  BookOpenText,
  BriefcaseBusiness,
  Clapperboard,
  Code2,
  Cog,
  FileCode2,
  FileText,
  Home,
  Image,
  type LucideIcon,
  Mail,
  MoonStar,
  Music2,
  Search,
  Share2,
  SunMedium,
  Wrench,
} from 'lucide-react';

export type GlobalSearchGroupId = 'navigation' | 'features' | 'actions';

export type GlobalSearchActionId =
  | 'toggle-theme'
  | 'focus-palette'
  | 'scroll-top'
  | 'copy-email'
  | 'share-page'
  | 'open-github'
  | 'open-spotify'
  | 'toggle-oneko-sleep'
  | 'change-oneko-avatar';

export interface GlobalSearchItem {
  id: string;
  label: string;
  description: string;
  keywords: string[];
  icon: LucideIcon;
  group: GlobalSearchGroupId;
  shortcut?: string;
  href?: string;
  actionId?: GlobalSearchActionId;
}

export interface GlobalSearchGroup {
  id: GlobalSearchGroupId;
  title: string;
  items: GlobalSearchItem[];
}

const githubProfileUrl =
  socialLinks.find((item) => item.name === 'Github')?.href ?? '';

const emailAddress =
  socialLinks
    .find((item) => item.name === 'Email')
    ?.href.replace('mailto:', '') ?? '';

export const portfolioGithubUrl = githubProfileUrl;
export const portfolioEmailAddress = emailAddress;
export const portfolioSpotifyUrl =
  'https://open.spotify.com/playlist/5XbcgpfEethrDshcp9occZ';

const navigationItems: GlobalSearchItem[] = [
  {
    id: 'route-home',
    label: 'Go to Home',
    description: 'Navigate to the homepage',
    keywords: ['home', 'landing', 'hero'],
    icon: Home,
    group: 'navigation',
    href: '/',
    shortcut: 'H',
  },
  {
    id: 'route-work',
    label: 'Go to Work',
    description: 'View work experience',
    keywords: ['work', 'experience', 'career'],
    icon: BriefcaseBusiness,
    group: 'navigation',
    href: '/work-experience',
    shortcut: 'W',
  },
  {
    id: 'route-blog',
    label: 'Go to Blog',
    description: 'Browse all blog posts',
    keywords: ['blog', 'posts', 'articles'],
    icon: BookOpenText,
    group: 'navigation',
    href: '/blog',
    shortcut: 'B',
  },
  {
    id: 'route-resume',
    label: 'Go to Resume',
    description: 'View and download resume',
    keywords: ['resume', 'cv'],
    icon: FileText,
    group: 'navigation',
    href: '/resume',
    shortcut: 'R',
  },
  {
    id: 'route-gears',
    label: 'Go to Gears',
    description: 'View hardware and equipment setup',
    keywords: ['gears', 'setup', 'hardware'],
    icon: Cog,
    group: 'navigation',
    href: '/gears',
    shortcut: 'G',
  },
  {
    id: 'route-books',
    label: 'Go to Books',
    description: 'View recommended books and reading list',
    keywords: ['books', 'reading'],
    icon: BookOpen,
    group: 'navigation',
    href: '/books',
    shortcut: 'K',
  },
  {
    id: 'route-movies',
    label: 'Go to Movies',
    description: 'View favorite movies and shows',
    keywords: ['movies', 'shows', 'watchlist'],
    icon: Clapperboard,
    group: 'navigation',
    href: '/movies',
    shortcut: 'M',
  },
  {
    id: 'route-setup',
    label: 'Go to Setup',
    description: 'View development setup and tools',
    keywords: ['setup', 'development', 'tools'],
    icon: Wrench,
    group: 'navigation',
    href: '/setup',
    shortcut: 'S',
  },
  {
    id: 'route-terminal',
    label: 'Go to Terminal',
    description: 'Terminal setup guide',
    keywords: ['terminal', 'setup', 'guide'],
    icon: FileCode2,
    group: 'navigation',
    href: '/setup',
  },
];

const featureItems: GlobalSearchItem[] = [
  {
    id: 'feature-theme',
    label: 'Toggle Theme',
    description: 'Switch between light and dark mode',
    keywords: ['theme', 'dark', 'light', 'appearance'],
    icon: SunMedium,
    group: 'features',
    actionId: 'toggle-theme',
    shortcut: 'T',
  },
  {
    id: 'feature-palette',
    label: 'Command Palette',
    description: 'Open the command palette',
    keywords: ['command palette', 'search', 'open palette'],
    icon: Search,
    group: 'features',
    actionId: 'focus-palette',
    shortcut: 'Ctrl+K',
  },
  {
    id: 'feature-scroll-top',
    label: 'Scroll to Top',
    description: 'Scroll to the top of the page',
    keywords: ['scroll', 'top', 'up'],
    icon: ArrowUp,
    group: 'features',
    actionId: 'scroll-top',
    shortcut: 'Shift+Up',
  },
];

const actionItems: GlobalSearchItem[] = [
  {
    id: 'action-copy-email',
    label: 'Copy Email',
    description: 'Copy email address to clipboard',
    keywords: ['copy', 'email', 'mail'],
    icon: Mail,
    group: 'actions',
    actionId: 'copy-email',
    shortcut: 'Shift+E',
  },
  {
    id: 'action-share-page',
    label: 'Share Page',
    description: 'Share the current page',
    keywords: ['share', 'page', 'url'],
    icon: Share2,
    group: 'actions',
    actionId: 'share-page',
    shortcut: 'Shift+S',
  },
  {
    id: 'action-github',
    label: 'View GitHub Profile',
    description: 'Open GitHub profile in a new tab',
    keywords: ['github', 'profile', 'open github'],
    icon: Code2,
    group: 'actions',
    actionId: 'open-github',
    shortcut: 'Shift+G',
  },
  {
    id: 'action-spotify',
    label: 'Open Spotify Song',
    description: 'Open the currently playing Spotify song',
    keywords: ['spotify', 'music', 'song'],
    icon: Music2,
    group: 'actions',
    actionId: 'open-spotify',
    shortcut: 'Shift+M',
  },
  {
    id: 'action-oneko-sleep',
    label: 'Toggle Oneko Sleep',
    description: 'Put the neko to sleep or wake it up',
    keywords: ['oneko', 'sleep', 'cat'],
    icon: MoonStar,
    group: 'actions',
    actionId: 'toggle-oneko-sleep',
    shortcut: 'Ctrl+Z',
  },
  {
    id: 'action-oneko-avatar',
    label: 'Change Oneko Avatar',
    description: 'Cycle to the next neko variant',
    keywords: ['oneko', 'avatar', 'cat'],
    icon: Image,
    group: 'actions',
    actionId: 'change-oneko-avatar',
    shortcut: 'Ctrl+X',
  },
];

export const globalSearchGroups: GlobalSearchGroup[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    items: navigationItems,
  },
  {
    id: 'features',
    title: 'Features',
    items: featureItems,
  },
  {
    id: 'actions',
    title: 'Actions',
    items: actionItems,
  },
];

export const fallbackRecentItemIds = [
  'action-oneko-avatar',
  'action-oneko-sleep',
  'action-spotify',
];

export const globalSearchItemsById = new Map(
  globalSearchGroups
    .flatMap((group) => group.items)
    .map((item) => [item.id, item]),
);
