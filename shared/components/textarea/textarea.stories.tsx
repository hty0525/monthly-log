import { Textarea } from './textarea';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Shared/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요',
  },
};

export const WithLabel: Story = {
  args: {
    label: '설명',
    placeholder: '글에 대한 간단한 설명을 입력하세요',
  },
};

export const WithError: Story = {
  args: {
    label: '댓글',
    placeholder: '댓글을 입력하세요',
    error: '댓글은 최소 10자 이상 입력해야 합니다',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '내용',
    placeholder: '자유롭게 작성하세요',
    helperText: '최대 500자까지 입력 가능합니다',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
};
