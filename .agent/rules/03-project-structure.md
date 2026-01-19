# 프로젝트 구조 (FSD 레이어 개념 차용)

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # Next.js API Routes (Supabase 연동)
│   ├── (routes)/          # 라우트 그룹
│   ├── layout.tsx
│   └── page.tsx
│
├── shared/                 # 전역적으로 사용되는 공통 모듈
│   ├── components/        # 순수 UI 컴포넌트 (Button, Input 등)
│   ├── hooks/             # 범용 커스텀 훅 (useDebounce, useLocalStorage 등)
│   ├── utils/             # 유틸리티 함수 (formatDate, cn 등)
│   ├── lib/               # 외부 라이브러리 설정 (axios, react-query 등)
│   ├── types/             # 공통 타입 정의
│   ├── constants/         # 상수 정의
│   └── styles/            # 전역 스타일, Tailwind 설정
│
└── features/               # 기능별 모듈 (해당 기능에만 종속)
    ├── auth/
    │   ├── components/    # 인증 관련 UI 컴포넌트
    │   ├── hooks/         # 인증 관련 훅 (useAuth, useLogin 등)
    │   ├── services/      # 비즈니스 로직 (로그인, 로그아웃 처리 등)
    │   ├── queries/       # React Query 훅 (useLoginMutation 등)
    │   ├── store/         # 전역 상태 관리 (Zustand, Jotai 등)
    │   ├── types/         # 기능별 타입
    │   └── utils/         # 기능별 유틸
    │
    └── post/
        ├── components/
        ├── hooks/
        ├── services/
        ├── queries/
        ├── store/
        ├── types/
        └── utils/
```

## 폴더별 역할

### `shared/`
- 프로젝트 전체에서 재사용되는 모듈
- 특정 기능에 종속되지 않음
- 예: Button, Input, useDebounce, formatDate

### `features/{feature-name}/`
각 기능별로 독립적인 모듈 구성

- **`components/`**: 해당 기능의 순수 UI 컴포넌트
- **`hooks/`**: 해당 기능의 커스텀 훅 (로직 분리)
- **`services/`**: 비즈니스 로직 (API 호출 제외한 순수 로직)
- **`queries/`**: React Query 관련 훅 (useQuery, useMutation)
- **`store/`**: 전역 상태 관리 (Zustand, Jotai, Recoil 등)
- **`types/`**: 해당 기능의 타입 정의
- **`utils/`**: 해당 기능에만 사용되는 유틸리티

## 컴포넌트 분리 기준
- **100줄 이상**일 때 분리 고려
- **재사용 가능성**이 있을 때
- **독립적인 책임**을 가질 때 (단일 책임 원칙)
