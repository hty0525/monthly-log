import { Input } from './input';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Shared/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    inputSize: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '입력하세요',
  },
};

export const WithLabel: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'URL',
    placeholder: 'https://example.com',
    error: '올바른 URL을 입력해주세요',
    type: 'url',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '제목',
    placeholder: '글 제목을 입력하세요',
    helperText: '최대 100자까지 입력 가능합니다',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    inputSize: 'sm',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    inputSize: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const URLInput: Story = {
  args: {
    label: '블로그 글 URL',
    placeholder: 'https://your-blog.com/post',
    type: 'url',
    helperText: '작성한 블로그 글의 URL을 입력하세요',
  },
};
