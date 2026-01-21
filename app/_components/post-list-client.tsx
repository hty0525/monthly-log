'use client';

import { useState } from 'react';

import { PostCard } from '@/features/posts/components/post-card';

import type { Post } from '@/features/posts/components/post-card';

type PostListClientProps = {
  posts: Post[];
};

export const PostListClient = ({ posts }: PostListClientProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // 날짜 필터링 로직 (추후 구현)
  const filteredPosts = selectedDate
    ? posts.filter((post) => {
        const postDate = new Date(post.createdAt);
        return (
          postDate.getFullYear() === selectedDate.getFullYear() &&
          postDate.getMonth() === selectedDate.getMonth() &&
          postDate.getDate() === selectedDate.getDate()
        );
      })
    : posts;

  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          {selectedDate
            ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 활동`
            : '전체 활동'}
        </h2>
        <p className="text-sm text-muted-foreground">{filteredPosts.length}개의 글</p>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={() => {
              // TODO: 글 상세 페이지로 이동
              console.log('Post clicked:', post.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};
