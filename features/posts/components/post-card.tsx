import { Avatar } from '@/shared/components/avatar/avatar';
import { Card, CardHeader, CardContent, CardFooter } from '@/shared/components/card/card';

import type { FC } from 'react';

export type Post = {
  id: string;
  title: string;
  url: string;
  description?: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  createdAt: Date;
  commentCount: number;
};

type PostCardProps = {
  post: Post;
  onClick?: () => void;
};

export const PostCard: FC<PostCardProps> = ({ post, onClick }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar
            src={post.author.avatarUrl}
            alt={post.author.name}
            fallback={post.author.name.charAt(0)}
          />
          <div className="flex-1">
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <h4 className="font-semibold text-lg">{post.title}</h4>
        {post.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.description}
          </p>
        )}
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {post.url}
        </a>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground">
        💬 댓글 {post.commentCount}개
      </CardFooter>
    </Card>
  );
};
