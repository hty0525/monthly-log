import { Avatar } from './avatar';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Shared/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'User',
  },
};

export const WithFallback: Story = {
  args: {
    alt: '홍길동',
    fallback: '홍',
  },
};

export const Small: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    size: 'xl',
  },
};

export const NoImage: Story = {
  args: {
    alt: 'User',
  },
};

export const UserList: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Avatar src="https://github.com/shadcn.png" alt="User 1" />
      <Avatar fallback="홍" alt="홍길동" />
      <Avatar fallback="김" alt="김철수" />
      <Avatar fallback="이" alt="이영희" />
    </div>
  ),
};
