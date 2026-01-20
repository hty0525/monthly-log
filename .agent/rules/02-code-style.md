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
