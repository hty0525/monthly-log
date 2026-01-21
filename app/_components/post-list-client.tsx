'use client';

import { PostCard } from '@/features/posts/components/post-card';

import type { Post } from '@/features/posts/components/post-card';

type PostListClientProps = {
  posts: Post[];
};

export const PostListClient = ({ posts }: PostListClientProps) => {
  // TODO: 캘린더 날짜 선택 연동
  const selectedDate: Date | undefined = undefined;

  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        <h2 className="text-xl font-bold">전체 활동</h2>
        <p className="text-sm text-muted-foreground">{posts.length}개의 글</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
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
