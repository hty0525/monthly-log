import { Badge } from './badge';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Shared/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'danger', 'outline'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: '🎉 목표 달성',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: '⚠️ 목표 미달',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: '반려됨',
    variant: 'danger',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="success">승인됨</Badge>
      <Badge variant="warning">대기중</Badge>
      <Badge variant="danger">반려됨</Badge>
    </div>
  ),
};

export const ProgressBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Badge variant="success">글 2/2 ✓</Badge>
        <Badge variant="success">댓글 10/10 ✓</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="warning">글 1/2</Badge>
        <Badge variant="danger">댓글 3/10</Badge>
      </div>
    </div>
  ),
};
