---
description: Git 브랜치 전략 및 워크플로우
---

# Git 브랜치 전략

## 핵심 원칙

**절대 develop 브랜치에 직접 커밋하지 않는다.**

모든 작업은 반드시 새로운 브랜치를 생성하여 진행한다.

## 브랜치 전략

### 메인 브랜치
- `main` - 프로덕션 배포용
- `develop` - 개발 통합 브랜치 (직접 커밋 금지 ❌)

### 작업 브랜치
모든 작업은 다음 형식의 브랜치에서 진행:

```
feat/기능명       # 새로운 기능
fix/버그명        # 버그 수정
docs/문서명       # 문서 작업
refactor/내용     # 리팩토링
chore/작업명      # 설정, 빌드 등
test/테스트명     # 테스트 추가/수정
```

## 워크플로우

### 1. 새 작업 시작
```bash
# develop 브랜치에서 최신 상태로 업데이트
git checkout develop
git pull origin develop

# 새 브랜치 생성
git checkout -b feat/기능명
```

### 2. 작업 진행
```bash
# 작업 후 커밋
git add .
git commit -m "feat: 기능 설명"

# 원격에 푸시
git push -u origin feat/기능명
```

### 3. PR 생성
- GitHub에서 `feat/기능명` → `develop` PR 생성
- **[중요]** 반드시 `.github/pull_request_template.md`의 내용을 기반으로 작성한다.
- 코드 리뷰 후 병합
- 병합 후 로컬 브랜치 삭제

### 4. 브랜치 정리
```bash
# 병합 완료 후
git checkout develop
git pull origin develop
git branch -d feat/기능명  # 로컬 브랜치 삭제
git push origin --delete feat/기능명  # 원격 브랜치 삭제
```

## 커밋 메시지 규칙

### 형식
```
타입: 간단한 설명

상세 설명 (선택)
```

### 타입
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 변경
- `perf`: 성능 개선

### 예시
```bash
# 좋은 예
git commit -m "feat: 사용자 로그인 기능 추가"
git commit -m "fix: 로그인 시 토큰 만료 오류 수정"
git commit -m "docs: README에 설치 가이드 추가"

# 나쁜 예
git commit -m "수정"
git commit -m "작업 완료"
git commit -m "asdf"
```

## 금지 사항

### ❌ 절대 하지 말 것
1. **develop 브랜치에 직접 커밋**
   ```bash
   # 나쁜 예
   git checkout develop
   git add .
   git commit -m "작업"  # ❌ 금지!
   ```

2. **main 브랜치에 직접 푸시**
   ```bash
   git push origin main  # ❌ 금지!
   ```

3. **의미 없는 커밋 메시지**
   ```bash
   git commit -m "ㅇㅇ"  # ❌ 금지!
   ```

4. **여러 기능을 한 브랜치에서 작업**
   - 각 기능/수정은 별도 브랜치로 분리

## 체크리스트

작업 시작 전:
- [ ] develop 브랜치에서 최신 상태인가?
- [ ] 새 브랜치를 생성했는가?
- [ ] 브랜치 이름이 명확한가?

커밋 전:
- [ ] 커밋 메시지가 명확한가?
- [ ] 불필요한 파일이 포함되지 않았는가?
- [ ] 한 커밋에 하나의 논리적 변경만 포함되는가?

PR 생성 전:
- [ ] develop 브랜치와 충돌이 없는가?
- [ ] 빌드가 성공하는가?
- [ ] 테스트가 통과하는가?

## AI 작업 시 주의사항

**AI가 작업할 때도 반드시 새 브랜치를 생성해야 함:**

```bash
# AI 작업 시작 전 반드시 실행
git checkout develop
git pull origin develop
git checkout -b feat/작업명
```

AI에게 작업 요청 시:
- "develop에 바로 커밋하지 말고 새 브랜치 만들어서 작업해줘"
- "feat/기능명 브랜치 만들어서 작업해줘"

## 요약

1. ✅ **항상 새 브랜치에서 작업**
2. ✅ **명확한 커밋 메시지**
3. ✅ **PR을 통한 병합**
4. ❌ **develop/main 직접 커밋 금지**
