---
description: 코드 재사용성과 효율성 가이드라인
---

# 코드 재사용성과 효율성 규칙

## 핵심 원칙

### 1. DRY (Don't Repeat Yourself)
- **절대 코드를 두 번 이상 복사-붙여넣기 하지 않는다**
- 2곳 이상에서 비슷한 코드를 발견하면 즉시 추출한다
- 로직을 복제하는 대신 공통 유틸, 훅, 컴포넌트를 만든다

### 2. 재사용성 우선
코드를 작성하기 전에 항상 질문하기:
- 이 로직이 이미 어딘가에 존재하는가?
- 이것을 향후 사용을 위해 일반화할 수 있는가?
- 앱의 다른 부분에서도 이것이 필요한가?

### 3. 영리함보다 효율성
- 성능이 좋으면서도 단순하고 읽기 쉬운 코드를 작성한다
- 조기 최적화는 피하되, 명백히 비효율적인 코드는 작성하지 않는다
- 커스텀 구현보다 내장 메서드를 선호한다

## 구현 가이드라인

### 컴포넌트

#### ✅ 좋은 예: 재사용 가능한 컴포넌트
```tsx
// 좋음: 재사용 가능한 Button 컴포넌트
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return <button className={cn(styles[variant], styles[size])} {...props} />;
}
```

#### ❌ 나쁜 예: 버튼 스타일 중복
```tsx
// 나쁨: 모든 컴포넌트에서 버튼 로직 중복
function LoginPage() {
  return <button className="bg-blue-500 px-4 py-2 rounded">로그인</button>;
}

function SignupPage() {
  return <button className="bg-blue-500 px-4 py-2 rounded">회원가입</button>;
}
```

#### ✅ 좋은 예: 컴포짓 패턴으로 유연한 구성
```tsx
// 좋음: 기본 뼈대 + 특정 기능을 조합하는 컴포짓 패턴
// 기본 Card 컴포넌트 (뼈대)
export function Card({ children, className }: CardProps) {
  return <div className={cn('card', className)}>{children}</div>;
}

// 특정 기능들 (조합 가능한 부품)
Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
};

Card.Footer = function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card-footer">{children}</div>;
};

// 사용: 필요한 부분만 조합
function UserProfile() {
  return (
    <Card>
      <Card.Header>사용자 정보</Card.Header>
      <Card.Body>
        <p>이름: 홍길동</p>
      </Card.Body>
    </Card>
  );
}

function ProductCard() {
  return (
    <Card>
      <Card.Header>상품명</Card.Header>
      <Card.Body>상품 설명</Card.Body>
      <Card.Footer>₩10,000</Card.Footer>
    </Card>
  );
}
```

#### ❌ 나쁜 예: 모든 경우를 props로 처리
```tsx
// 나쁨: props가 너무 많고 복잡함
function Card({ 
  title, 
  content, 
  footer, 
  hasHeader, 
  hasFooter,
  headerClassName,
  bodyClassName,
  footerClassName 
}: ComplexCardProps) {
  return (
    <div className="card">
      {hasHeader && <div className={headerClassName}>{title}</div>}
      <div className={bodyClassName}>{content}</div>
      {hasFooter && <div className={footerClassName}>{footer}</div>}
    </div>
  );
}
```

### 컴포짓 패턴 사용 시기

**컴포짓 패턴을 사용해야 할 때:**
- 기본 구조는 같지만 내부 구성이 다양한 경우
- 선택적으로 포함되는 부분이 많은 경우
- 사용자가 자유롭게 조합할 수 있어야 하는 경우

**예시:**
- `Modal` (Header, Body, Footer 선택적 조합)
- `Table` (Header, Body, Row, Cell 조합)
- `Form` (Input, Select, Checkbox 등 조합)
- `Layout` (Header, Sidebar, Content, Footer 조합)


### 훅(Hooks)

#### ✅ 좋은 예: 반복 로직 추출
```tsx
// 좋음: 재사용 가능한 훅
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

#### ❌ 나쁜 예: localStorage 로직 반복
```tsx
// 나쁨: 모든 곳에서 localStorage 로직 중복
function ComponentA() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('data');
    return stored ? JSON.parse(stored) : null;
  });
  
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);
}
```

### 유틸리티

#### ✅ 좋은 예: 공통 유틸리티 생성
```tsx
// 좋음: 공유 유틸리티 함수
// utils/format.ts
export function formatCurrency(amount: number, currency = 'KRW'): string {
  return new Intl.NumberFormat('ko-KR', { 
    style: 'currency', 
    currency 
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('ko-KR').format(new Date(date));
}
```

#### ❌ 나쁜 예: 모든 곳에서 포맷팅 인라인
```tsx
// 나쁨: 반복되는 포맷팅 로직
function PriceDisplay({ amount }: { amount: number }) {
  return <span>{amount.toLocaleString()}원</span>;
}

function OrderTotal({ total }: { total: number }) {
  return <div>{total.toLocaleString()}원</div>;
}
```

### API 호출

#### ✅ 좋은 예: API 로직 중앙화
```tsx
// 좋음: 재사용 가능한 API 클라이언트
// lib/api.ts
export const api = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('API 오류');
    return res.json();
  },
  
  post: async <T>(url: string, data: unknown): Promise<T> => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API 오류');
    return res.json();
  },
};
```

#### ❌ 나쁜 예: fetch 로직 중복
```tsx
// 나쁨: 반복되는 fetch 로직
async function getUser() {
  const res = await fetch('/api/user');
  if (!res.ok) throw new Error('실패');
  return res.json();
}

async function getOrders() {
  const res = await fetch('/api/orders');
  if (!res.ok) throw new Error('실패');
  return res.json();
}
```

## 리팩토링 트리거

다음을 발견하면 즉시 리팩토링:
- **같은 코드가 2곳 이상** → 공통 함수/컴포넌트로 추출
- **약간의 차이만 있는 비슷한 로직** → 파라미터로 일반화
- **긴 함수(50줄 이상)** → 작고 재사용 가능한 조각으로 분리
- **여러 번 사용되는 하드코딩 값** → 상수로 추출
- **반복되는 복잡한 조건** → 이름 있는 함수로 추출

## 성능 효율성

### ✅ 좋은 예: 렌더링 최적화
```tsx
// 좋음: 비용이 큰 계산 메모이제이션
const sortedItems = useMemo(() => 
  items.sort((a, b) => a.price - b.price),
  [items]
);

// 좋음: 콜백 메모이제이션
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### ✅ 좋은 예: 무거운 컴포넌트 지연 로딩
```tsx
// 좋음: 코드 스플리팅
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyChart />
    </Suspense>
  );
}
```

### ❌ 나쁜 예: 불필요한 리렌더링 생성
```tsx
// 나쁨: 매 렌더링마다 새 객체 생성
function Component() {
  const config = { theme: 'dark' }; // 매 렌더링마다 새 객체 생성
  return <Child config={config} />;
}

// 좋음: 안정적인 참조
const config = { theme: 'dark' }; // 컴포넌트 외부 또는 useMemo
```

## 코드 구조

### 재사용성을 위한 파일 구조
```
shared/
├── components/     # 재사용 가능한 UI 컴포넌트
├── hooks/          # 커스텀 훅
├── utils/          # 유틸리티 함수
├── constants/      # 공통 상수
├── types/          # 공통 TypeScript 타입
└── lib/            # 서드파티 통합
```

### 네이밍 컨벤션
- **컴포넌트**: PascalCase, 설명적 (`Button`, `UserCard`, `DataTable`)
- **훅**: camelCase, `use`로 시작 (`useAuth`, `useLocalStorage`)
- **유틸**: camelCase, 동사 기반 (`formatDate`, `validateEmail`)
- **상수**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRY_COUNT`)

## 의사결정 프레임워크

코드를 작성하기 전에 질문하기:
1. **이미 존재하는가?** → 코드베이스를 먼저 검색
2. **재사용될 것인가?** → 처음부터 일반화하여 만들기
3. **가장 단순한 해결책인가?** → 과도한 엔지니어링 피하기
4. **효율적인가?** → 성능 영향 고려하기

## 피해야 할 안티패턴

- ❌ "이번만" 코드 복사-붙여넣기
- ❌ 공유될 수 있는데 컴포넌트 전용 유틸리티 만들기
- ❌ 변경될 수 있는 값 하드코딩
- ❌ "나중에 리팩토링" 계획으로 빠르고 지저분한 코드 작성
- ❌ 재사용할 수 없는 지나치게 특정한 컴포넌트 만들기

## 요약

**모든 코드는 다음과 같아야 한다:**
1. **재사용 가능** - 여러 곳에서 사용 가능
2. **효율적** - 성능이 좋고 리소스 낭비 없음
3. **단순** - 이해하고 유지보수하기 쉬움
4. **일반적** - 파라미터를 통해 변형 처리

**황금률**: 복사-붙여넣기 하려는 순간, 멈추고 추출하라.
