import React from 'react';

import { Card } from '../ui/card';

type CollectionCardProps = {
  title: string;
  meta: string;
};

export default function CollectionCard({ title, meta }: CollectionCardProps) {
  return (
    <Card className="border-border/80 hover:border-border hover:bg-muted/20 gap-2 px-5 py-5 transition-all duration-200 hover:-translate-y-0.5">
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-sm md:text-base">{meta}</p>
    </Card>
  );
}
