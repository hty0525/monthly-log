# Storybook 스토리 탐색 경로 설정 오류

## 📅 발생 일시
- 2026-01-20

## 🛠️ 작업 맥락
- pnpm 마이그레이션 이후 기존의 Storybook 환경을 제거하고 최신 버전(v10)으로 초기화한 뒤 실행함.
- 프로젝트 구조상 공통 컴포넌트는 `shared/components/` 하위에 위치하도록 설정함.

## ❌ 에러 메시지
스토리북 실행은 되지만 사이드바에 컴포넌트가 나타나지 않음 (Empty State).
터미널 로그:
```bash
▲ No story files found for the specified pattern:
  stories/**/*.mdx
▲ No story files found for the specified pattern:
  stories/**/*.stories.@(js|jsx|mjs|ts|tsx)
```

## 🔍 원인 분석
- `npx storybook@latest init` 명령어로 초기화 시 기본적으로 루트의 `stories/` 폴더를 바라보도록 `.storybook/main.ts`가 생성됨.
- 하지만 우리 프로젝트는 `shared/components/` 하위에 스토리를 작성하도록 정해져 있으며, 기존 `stories/` 폴더를 삭제했기 때문에 탐색 패턴이 일치하지 않아 스토리를 찾지 못함.

## ✅ 해결 방법
- `.storybook/main.ts` 파일의 `stories` 배열에 프로젝트 컴포넌트 경로를 추가함.
```typescript
// .storybook/main.ts
"stories": [
  "../shared/components/**/*.stories.@(js|jsx|mjs|ts|tsx)", // 추가
  "../stories/**/*.mdx",
  "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
],
```

## 🛡️ 재발 방지 대책
- [Storybook 사용 가이드](../.agent/rules/11-storybook.md)에 명시된 폴더 구조를 다시 확인하고, 초기화 시 설정 파일을 즉시 업데이트하도록 습관화함.
- 에이전트 작업 시 초기화 명령 이후 설정 파일의 `stories` 경로가 실제 구조와 일치하는지 항상 검증함.
