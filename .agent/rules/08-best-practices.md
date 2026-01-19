# 기타 권장 사항

## 환경 변수
- `.env.local` 사용
- `NEXT_PUBLIC_` prefix는 클라이언트에서 접근 가능

## 성능 최적화
- 이미지는 `next/image` 사용
- 동적 import로 코드 스플리팅 (`next/dynamic`)
- `React.memo`, `useMemo`, `useCallback` 적절히 활용

## 접근성
- 시맨틱 HTML 사용 (`<button>`, `<nav>`, `<main>` 등)
- `alt` 속성 필수
- 키보드 네비게이션 고려

## PR 전 체크리스트
- [ ] 파일명이 kebab-case인가?
- [ ] 컴포넌트가 화살표 함수로 작성되었는가?
- [ ] type을 사용했는가?
- [ ] 반응형 디자인이 적용되었는가?
- [ ] 커밋 메시지가 한글 prefix와 함께 작성되었는가?
- [ ] 불필요한 주석이 없는가?
- [ ] import 순서가 올바른가?
