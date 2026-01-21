# 코드 스타일 & 컨벤션

## TypeScript
- **타입 정의**: `interface` 대신 `type`을 사용
  ```typescript
  // ✅ Good
  type User = {
    id: string;
    name: string;
  };
  
  // ❌ Bad
  interface User {
    id: string;
    name: string;
  }
  ```

## 컴포넌트 작성
- **화살표 함수**로 작성
- **Named Export** 사용 (default export 지양)
  ```typescript
  // ✅ Good
  export const UserProfile = () => {
    return <div>...</div>;
  };
  
  // ❌ Bad
  export default function UserProfile() {
    return <div>...</div>;
  }
  ```

## 파일 네이밍
- **kebab-case** 사용
  ```
  ✅ user-profile.tsx
  ✅ use-auth.ts
  ✅ format-date.ts
  
  ❌ UserProfile.tsx
  ❌ useAuth.ts
  ❌ formatDate.ts
  ```

## Import 순서 및 형식

### 1. Import 형식
- 타입 임포트 시 반드시 `import type { ... }` 형식을 사용하며, 항상 파일의 **최하단(스타일 제외)**에 배치합니다.

### 2. Import 순서
상단부터 아래의 순서대로 그룹화하여 작성하며, 각 그룹 사이에는 한 줄의 공백을 둡니다.

1. **라이브러리**: React, Next.js 및 외부 라이브러리
2. **훅**: 커스텀 훅 (`use-`로 시작하는 파일)
3. **유틸리티**: 공통 유틸리티 함수 (`shared/lib` 등)
4. **상수**: 프로젝트 전역 또는 지역 상수
5. **컴포넌트**: 공통 혹은 기능별 UI 컴포넌트
6. **타입**: `import type`을 사용한 타입 정의 (최하단)
7. **스타일**: `.css`, `.scss` 등 스타일 파일 (최하단)

```typescript
// ✅ Good
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx'; // 라이브러리

import { useAuth } from '@/features/auth/hooks/use-auth'; // 훅

import { formatDate } from '@/shared/lib/utils'; // 유틸리티

import { API_ENDPOINT } from '@/shared/constants/api'; // 상수

import { Button } from '@/shared/components/button'; // 컴포넌트
import { UserCard } from './user-card';

import type { User, UserRole } from '@/shared/types/user'; // 타입 (최하단)
import './styles.css'; // 스타일 (최하단)
```

## 컴포넌트 구조

### 폴더 구조
- 컴포넌트가 wrapper 역할을 하고 하위 컴포넌트를 포함하는 경우, 폴더로 구성합니다.
  ```
  ✅ Good
  app/_components/
  ├── main-content/
  │   ├── index.tsx          (MainContent - wrapper)
  │   ├── sidebar.tsx        (Sidebar)
  │   └── post-list-client.tsx (PostListClient)
  
  ❌ Bad
  app/_components/
  ├── main-content.tsx
  ├── sidebar.tsx
  └── post-list-client.tsx
  ```

### CSR/SSR 분리
- **서버 컴포넌트 (SSR)**: 데이터 페칭, 정적 UI
- **클라이언트 컴포넌트 (CSR)**: 상태 관리, 이벤트 핸들러가 필요한 부분만
- 불필요하게 전체를 CSR로 만들지 않습니다.
  ```typescript
  // ✅ Good - 필요한 부분만 CSR
  // app/page.tsx (SSR)
  export default async function Page() {
    const data = await fetchData();
    return <ClientComponent data={data} />;
  }
  
  // app/_components/client-component.tsx (CSR)
  'use client';
  export const ClientComponent = ({ data }) => {
    const [state, setState] = useState();
    return <div onClick={...}>...</div>;
  };
  
  // ❌ Bad - 전체를 CSR로
  'use client';
  export default function Page() {
    const [state, setState] = useState();
    return <div>...</div>;
  }
  ```

## 변수 추출

### 이벤트 핸들러
- 인라인 함수 대신 변수로 추출합니다.
  ```typescript
  // ✅ Good
  const handleClick = (id: string) => {
    console.log('clicked:', id);
  };
  <button onClick={() => handleClick(item.id)}>Click</button>
  
  // ❌ Bad
  <button onClick={() => console.log('clicked:', item.id)}>Click</button>
  ```

### 텍스트 및 계산된 값
- JSX 내부의 복잡한 표현식은 변수로 추출합니다.
  ```typescript
  // ✅ Good
  const title = selectedDate
    ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 활동`
    : '전체 활동';
  const postCountText = `${posts.length}개의 글`;
  
  return (
    <div>
      <h2>{title}</h2>
      <p>{postCountText}</p>
    </div>
  );
  
  // ❌ Bad
  return (
    <div>
      <h2>
        {selectedDate
          ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 활동`
          : '전체 활동'}
      </h2>
      <p>{posts.length}개의 글</p>
    </div>
  );
  ```
