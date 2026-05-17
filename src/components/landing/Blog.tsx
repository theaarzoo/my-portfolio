import { getPublishedBlogPosts } from '@/lib/blog';
import { Link } from 'next-view-transitions';
import React from 'react';

import { BlogCard } from '../blog/BlogCard';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';

export default function Blog() {
  const posts = getPublishedBlogPosts();

  return (
    <Container className="mt-14 md:mt-16">
      <SectionHeading subHeading="Featured" heading="Blogs" />
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {posts.slice(0, 2).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button variant="outline">
          <Link href="/blog">Show all blogs</Link>
        </Button>
      </div>
    </Container>
  );
}
