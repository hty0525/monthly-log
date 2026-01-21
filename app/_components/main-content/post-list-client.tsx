'use client';

import { PostCard } from '@/features/posts/components/post-card';

import type { Post } from '@/features/posts/components/post-card';

type PostListClientProps = {
  posts: Post[];
  selectedDate?: Date;
};

export const PostListClient = ({ posts, selectedDate }: PostListClientProps) => {
  // 날짜 필터링 로직
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

  // 이벤트 핸들러
  const handlePostClick = (postId: string) => {
    // TODO: 글 상세 페이지로 이동
    console.log('Post clicked:', postId);
  };

  // 텍스트 변수
  const title = selectedDate
    ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 활동`
    : '전체 활동';
  const postCountText = `${filteredPosts.length}개의 글`;

  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{postCountText}</p>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={() => handlePostClick(post.id)}
          />
        ))}
      </div>
    </div>
  );
};
