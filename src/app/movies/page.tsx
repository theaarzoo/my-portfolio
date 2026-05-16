import Container from '@/components/common/Container';
import CollectionCard from '@/components/personal/CollectionCard';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { moviesConfig } from '@/config/Personal';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/movies'),
  robots: { index: true, follow: true },
};

export default function MoviesPage() {
  return (
    <Container className="py-16">
      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {moviesConfig.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            {moviesConfig.description}
          </p>
        </header>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">
          {moviesConfig.items.map((item) => (
            <CollectionCard
              key={item.title}
              title={item.title}
              meta={item.year}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
