import { PostCard } from './post-card';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { Post } from './post-card';

const meta = {
  title: 'Features/Posts/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPost: Post = {
  id: '1',
  title: 'Next.js 14 App Router 완벽 가이드',
  url: 'https://example.com/nextjs-app-router-guide',
  description: 'Next.js 14의 App Router를 사용하여 현대적인 웹 애플리케이션을 구축하는 방법을 알아봅니다.',
  author: {
    name: '홍길동',
    avatarUrl: 'https://github.com/shadcn.png',
  },
  createdAt: new Date(2024, 0, 15),
  commentCount: 5,
};

export const Default: Story = {
  args: {
    post: mockPost,
  },
};

export const WithoutDescription: Story = {
  args: {
    post: {
      ...mockPost,
      description: undefined,
    },
  },
};

export const NoComments: Story = {
  args: {
    post: {
      ...mockPost,
      commentCount: 0,
    },
  },
};

export const WithFallbackAvatar: Story = {
  args: {
    post: {
      ...mockPost,
      author: {
        name: '김철수',
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    post: {
      ...mockPost,
      title: 'React 18의 새로운 기능들과 Concurrent Rendering을 활용한 성능 최적화 전략 및 실전 예제',
    },
  },
};

export const PostList: Story = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <PostCard post={mockPost} />
      <PostCard
        post={{
          ...mockPost,
          id: '2',
          title: 'TypeScript 5.0 새로운 기능',
          author: { name: '이영희' },
          commentCount: 3,
        }}
      />
      <PostCard
        post={{
          ...mockPost,
          id: '3',
          title: 'Tailwind CSS 실전 활용법',
          author: { name: '박민수', avatarUrl: 'https://github.com/shadcn.png' },
          commentCount: 8,
        }}
      />
    </div>
  ),
  args: {
    post: mockPost,
  },
};
