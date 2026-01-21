import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from '../button/button';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Shared/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content goes here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>블로그 글 작성</CardTitle>
        <CardDescription>이번 달 목표를 달성하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">현재 진행률: 1/2 글 작성 완료</p>
      </CardContent>
      <CardFooter>
        <Button>글 등록하기</Button>
      </CardFooter>
    </Card>
  ),
};

export const Outline: Story = {
  render: () => (
    <Card variant="outline" className="w-[350px]">
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
        <CardDescription>This card has an outline variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content with outline style.</p>
      </CardContent>
    </Card>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost" className="w-[350px]">
      <CardHeader>
        <CardTitle>Ghost Card</CardTitle>
        <CardDescription>This card has no border or shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Minimal style card.</p>
      </CardContent>
    </Card>
  ),
};

export const SmallPadding: Story = {
  render: () => (
    <Card padding="sm" className="w-[350px]">
      <CardHeader>
        <CardTitle>Small Padding</CardTitle>
        <CardDescription>Compact card layout</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Less padding for tighter layouts.</p>
      </CardContent>
    </Card>
  ),
};

export const PostCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200" />
          <div>
            <CardTitle className="text-base">홍길동</CardTitle>
            <CardDescription>2024년 1월 15일</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <h4 className="font-semibold">Next.js 14 App Router 완벽 가이드</h4>
        <p className="text-sm text-muted-foreground">
          https://example.com/nextjs-app-router-guide
        </p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        댓글 5개
      </CardFooter>
    </Card>
  ),
};
