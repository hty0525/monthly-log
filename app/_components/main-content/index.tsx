'use client';

import { useState } from 'react';

import { Sidebar } from './sidebar';
import { PostListClient } from './post-list-client';

import type { Post } from '@/features/posts/components/post-card';

type MainContentProps = {
  posts: Post[];
  userProgress: {
    postCount: number;
    commentCount: number;
  };
};

export const MainContent = ({ posts, userProgress }: MainContentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const now = new Date();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Calendar + Progress */}
        <Sidebar
          postCount={userProgress.postCount}
          commentCount={userProgress.commentCount}
          year={now.getFullYear()}
          month={now.getMonth() + 1}
          selectedDate={selectedDate}
          onDateClick={setSelectedDate}
        />

        {/* Right Column: Post List */}
        <PostListClient posts={posts} selectedDate={selectedDate} />
      </div>
    </main>
  );
};
