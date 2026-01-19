# 스타일링

## 기술 스택
- **CSS 프레임워크**: Tailwind CSS 4
- **클래스 병합**: `clsx` + `tailwind-merge` (→ `cn` 유틸리티)
- **Variant 관리**: `class-variance-authority` (CVA)

## cn 유틸리티 함수
조건부 클래스와 Tailwind 클래스 충돌 방지

```typescript
// shared/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
```

**사용 예시:**
```typescript
// ✅ Good - 조건부 클래스 + 충돌 방지
<div className={cn(
  'px-4 py-2',
  isActive && 'bg-blue-500',
  className // props로 받은 추가 클래스
)} />

// ❌ Bad - 클래스 충돌 발생 가능
<div className={`px-4 py-2 ${isActive ? 'bg-blue-500' : ''}`} />
```

## CVA로 Variant 기반 컴포넌트
재사용 가능한 컴포넌트를 variant로 관리

```typescript
// shared/components/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  // base 스타일 (항상 적용)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ 
  className, 
  variant, 
  size, 
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};
```

**사용 예시:**
```typescript
// ✅ Good - variant로 스타일 제어
<Button variant="default" size="lg">
  저장
</Button>

<Button variant="destructive" size="sm">
  삭제
</Button>

<Button variant="outline" className="mt-4">
  취소
</Button>
```

## Compound Variants (조합 스타일)
특정 variant 조합에 대한 스타일 정의

```typescript
const buttonVariants = cva('...base', {
  variants: {
    variant: { /* ... */ },
    size: { /* ... */ },
  },
  compoundVariants: [
    {
      variant: 'destructive',
      size: 'lg',
      className: 'uppercase font-bold', // destructive + lg 조합
    },
  ],
  defaultVariants: { /* ... */ },
});
```

## 스타일링 규칙
- ✅ **모든 조건부 클래스는 `cn()` 사용**
- ✅ **재사용 컴포넌트는 CVA로 variant 정의**
- ✅ **`shared/components/`의 UI 컴포넌트는 모두 variant 지원**
- ✅ **props로 `className` 받아서 확장 가능하게**
- ❌ **인라인 스타일(`style={{}}`) 사용 지양** (Tailwind로 해결)
- ❌ **문자열 템플릿으로 클래스 조합 금지** (`` `${class1} ${class2}` ``)

## 필수 패키지
```bash
npm install clsx tailwind-merge class-variance-authority
```
