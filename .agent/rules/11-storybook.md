# Storybook 사용 가이드

## 목적
- **UI 컴포넌트 개발**: 독립적인 환경에서 컴포넌트 개발
- **시각적 테스트**: 다양한 상태와 variant 확인
- **문서화**: 컴포넌트 사용법 자동 문서화
- **협업**: 디자이너/개발자 간 컴포넌트 공유

---

## 설치

```bash
npx storybook@latest init
```

Storybook이 자동으로 프로젝트를 감지하고 설정합니다.

---

## 폴더 구조

```
.storybook/
├── main.ts           # Storybook 설정
└── preview.ts        # 전역 데코레이터, 파라미터

shared/components/
└── button/
    ├── button.tsx
    └── button.stories.tsx    # Storybook 스토리
```

---

## 스토리 작성 규칙

### 기본 구조
```typescript
// shared/components/button/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'default',
    size: 'default',
  },
};

// Variant 별 스토리
export const Destructive: Story = {
  args: {
    children: '삭제',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: '취소',
    variant: 'outline',
  },
};

// 크기 별 스토리
export const Small: Story = {
  args: {
    children: '작은 버튼',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: '큰 버튼',
    size: 'lg',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};
```

---

## 네이밍 규칙

### 파일명
- `{component-name}.stories.tsx` (kebab-case)
- 예: `button.stories.tsx`, `input.stories.tsx`

### 스토리 제목
- `{Layer}/{ComponentName}` 형식
- 예: `Shared/Button`, `Features/Auth/LoginForm`

### 스토리 이름
- PascalCase 사용
- 상태나 variant를 명확히 표현
- 예: `Default`, `Destructive`, `Loading`, `WithIcon`

---

## 필수 작성 대상

### Shared 컴포넌트
모든 `shared/components/` 컴포넌트는 **필수**로 스토리 작성

- ✅ Button
- ✅ Input
- ✅ Modal
- ✅ Dropdown
- ✅ Toast
- ✅ Tabs
- ✅ Accordion
- 등등...

### Features 컴포넌트
복잡하거나 재사용 가능한 컴포넌트만 **선택적** 작성

- 예: `features/auth/components/login-form/`

---

## Storybook 설정

### Tailwind CSS 적용
```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import '../app/globals.css'; // Tailwind CSS import

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

### 다크모드 지원 (선택)
```bash
npm install @storybook/addon-themes
```

```typescript
// .storybook/preview.ts
import { withThemeByClassName } from '@storybook/addon-themes';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];
```

---

## 실행 명령어

```bash
# Storybook 개발 서버 실행
npm run storybook

# Storybook 빌드 (정적 파일 생성)
npm run build-storybook
```

---

## 스토리 작성 체크리스트

컴포넌트 완성 후 확인:
- [ ] 모든 variant 스토리 작성
- [ ] 모든 size 스토리 작성
- [ ] disabled, loading 등 상태 스토리 작성
- [ ] argTypes로 인터랙티브 컨트롤 추가
- [ ] 반응형 확인 (viewport addon 활용)
- [ ] 접근성 확인 (a11y addon 활용)

---

## 예시: Input 컴포넌트

```typescript
// shared/components/input/input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
  title: 'Shared/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '이름을 입력하세요',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="email">이메일</label>
      <Input id="email" type="email" placeholder="example@email.com" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화',
    disabled: true,
  },
};

export const Error: Story = {
  render: () => (
    <div className="space-y-2">
      <Input placeholder="이메일" className="border-red-500" />
      <p className="text-sm text-red-500">올바른 이메일을 입력해주세요</p>
    </div>
  ),
};
```

---

## 주의사항

### ❌ 하지 말아야 할 것
- Storybook에서 실제 API 호출 (Mock 데이터 사용)
- 복잡한 비즈니스 로직 포함
- 외부 의존성이 많은 컴포넌트 (분리 필요)

### ✅ 해야 할 것
- 순수 UI 컴포넌트만 스토리 작성
- Mock 데이터로 다양한 상태 시뮬레이션
- 접근성 테스트 (a11y addon)
- 반응형 테스트 (viewport addon)
