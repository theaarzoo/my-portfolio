import Headphones from '@/components/svgs/devices/Headphones';
import Keyboard from '@/components/svgs/devices/Keyboard';
import Laptop from '@/components/svgs/devices/Laptop';
import Monitor from '@/components/svgs/devices/Monitor';
import Mouse from '@/components/svgs/devices/Mouse';
import Phone from '@/components/svgs/devices/Phone';

export const devices = [
  {
    name: 'Asus TUF Gaming A15 ( Ryzen 5 | GTX 1650 | 16GB RAM)',
    icon: <Laptop className="size-4" />,
  },
  {
    name: 'ViewSonic VX2758A-2K-PRO-2 (27 inch, 68.58 cm)',
    icon: <Monitor className="size-4" />,
  },
  {
    name: 'AULA F75 (Ice White) Keyboard',
    icon: <Keyboard className="size-4" />,
  },
  {
    name: 'RedDragon Vara K551 Keyboard',
    icon: <Keyboard className="size-4" />,
  },
  {
    name: 'Logitech G402 Mouse',
    icon: <Mouse className="size-4" />,
  },
  {
    name: 'CosmicByte Obreon 7.1 Headphone',
    icon: <Headphones className="size-4" />,
  },
  {
    name: 'OnePlus Nord 6 (256 GB)',
    icon: <Phone className="size-4" />,
  },
  {
    name: 'Poco F6 (256 GB)',
    icon: <Phone className="size-4" />,
  },
];

export const webExtensions = [
  { name: 'Unhook', href: 'https://unhook.app/' },
  { name: 'uBlock Origin', href: 'https://ublockorigin.com/' },
  {
    name: 'React Developer Tools',
    href: 'https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en',
  },
  { name: 'daily.dev', href: 'https://daily.dev/' },
  { name: 'Grammarly', href: 'https://www.grammarly.com/' },
  { name: 'Wappalyzer', href: 'https://www.wappalyzer.com/' },
  {
    name: 'ColorZilla',
    href: 'https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en',
  },
];

export const software = [
  { name: 'Zen', href: 'https://zen-browser.app/' },
  { name: 'Notion', href: 'https://www.notion.so/desktop' },
  { name: 'TickTick', href: 'https://ticktick.com/download' },
  { name: 'OBS Studio', href: 'https://obsproject.com/' },
  { name: 'VLC', href: 'https://www.videolan.org/vlc/' },
  { name: 'Ghostty', href: 'https://ghostty.org/' },
  { name: 'PowerToys', href: 'https://github.com/microsoft/PowerToys' },
  { name: 'Cursor', href: 'https://cursor.sh/' },
];
