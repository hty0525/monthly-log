# 개발 습관

## 커밋 메시지
- **한글**로 작성
- **Prefix** 사용 (Conventional Commits 한글 버전)
  ```
  기능: 사용자 프로필 페이지 추가
  수정: 로그인 버튼 스타일 개선
  버그: 날짜 포맷 오류 수정
  리팩토링: 인증 로직 훅으로 분리
  문서: README 설치 가이드 추가
  스타일: 코드 포맷팅 적용
  테스트: 로그인 플로우 테스트 추가
  ```

## 주석
- **한글**로 작성
- **JSDoc 사용 안 함**
- 복잡한 로직에만 간결하게 작성
  ```typescript
  // ✅ Good
  // 7일 이상 지난 게시글은 자동으로 아카이브 처리
  const isArchived = daysSinceCreated > 7;
  
  // ❌ Bad (불필요한 주석)
  // 사용자 이름을 가져옴
  const userName = user.name;
  ```

## 에러 핸들링 (TanStack Query 중심)

### 기본 원칙
- **모든 API 에러는 TanStack Query에서 처리**
- **전역 설정**으로 일관된 에러 처리
- **개별 쿼리**에서 필요시 오버라이드

### 1단계: QueryClient 전역 설정
`shared/lib/query-client.ts`에서 전역 에러 핸들러 설정

```typescript
// shared/lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';
import { toast } from './toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 모든 쿼리 에러를 전역에서 처리
      onError: (error) => {
        const message = error instanceof Error 
          ? error.message 
          : '데이터를 불러오는데 실패했습니다.';
        toast.error(message);
      },
      retry: 1, // 1번만 재시도
      staleTime: 60 * 1000, // 1분
    },
    mutations: {
      // 모든 뮤테이션 에러를 전역에서 처리
      onError: (error) => {
        const message = error instanceof Error 
          ? error.message 
          : '요청 처리에 실패했습니다.';
        toast.error(message);
      },
    },
  },
});
```

```typescript
// app/providers.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/query-client';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
```

### 2단계: 개별 쿼리에서 오버라이드
특정 에러를 다르게 처리해야 할 때만 개별 설정

```typescript
// ✅ Good - 기본 전역 에러 처리 사용
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  // onError 없음 → 전역 설정 사용
});

// ✅ Good - 특정 에러만 다르게 처리
const { data } = useQuery({
  queryKey: ['post', postId],
  queryFn: () => fetchPost(postId),
  onError: (error) => {
    if (error instanceof NotFoundError) {
      // 404는 toast 대신 페이지 리다이렉트
      router.push('/404');
    }
    // 나머지는 전역 핸들러가 처리
  },
});

// ✅ Good - 뮤테이션에서 성공/실패 모두 처리
const { mutate } = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    toast.success('게시글이 작성되었습니다.');
    router.push('/posts');
  },
  onError: (error) => {
    // 특정 에러 타입별 처리
    if (error instanceof ValidationError) {
      toast.error('입력값을 확인해주세요.');
    }
    // 나머지는 전역 핸들러가 처리
  },
});
```

### 3단계: Error Boundary (쿼리 외부 에러)
TanStack Query가 처리하지 못하는 에러만 캐치

```typescript
// ✅ Good - 렌더링 에러, 예상치 못한 에러만 처리
// app/layout.tsx
<ErrorBoundary fallback={<GlobalErrorFallback />}>
  {children}
</ErrorBoundary>
```

### 에러 처리 흐름
1. **TanStack Query 전역 설정** (API 에러 90%)
2. **개별 쿼리 onError** (특수한 케이스만)
3. **Error Boundary** (렌더링 에러, 예상치 못한 에러)

### ❌ 피해야 할 패턴
```typescript
// ❌ Bad - try-catch로 쿼리 에러 처리 (TanStack Query에 맡겨야 함)
try {
  const data = await fetchUser();
} catch (error) {
  toast.error('에러 발생');
}

// ❌ Bad - 모든 쿼리마다 onError 중복 작성
const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  onError: (error) => {
    toast.error(error.message); // 전역 설정으로 충분
  },
});
```
