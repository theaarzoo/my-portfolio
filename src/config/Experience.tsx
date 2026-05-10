import AWS from '@/components/technologies/AWS';
import BootStrap from '@/components/technologies/BootStrap';
import Bun from '@/components/technologies/Bun';
import CSS from '@/components/technologies/CSS';
import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
import Html from '@/components/technologies/Html';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
// import NestJs from '@/components/technologies/NestJs';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
// import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';

// import Vercel from '@/components/technologies/Vercel';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    isBlur: true,
    company: 'good day :3',
    position: 'Full Stack Developer',
    location: 'Canada (Remote)',
    image: '/company/promote.png',
    description: [
      'Developed and deployed B2B payments and accounts payable (AP) solutions, improving transaction success rates by 75% and reducing reconciliation time for clients by 50%',
      'Led a comprehensive codebase refactoring initiative that improved maintainability, scalability, and development velocity across the entire platform.',
      'Integrated and optimized backend API connections, implementing efficient data fetching strategies and error handling mechanisms with data handling from JP Morgan Bank(USA), cutting manual processing by 50% and improving client operational efficiency.',
      'Engineered and deployed real-time payment tracking system with automated status updates, improving on-time payment rates by 35% and providing clients with instant visibility into payment statuses.',
    ],
    startDate: 'July 2025',
    endDate: 'Present',
    technologies: [
      {
        name: 'Node.js',
        href: 'https://nodejs.org/',
        icon: <NodeJs />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'AWS',
        href: 'https://aws.amazon.com/',
        icon: <AWS />,
      },
      //   {
      //   name: 'Python',
      //   href: 'https://python.org/',
      //   icon: <Python />,
      // },
      {
        name: 'Postman',
        href: 'https://www.postman.com/',
        icon: <Postman />,
      },
      {
        name: 'PostgreSQL',
        href: 'https://postgresql.org/',
        icon: <PostgreSQL />,
      },
    ],
    website: '#',
    github: '#',
    x: '#',
  },
  {
    isCurrent: false,
    company: 'TechFanatic',
    position: 'Full Stack Developer',
    location: 'Surat, India (On-Site)',
    image: '/company/upsurge.png',
    description: [
      'Developed & Coordinated 13+ end-to-end projects using a diverse technology stack—proficient in front-end frameworks (HTML, CSS, Bootstrap, JavaScript, React.js) and back-end platforms (Node.js, Express.js,). Leveraged both relational and non-relational databases while implementing robust RESTful and GraphQL APIs',
      'Optimized server management and CI/CD pipelines using Docker and cloud platforms (AWS, Azure), cutting operational costs by 40%',
      'Leveraged Redis, ElasticSearch, and Kafka to boost application performance, consistently achieving A+ page speed ratings.',
      'Streamlined development workflows by optimizing internal tools and maintaining detailed technical documentation.',
    ],
    startDate: 'January 2025',
    endDate: 'June 2025',
    technologies: [
      {
        name: 'NextJs',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'BootStrap',
        href: 'https://getbootstrap.com/',
        icon: <BootStrap />,
      },
      {
        name: 'Postman',
        href: 'https://www.postman.com/',
        icon: <Postman />,
      },
      {
        name: 'TailwindCss',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'CSS',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        icon: <CSS />,
      },
      {
        name: 'HTML',
        href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        icon: <Html />,
      },
      {
        name: 'JavaScript',
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        icon: <JavaScript />,
      },
      {
        name: 'MongoDB',
        href: 'https://www.mongodb.org/',
        icon: <MongoDB />,
      },
      // {
      //   name: 'Azure',
      //   href: 'https://azure.microsoft.com/',
      //   icon: <Azure />,
      // },
      {
        name: 'Express',
        href: 'https://expressjs.com/',
        icon: <ExpressJs />,
      },
      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
    ],
    website: 'https://bhindi.io',
    github: 'https://github.com/upsurgeio',
    x: 'https://x.com/upsurgelabs',
    linkedin: 'https://www.linkedin.com/company/upsurge-labs-pte-ltd',
  },
  {
    isCurrent: false,
    company: 'Digit.in',
    position: 'Content Writer',
    location: 'Noida, India (Remote)',
    image: '/company/digit.png',
    description: [
      'Writing Technical content articles on Technology trends, gadgets, tips & tricks, and how-to’s for one of India’s largest Tech Publications',
      'SEO Rich content with 2000 words average',
    ],
    startDate: 'August 2021',
    endDate: 'December 2022',
    technologies: [
      {
        name: 'Bun',
        href: 'https://bun.sh/',
        icon: <Bun />,
      },
    ],
    website: 'https://prepeasy.ai',
    github: 'https://github.com/prepeasy',
  },
];
