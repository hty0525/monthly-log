# API 호출 및 데이터 관리

## 기술 스택
- **백엔드**: Supabase (인증, 데이터베이스, 스토리지)
- **API Layer**: Next.js API Routes (`app/api/`)
- **데이터 페칭**: TanStack Query

## API Routes 구조
```
app/
└── api/
    ├── auth/
    │   ├── login/
    │   │   └── route.ts
    │   └── logout/
    │       └── route.ts
    ├── posts/
    │   ├── route.ts          # GET /api/posts, POST /api/posts
    │   └── [id]/
    │       └── route.ts      # GET /api/posts/:id, PATCH, DELETE
    └── users/
        └── [id]/
            └── route.ts
```

## Supabase 클라이언트 설정

### 서버 컴포넌트용 (Server-Side)
```typescript
// shared/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};
```

### 클라이언트 컴포넌트용 (Client-Side)
```typescript
// shared/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
```

## API Route 작성 예시
```typescript
// app/api/posts/route.ts
import { createClient } from '@/shared/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET /api/posts
export async function GET(request: Request) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// POST /api/posts
export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('posts')
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}
```

## 클라이언트에서 API 호출
`features/{feature}/queries/`에 TanStack Query 훅 정의

```typescript
// features/post/queries/use-posts.ts
import { useQuery } from '@tanstack/react-query';

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '게시글을 불러올 수 없습니다.');
  }
  
  return response.json();
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
};
```

```typescript
// features/post/queries/use-create-post.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/shared/lib/toast';

type CreatePostInput = {
  title: string;
  content: string;
};

const createPost = async (input: CreatePostInput) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '게시글 작성에 실패했습니다.');
  }

  return response.json();
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 캐시 무효화로 목록 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('게시글이 작성되었습니다.');
    },
  });
};
```

## 사용 예시
```typescript
// features/post/components/post-list.tsx
'use client';

import { usePosts } from '../queries/use-posts';

export const PostList = () => {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
```

## API 호출 규칙
- ✅ **클라이언트에서 Supabase 직접 호출 금지** (인증 토큰 노출 위험)
- ✅ **모든 데이터 요청은 API Routes를 거쳐야 함**
- ✅ **API Routes에서 Supabase 서버 클라이언트 사용**
- ✅ **에러는 적절한 HTTP 상태 코드와 함께 반환**
- ✅ **TanStack Query로 캐싱 및 상태 관리**
