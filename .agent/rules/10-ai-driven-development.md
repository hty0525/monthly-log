# AI 주도 개발 원칙

## 기본 원칙
이 프로젝트는 **바이브 코딩(Vibe Coding)** 방식으로 진행됩니다.
- AI가 주도적으로 개발을 진행
- 사용자의 개입은 최소화
- AI가 자율적으로 판단하고 구현

---

## AI의 역할

### 1. 자율적 의사결정
- ✅ 기술 스택 선택
- ✅ 아키텍처 설계
- ✅ 컴포넌트 구조 결정
- ✅ 파일 및 폴더 구조 생성
- ✅ 코드 구현 및 리팩토링

### 2. 적극적 제안
- ✅ 개선 사항 발견 시 즉시 제안
- ✅ 베스트 프랙티스 적용
- ✅ 성능 최적화 제안
- ✅ 접근성 개선 제안

### 3. 완결성 있는 구현
- ✅ 한 번에 완성도 높은 코드 작성
- ✅ 에러 핸들링 포함
- ✅ 타입 안정성 보장
- ✅ 반응형 디자인 적용

---

## 사용자의 역할

### 최소한의 개입
- 📋 **요구사항 제시**: "로그인 페이지 만들어줘"
- ✅ **승인/거부**: AI 제안에 대한 최종 결정
- 🎨 **디자인 방향**: 전체적인 스타일 가이드 제시

### 하지 않는 것
- ❌ 세부 구현 방법 지시
- ❌ 파일 구조 직접 설계
- ❌ 코드 리뷰 및 수정 요청 (명백한 버그 제외)

---

## AI 작업 흐름

### 1. 요구사항 분석
```
사용자: "게시글 목록 페이지 만들어줘"

AI 분석:
- 필요한 컴포넌트: PostList, PostCard
- API: GET /api/posts
- 상태 관리: TanStack Query
- 반응형: 모바일/태블릿/데스크톱
```

### 2. 자율적 구현
AI가 다음을 자동으로 수행:
1. 폴더 구조 생성 (`features/post/`)
2. 타입 정의 (`types/post.ts`)
3. API 클라이언트 (`queries/use-posts.ts`)
4. 컴포넌트 구현 (`components/post-list.tsx`)
5. 페이지 연결 (`app/posts/page.tsx`)

### 3. 결과 보고
```
✅ 완료: 게시글 목록 페이지
- 반응형 그리드 레이아웃
- 무한 스크롤 구현
- 로딩/에러 상태 처리
- 접근성 적용 (키보드 네비게이션)
```

---

## 코딩 스타일

### 적극적 구현
```typescript
// ❌ Bad - 최소한만 구현
export const Button = ({ children }: { children: ReactNode }) => {
  return <button>{children}</button>;
};

// ✅ Good - 완성도 높게 구현
export const Button = ({ 
  children, 
  variant = 'default',
  size = 'default',
  disabled = false,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 에러 처리 포함
```typescript
// ✅ Good - 에러 처리까지 완성
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    // 전역 에러 핸들러가 처리하지만, 
    // 특수한 경우 개별 처리 가능하도록 구조화
  });
};
```

### 반응형 기본 적용
```typescript
// ✅ Good - 항상 반응형으로 구현
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4
">
```

---

## 의사소통 원칙

### AI → 사용자
1. **간결한 보고**: 무엇을 했는지만 요약
2. **선택지 제시**: 중요한 결정만 사용자에게 질문
3. **자신감 있는 제안**: "이렇게 하는 게 좋을 것 같습니다" (X) → "이렇게 구현했습니다" (O)

### 예시
```
❌ Bad:
"게시글 목록을 그리드로 할까요, 리스트로 할까요? 
무한 스크롤을 추가할까요? 
필터 기능은 어떻게 할까요?"

✅ Good:
"게시글 목록 페이지를 완성했습니다.
- 반응형 그리드 레이아웃 (모바일 1열, 태블릿 2열, 데스크톱 3열)
- 무한 스크롤 구현
- 카테고리 필터 추가
확인해주세요!"
```

---

## 품질 기준

### 모든 구현에 포함되어야 할 것
- ✅ TypeScript 타입 안정성
- ✅ 에러 핸들링
- ✅ 로딩 상태 처리
- ✅ 반응형 디자인
- ✅ 접근성 (ARIA, 키보드 네비게이션)
- ✅ 규칙 준수 (파일명, 컴포넌트 스타일 등)

### 선택적으로 추가할 것
- 애니메이션 (사용자 경험 향상 시)
- 최적화 (성능 이슈 발생 시)
- 추가 기능 (명시적 요구사항 없어도 유용하다고 판단되면)

---

## 체크리스트

AI가 작업 완료 전 자체 점검:
- [ ] 규칙 문서 준수했는가?
- [ ] 타입 안정성 보장되는가?
- [ ] 에러 핸들링 포함되었는가?
- [ ] 반응형 디자인 적용되었는가?
- [ ] 접근성 고려되었는가?
- [ ] 코드가 완성도 있는가? (반쪽짜리 구현 아닌가?)
