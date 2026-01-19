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

## Import 순서
1. React 및 Next.js 관련
2. 외부 라이브러리
3. `@/shared` (공통 모듈)
4. `@/features` (기능별 모듈)
5. 상대 경로 import
6. 타입 import (마지막)
7. 스타일 import (최하단)

```typescript
// ✅ Good
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import { Button } from '@/shared/components/button';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { UserCard } from './user-card';

import type { User } from '@/shared/types/user';
import './styles.css';
```
