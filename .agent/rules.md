# Monthly-Log 프로젝트 개발 규칙

> 블로그 스터디원들을 위한 Next.js 기반 월간 로그 프로젝트

## 프로젝트 목적
- 블로그 스터디원들이 함께 사용하는 월간 활동 로그 플랫폼
- **백엔드**: Supabase (인증, 데이터베이스, 스토리지)
- 모든 페이지는 **반응형**으로 제작되어야 함 (모바일, 태블릿, 데스크톱 대응)
- **학습 중심**: 라이브러리 사용을 최대한 지양하고 직접 구현하여 학습
- **AI 주도 개발**: 바이브 코딩 방식으로 AI가 주도적으로 개발 진행

---

## 규칙 파일 목록

1. [Styling Guidelines](rules/01-styling.md)
2. [Code Style](rules/02-code-style.md)
3. [Project Structure](rules/03-project-structure.md)
4. [Development Habits](rules/04-development-habits.md)
5. [Responsive Design](rules/05-responsive-design.md)
6. [State Management](rules/06-state-management.md)
7. [API and Data](rules/07-api-and-data.md)
8. [Best Practices](rules/08-best-practices.md)
9. [Library Policy](rules/09-library-policy.md)
10. [AI-Driven Development](rules/10-ai-driven-development.md)
11. [Storybook](rules/11-storybook.md)
12. [Reusability & Efficiency](rules/12-reusability-efficiency.md) ⭐ NEW
13. [Quality Checklist](rules/13-quality-checklist.md) ⭐ NEW
14. [Git Workflow](rules/14-git-workflow.md) ⭐ NEW
15. [Efficiency Rules](rules/efficiency.md) ⭐ NEW

## 중요: 작업 완료 전 필수 체크

**모든 코딩 작업을 완료한 후, 반드시 [Quality Checklist](rules/13-quality-checklist.md)를 실행하세요.**

**모든 작업은 반드시 새 브랜치에서 진행하세요. [Git Workflow](rules/14-git-workflow.md) 참고**

이 체크리스트는 다음을 확인합니다:
- 코드 재사용성
- 성능 효율성
- 코드 품질
- 불필요한 중복 제거

각 주제별로 상세한 규칙이 정리되어 있습니다:

1. **[스타일링](rules/01-styling.md)** - Tailwind CSS, clsx, CVA 사용법
2. **[코드 스타일 & 컨벤션](rules/02-code-style.md)** - TypeScript, 컴포넌트, 파일 네이밍, Import 순서
3. **[프로젝트 구조](rules/03-project-structure.md)** - FSD 레이어 개념, 폴더 구조
4. **[개발 습관](rules/04-development-habits.md)** - 커밋 메시지, 주석, 에러 핸들링
5. **[반응형 디자인](rules/05-responsive-design.md)** - Tailwind Breakpoints, 체크리스트
6. **[상태 관리](rules/06-state-management.md)** - 로컬/서버/전역 상태 관리 전략
7. **[API 호출 및 데이터 관리](rules/07-api-and-data.md)** - Supabase, API Routes, TanStack Query
8. **[기타 권장 사항](rules/08-best-practices.md)** - 환경 변수, 성능 최적화, 접근성, PR 체크리스트
9. **[라이브러리 사용 원칙](rules/09-library-policy.md)** - 직접 구현 우선, 허용/금지 라이브러리 목록
10. **[AI 주도 개발 원칙](rules/10-ai-driven-development.md)** - 바이브 코딩, AI 역할, 작업 흐름
11. **[Storybook 사용 가이드](rules/11-storybook.md)** - UI 컴포넌트 개발 및 테스트

---

## 빠른 참조

### 핵심 기술 스택
- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4 + clsx + CVA
- **백엔드**: Supabase
- **상태 관리**: Zustand (전역), TanStack Query (서버)
- **에러 핸들링**: TanStack Query 전역 설정

### 필수 컨벤션
- 파일명: `kebab-case`
- 컴포넌트: 화살표 함수 + Named Export
- 타입: `type` 사용 (`interface` 지양)
- 커밋: 한글 prefix (기능:, 수정:, 버그: 등)
- 주석: 한글, JSDoc 미사용
