import { PersonalProgressWidget } from './personal-progress-widget';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Features/Dashboard/PersonalProgressWidget',
  component: PersonalProgressWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalProgressWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoProgress: Story = {
  args: {
    postCount: 0,
    commentCount: 0,
  },
};

export const PartialProgress: Story = {
  args: {
    postCount: 1,
    commentCount: 5,
  },
};

export const PostGoalAchieved: Story = {
  args: {
    postCount: 2,
    commentCount: 5,
  },
};

export const CommentGoalAchieved: Story = {
  args: {
    postCount: 1,
    commentCount: 10,
  },
};

export const AllGoalsAchieved: Story = {
  args: {
    postCount: 2,
    commentCount: 10,
  },
};

export const ExceededGoals: Story = {
  args: {
    postCount: 3,
    commentCount: 15,
  },
};
