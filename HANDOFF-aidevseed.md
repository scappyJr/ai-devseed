# 🤝 AI DevSeed 프로젝트 인수인계 (Handoff)

> 이 문서는 Claude Code가 프로젝트 컨텍스트를 빠르게 파악하기 위한 인수인계서입니다.

---

## 🔄 다음 세션 시작하기 (Last sync: 2026-05-11)

### 다른 환경에서 이어 작업하려면

```bash
# 1. Private repo이므로 gh 인증 필요
gh auth login

# 2. 클론
gh repo clone scappyJr/ai-devseed
cd ai-devseed

# 3. 의존성 설치
cd packages/cli && npm install && cd ../..

# 4. 작업 브랜치로 전환 (develop이 통합 브랜치)
git checkout develop

# 5. Claude Code 시작
claude
# 첫 메시지: "@HANDOFF-aidevseed.md 읽어줘"
```

### 어디까지 했고 다음에 뭐 할지

**완료** (2026-05-11 세션):
- GitHub Private 저장소 생성: https://github.com/scappyJr/ai-devseed
- main + develop 브랜치 push
- 라벨 20개 (`bash .github/setup-labels.sh` 결과)
- Topics 14개, Description, Homepage 설정
- `.gitignore` 추가, `git config user.name/user.email` 설정

**다음 액션** (우선순위 순):
1. 베타 사용자 1-2명에게 Private 상태로 공유 (Settings → Collaborators) → 피드백
2. README 데모 GIF 또는 스크린샷 추가 (선택)
3. **Public 전환** (Settings → General → Change visibility)
4. npm 계정 + 2FA → `npm publish --tag beta`
5. Reddit/Disquiet 출시 글

### 주의사항

- ⚠️ 로컬 Claude 메모리(`~/.claude/projects/.../memory/`)는 다른 환경에 동기화 안 됨. 필요하면 새 환경에서 다시 컨텍스트 알려주기 (이 문서가 그 역할 일부).
- ⚠️ npm publish와 Reddit 출시는 **Public 전환 후**에만 진행.

---

## 📌 프로젝트 한 줄 요약

**AI DevSeed** - AI(Claude Code 등)와 함께하는 1인 개발을 위한 프로젝트 시작 키트 CLI

```bash
npx ai-devseed init my-app
```

## 🎬 어떻게 시작되었나

이 프로젝트는 **Otori 프로젝트의 부산물**로 시작되었습니다.

Otori 셋업 과정에서 만들어진 다음 패턴들이 일반화 가능하다고 판단:
- CLAUDE.md 구조
- ADR 시스템
- Single Source of Truth 원칙
- 워크플로우 가이드
- 아이디어 관리 시스템
- Claude Code 커스텀 명령

이를 CLI 도구로 추출한 것이 AI DevSeed입니다.

## 🎯 컨셉 / 차별점

**컨셉**: "Plant the seed for AI-collaborative solo development"

**기존 도구와의 차별점**:
- `create-react-app` 같은 것: 코드 보일러플레이트
- AI DevSeed: **문서/워크플로우/AI 협업** 셋업

즉, 코드 구조가 아니라 **AI와 함께 일하는 환경**을 셋업.

## 🏗 현재 상태

### 완료된 것
- [x] CLI 도구 v0.1.0-beta.1 (실제 동작 확인됨)
- [x] 2개 템플릿: `base`, `mobile-rn`
- [x] 핵심 기능: `init`, `list`, `--help`
- [x] Placeholder 시스템 (`{{PROJECT_NAME}}`, `{{AUTHOR}}` 등)
- [x] Git 자동 초기화
- [x] README (마케팅 페이지 역할)
- [x] LICENSE (MIT)
- [x] 출시 가이드 (GitHub, npm publish, Reddit)

### 다음 단계
- [x] GitHub 저장소 생성 (Private로 시작 — 가이드 원본은 Public이지만 검토 버퍼 위해 Private 선택)
- [x] 로컬 → GitHub 푸시 (main + develop)
- [x] About 섹션 + Topics 14개 채우기
- [x] 라벨 자동 생성 (20개)
- [ ] **Public 전환** (npm/Reddit 출시 게이트)
- [ ] npm 계정 만들기 + 2FA
- [ ] `npm publish --tag beta` (베타 출시)
- [ ] Reddit/Disquiet에 출시 글
- [ ] 첫 사용자 피드백 받기

### 미완성 (의도적)
- web-react 템플릿은 placeholder만 (다음 버전)
- 자동 테스트 없음 (수동 테스트로 충분)
- Pro 티어 기능 미구현 (먼저 무료 검증)

## 💰 수익화 전략

**모델**: Freemium + 가이드북 (사용자 결정)

### 무료 (Free Tier) - 현재
- 모든 기본 템플릿
- 핵심 슬래시 명령 3개
- 문서/워크플로우 셋업

### 유료 (Pro Tier - $29) - 추후 구현
- 추가 슬래시 명령 12+
- 모바일/웹 프리미엄 템플릿
- Excel WBS, 간트차트 생성기
- 자동화 스크립트
- 이메일 지원

### 가이드북 ($39) - Otori MVP 출시 후
- "60 Days Building Otori" 실전 케이스 스터디

## 🛠 기술 스택

- **언어**: Node.js 18+ (ESM)
- **CLI 라이브러리**: Commander.js, @inquirer/prompts
- **유틸**: chalk, ora, fs-extra
- **언어 정책**: 영문 (글로벌 시장 타겟)

## 📂 프로젝트 구조

```
ai-devseed/
├── README.md              마케팅 페이지 역할
├── CHANGELOG.md
├── LICENSE                MIT
├── packages/cli/          실제 CLI 패키지
│   ├── bin/ai-devseed.js  엔트리 포인트
│   ├── src/
│   │   ├── commands/init.js
│   │   └── utils/
│   ├── templates/
│   │   ├── base/          기본 템플릿
│   │   └── mobile-rn/     RN 특화
│   └── package.json
├── docs/
│   ├── getting-started.md
│   ├── development.md
│   ├── github-launch-guide.md
│   ├── npm-publish-checklist.md
│   └── reddit-launch-templates.md
└── .github/
    ├── ISSUE_TEMPLATE/
    └── setup-labels.sh
```

## 🌍 출시 전략

**채널 우선순위** (Twitter 미사용):
1. **GitHub README** (검색 트래픽)
2. **Reddit** (r/SideProject, r/ClaudeAI 등)
3. **Disquiet** (한국 인디 메이커)
4. **Dev.to** (블로그 글)
5. **LinkedIn** (보조)

**문체**: 영문 위주, 한국어는 Disquiet에서만

## 🤝 Otori와의 관계 (병행 진행)

- **Otori**: 본인 핵심 프로젝트, Private, 60일 일정
- **AI DevSeed**: 사이드 프로젝트, Public, 베타 출시

**병행 방식**: Otori 진행 중 발견하는 일반화 가능 패턴을 AI DevSeed에 즉시 반영.

예시:
- Otori에서 새 슬래시 명령이 유용했다 → AI DevSeed Pro 티어에 추가
- Otori에서 ADR 시나리오 발견 → AI DevSeed 템플릿 보강

## 🤝 첫 세션 시작 가이드

Claude Code에게 이렇게 시작:

```
docs/HANDOFF.md 파일을 먼저 읽어줘.
지금 베타 출시 단계라서 GitHub 셋업과 npm publish가 다음 작업이야.
docs/github-launch-guide.md 봐서 단계별로 진행 도와줘.
```

또는 작업별로:

**GitHub 셋업 시:**
```
docs/github-launch-guide.md를 봐. 지금 Phase 1 (저장소 생성) 시작할게.
```

**npm publish 시:**
```
docs/npm-publish-checklist.md를 봐. 베타 publish 진행할게.
```

**Reddit 글 작성 시:**
```
docs/reddit-launch-templates.md를 봐. r/SideProject용 글 다듬어줘.
```

## 🔑 핵심 원칙

1. **Single Source of Truth**: 정보는 한 군데에만
2. **AI-First Documentation**: AI가 읽기 좋게 구조화
3. **Solo But Not Alone**: 1인 개발자 + AI = 팀

## 📊 베타 출시 후 KPI

### 1주일 목표
- GitHub Star: 20-50
- npm 다운로드: 100-300
- 첫 외부 피드백: 1-3건

### 1개월 목표
- GitHub Star: 100-300
- 월 다운로드: 500-2000
- 외부 PR: 1-3건

⚠️ 이 숫자는 낙관적. 0개여도 정상.

---

*이 문서는 2026-04-29 작성, 2026-05-11 GitHub 셋업 결과 반영하여 업데이트*
*Original 대화 내역은 Claude.ai 웹의 "Otori → AI DevSeed" 대화에 보관됨*
