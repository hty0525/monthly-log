# 라이브러리 사용 원칙

## 기본 원칙
**라이브러리 사용을 최대한 지양하고 직접 구현하여 학습한다.**

## 허용되는 라이브러리 (필수 인프라)

### 프레임워크 & 코어
- ✅ **Next.js** - 프레임워크
- ✅ **React** - UI 라이브러리
- ✅ **TypeScript** - 언어

### 백엔드 & 데이터
- ✅ **Supabase** (`@supabase/ssr`) - 백엔드 서비스
- ✅ **TanStack Query** (`@tanstack/react-query`) - 서버 상태 관리
- ✅ **Zustand** - 전역 상태 관리

### 폼 관리
- ✅ **React Hook Form** - 폼 상태 관리 및 유효성 검사
- ✅ **Zod** - 스키마 검증 및 TypeScript 타입 추론

### 아이콘
- ✅ **lucide-react** 또는 **react-icons** - SVG 아이콘 라이브러리

### 스타일링 (최소한)
- ✅ **Tailwind CSS** - CSS 프레임워크
- ✅ **clsx** - 클래스 병합
- ✅ **tailwind-merge** - Tailwind 클래스 충돌 방지
- ✅ **class-variance-authority** - Variant 관리

### 개발 도구
- ✅ **pnpm** - 패키지 매니저
- ✅ **ESLint** - 린팅
- ✅ **Prettier** (선택) - 포맷팅
- ✅ **Storybook** - UI 컴포넌트 개발 및 테스트

---

## 필수 패키지 설치

**패키지 매니저**: pnpm 사용

```bash
# 핵심 라이브러리
pnpm install @supabase/ssr @tanstack/react-query zustand

# 폼 관리
pnpm install react-hook-form zod @hookform/resolvers

# 스타일링
pnpm install clsx tailwind-merge class-variance-authority

# 아이콘
pnpm install lucide-react
# 또는
pnpm install react-icons

# 개발 도구
pnpm dlx storybook@latest init
```

---

## 직접 구현해야 하는 것들

### HTTP 클라이언트
- ❌ **axios 사용 금지**
- ✅ **직접 구현**: fetch API 래퍼 + 인터셉터 패턴
- 💡 **학습 목표**: 네이티브 fetch API, 인터셉터 패턴, 에러 핸들링

```typescript
// ❌ Bad
import axios from 'axios';

// ✅ Good - fetch 래퍼 직접 구현
// shared/lib/api-client.ts
type RequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // 요청 인터셉터
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '요청에 실패했습니다.');
    }

    return response.json();
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const params = config?.params 
      ? `?${new URLSearchParams(config.params)}` 
      : '';
    
    return this.request<T>(`${url}${params}`, {
      method: 'GET',
      headers: config?.headers,
    });
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: config?.headers,
    });
  }

  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: config?.headers,
    });
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
      headers: config?.headers,
    });
  }
}

export const apiClient = new ApiClient();
```

**사용 예시:**
```typescript
// features/post/queries/use-posts.ts
import { apiClient } from '@/shared/lib/api-client';

const fetchPosts = async () => {
  return apiClient.get<Post[]>('/api/posts');
};
```

### UI 컴포넌트
- ❌ **shadcn/ui, Radix UI, Headless UI 등 사용 금지**
- ✅ **직접 구현**: Button, Input, Modal, Dropdown, Tabs, Accordion 등
- 💡 **학습 목표**: 접근성, 키보드 네비게이션, 상태 관리 이해

```typescript
// ❌ Bad - 라이브러리 사용
import { Button } from '@/components/ui/button'; // shadcn/ui

// ✅ Good - 직접 구현
import { Button } from '@/shared/components/button'; // 직접 만든 컴포넌트
```

### 유틸리티
- ❌ **lodash, ramda 등 사용 금지**
- ✅ **직접 구현**: debounce, throttle, deepClone, groupBy 등
- 💡 **학습 목표**: JavaScript 기본 개념, 성능 최적화

```typescript
// ❌ Bad
import { debounce } from 'lodash';

// ✅ Good - 직접 구현
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
```

### 날짜 처리
- ❌ **date-fns, moment, dayjs 등 사용 금지**
- ✅ **직접 구현**: 날짜 포맷팅, 계산, 비교
- 💡 **학습 목표**: Date API, Intl API 활용

```typescript
// ❌ Bad
import { format } from 'date-fns';

// ✅ Good - 직접 구현
export const formatDate = (date: Date, format: string) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
};
```

### 애니메이션
- ❌ **Framer Motion, React Spring 등 사용 금지**
- ✅ **직접 구현**: CSS Transitions, CSS Animations, Web Animations API
- 💡 **학습 목표**: CSS 애니메이션, 성능 최적화 (GPU 가속)

```typescript
// ❌ Bad
import { motion } from 'framer-motion';

// ✅ Good - CSS + Tailwind
<div className="transition-all duration-300 hover:scale-105">
  ...
</div>
```

### Toast/알림
- ❌ **react-hot-toast, sonner 등 사용 금지**
- ✅ **직접 구현**: Toast 컴포넌트 + Context API
- 💡 **학습 목표**: Portal, Context API, 애니메이션

```typescript
// ❌ Bad
import toast from 'react-hot-toast';

// ✅ Good - 직접 구현
import { useToast } from '@/shared/hooks/use-toast';
```

---

## 명확히 금지되는 라이브러리

### CSS-in-JS
- ❌ **styled-components, emotion, stitches 등**
- 이유: Tailwind CSS 사용 중, 번들 크기 증가

### UI 프레임워크/템플릿
- ❌ **Material-UI, Ant Design, Chakra UI 등**
- ❌ **템플릿 구매 및 사용**
- 이유: 직접 구현 원칙 위배

### 추가 상태 관리
- ❌ **Redux, Recoil, Jotai, MobX, XState 등**
- 이유: Zustand + TanStack Query로 충분

### 테이블/그리드
- ❌ **TanStack Table, AG Grid, react-data-grid 등**
- 이유: 직접 구현으로 학습

### 드래그 앤 드롭
- ❌ **react-beautiful-dnd, dnd-kit, react-dnd 등**
- 이유: HTML5 Drag and Drop API 직접 사용

### 마크다운
- ❌ **react-markdown, MDX, remark 등**
- 이유: 필요 시 최소한의 파서만 직접 구현

### 이미지 처리
- ❌ **react-image-crop, react-dropzone 등**
- 이유: File API, Canvas API로 직접 구현
- 예외: `next/image`는 허용 (Next.js 내장)

### 불필요한 유틸리티
- ❌ **nanoid, uuid** → `crypto.randomUUID()` 사용
- ❌ **qs, query-string** → `URLSearchParams` 사용
- ❌ **classnames** → `clsx` 사용 (이미 허용됨)

---

## 예외 상황

### 언제 라이브러리를 사용할 수 있나?

1. **보안이 중요한 경우**
   - 예: 암호화, 인증 토큰 처리
   - 직접 구현 시 보안 취약점 발생 가능

2. **브라우저 호환성이 복잡한 경우**
   - 예: 특정 Web API의 polyfill
   - 모든 브라우저 대응이 너무 복잡할 때

3. **시간 대비 학습 효과가 낮은 경우**
   - 예: 복잡한 수학 계산, 특수한 알고리즘
   - 팀 논의 후 결정

### 라이브러리 도입 프로세스
1. **먼저 직접 구현 시도**
2. **구현의 어려움/한계 문서화**
3. **팀 논의 및 합의**
4. **도입 시 학습 내용 공유**

---

## 학습 가이드

### 직접 구현 시 참고 자료
- **MDN Web Docs** - 웹 표준 API
- **React 공식 문서** - React 패턴
- **Web.dev** - 웹 성능, 접근성
- **W3C WAI-ARIA** - 접근성 가이드

### 구현 우선순위
1. **핵심 UI 컴포넌트** (Button, Input, Modal)
2. **유틸리티 함수** (debounce, formatDate 등)
3. **Toast/알림 시스템**
4. **복잡한 컴포넌트** (Dropdown, Tabs, Accordion)

---

## 체크리스트

새로운 기능 구현 전 확인:
- [ ] 이 기능을 직접 구현할 수 있는가?
- [ ] 직접 구현 시 학습 효과가 있는가?
- [ ] 라이브러리가 정말 필요한가? (보안, 호환성 등)
- [ ] 팀원들과 논의했는가?
