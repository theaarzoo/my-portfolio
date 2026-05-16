import Container from '@/components/common/Container';
import CollectionCard from '@/components/personal/CollectionCard';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { booksConfig } from '@/config/Personal';
import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/books'),
  robots: { index: true, follow: true },
};

export default function BooksPage() {
  return (
    <Container className="py-16">
      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {booksConfig.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            {booksConfig.description}
          </p>
        </header>

        <Separator />

        <div className="space-y-14">
          {booksConfig.categories.map((category) => (
            <section className="space-y-6" key={category.title}>
              <div className="flex items-center gap-4">
                <div className="bg-muted border-border/70 flex size-12 shrink-0 items-center justify-center rounded-xl border">
                  <BookOpen className="text-muted-foreground size-5" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {category.title}
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {category.items.map((book) => (
                  <CollectionCard
                    key={book.title}
                    title={book.title}
                    meta={book.author}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
