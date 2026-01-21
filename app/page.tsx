import { MonthlyCalendar } from '@/features/dashboard/components/monthly-calendar';
import { PersonalProgressWidget } from '@/features/dashboard/components/personal-progress-widget';
import { PostListClient } from './_components/post-list-client';

import type { Post } from '@/features/posts/components/post-card';

// TODO: Supabase에서 실제 데이터 가져오기
async function getPosts(): Promise<Post[]> {
  // 서버에서 데이터 페칭 (SSR)
  return [
    {
      id: '1',
      title: 'Next.js 14 App Router 완벽 가이드',
      url: 'https://example.com/nextjs-app-router-guide',
      description:
        'Next.js 14의 App Router를 사용하여 현대적인 웹 애플리케이션을 구축하는 방법을 알아봅니다.',
      author: {
        name: '홍길동',
        avatarUrl: 'https://github.com/shadcn.png',
      },
      createdAt: new Date(2024, 0, 15),
      commentCount: 5,
    },
    {
      id: '2',
      title: 'TypeScript 5.0 새로운 기능 살펴보기',
      url: 'https://example.com/typescript-5-features',
      description:
        'TypeScript 5.0에서 추가된 새로운 기능들을 실전 예제와 함께 알아봅니다.',
      author: {
        name: '김철수',
      },
      createdAt: new Date(2024, 0, 14),
      commentCount: 3,
    },
    {
      id: '3',
      title: 'React Server Components 이해하기',
      url: 'https://example.com/react-server-components',
      author: {
        name: '이영희',
        avatarUrl: 'https://github.com/shadcn.png',
      },
      createdAt: new Date(2024, 0, 13),
      commentCount: 8,
    },
  ];
}

// TODO: Supabase에서 사용자 진행률 가져오기
async function getUserProgress() {
  // 서버에서 데이터 페칭 (SSR)
  return {
    postCount: 1,
    commentCount: 5,
  };
}

export default async function Home() {
  // 서버 컴포넌트에서 데이터 페칭
  const [posts, userProgress] = await Promise.all([getPosts(), getUserProgress()]);
  const now = new Date();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">월간로그</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Calendar + Progress (SSR) */}
          <div className="space-y-6 lg:col-span-1">
            {/* Personal Progress Widget */}
            <PersonalProgressWidget
              postCount={userProgress.postCount}
              commentCount={userProgress.commentCount}
            />

            {/* Monthly Calendar */}
            <MonthlyCalendar
              year={now.getFullYear()}
              month={now.getMonth() + 1}
            />
          </div>

          {/* Right Column: Post List (CSR) */}
          <PostListClient posts={posts} />
        </div>
      </main>
    </div>
  );
}
