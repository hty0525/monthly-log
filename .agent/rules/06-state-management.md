# 상태 관리 전략

## 로컬 상태
- `useState`, `useReducer` 사용

## 서버 상태
- **React Query** 사용 (`@tanstack/react-query`)
- `queries/` 폴더에 정의

## 전역 상태
- **Zustand** 사용 (가볍고 간단, 보일러플레이트 최소화)
- `features/{feature}/store/` 또는 `shared/store/`에 정의
- 최소한으로 사용 (서버 상태는 React Query로 관리)

```typescript
// features/auth/store/auth-store.ts
import { create } from 'zustand';

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```
