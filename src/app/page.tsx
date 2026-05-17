// import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import CTA from '@/components/landing/CTA';
import Experience from '@/components/landing/Experience';
// import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Personal from '@/components/landing/Personal';
import Setup from '@/components/landing/Setup';
// import Work from '@/components/landing/Projects';
import React from 'react';

export default function page() {
  return (
    <main className="min-h-screen pt-10 pb-12 md:pt-12 md:pb-16">
      <Hero />
      <Experience />
      {/* <Work /> */}
      {/* <About /> */}
      {/* <Github /> */}
      <Blog />
      <Setup />
      <Personal />
      <CTA />
    </main>
  );
}
