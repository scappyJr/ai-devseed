# 🤝 AI DevSeed 프로젝트 인수인계 (Handoff)

> 이 문서는 Claude Code가 프로젝트 컨텍스트를 빠르게 파악하기 위한 인수인계서입니다.

---

## 🔄 다음 세션 시작하기 (Last sync: 2026-05-12)

### 다른 환경에서 이어 작업하려면

```bash
# 1. 클론 (repo가 Public이면 gh 인증 불필요)
git clone https://github.com/scappyJr/ai-devseed
cd ai-devseed

# 2. 의존성 설치
cd packages/cli && npm install && cd ../..

# 3. 작업 브랜치 (develop이 통합 브랜치)
git checkout develop

# 4. Claude Code 시작
claude
# 첫 메시지: "@HANDOFF-aidevseed.md 읽어줘"
```

### 어디까지 했고 다음에 뭐 할지

**완료** — 2026-05-11/12 출시 준비 전체 (Public 전환 직전):

**Phase 1 — GitHub 셋업** (2026-05-11 오전)
- Private 저장소, main/develop, Topics 14개, 라벨 20개, `.gitignore`, 로컬 `git config`

**Phase 2 — CLI 가다듬기 + 기능 보강** (PR #1~#5)
- PR #1: hero 데모 스크린샷(`docs/images/demo.png`) + `example/ai-devseed` placeholder URL 6곳 수정
- PR #2: 슬래시 명령 3개 (`/idea`, `/handoff`, `/retro`) + retrospective 폴더 + `_template.md`
- PR #3: `web-react` 템플릿 실 overlay (`CLAUDE.md` + `/new-page`)
- PR #4: 슬래시 명령 2개 (`/explore`, `/test-plan`) → base 8개 total
- PR #5: release sync (develop → main)

**Phase 3 — README audit + 2차 polish** (PR #6~#16)
- PR #6: pricing-table 자가모순, 깨진 docs/ 링크, Otori 404 처리
- PR #7: release sync
- PR #8: 가짜 "Create GitHub repo?" prompt 제거, "25 labels"→"20 labels", **Branch Protection 가이드** 작성 (in base/workflow-guide.md)
- PR #9: release sync
- PR #10: 외부 링크 검증 — 죽은 `ai-devseed.dev` / Twitter 링크 제거, Pro Gumroad "Coming soon" 일관 표기
- PR #11: mockup → bullet list, Backlog → GitHub Issues, Twitter→Reddit/Dev.to CTA, 잔존 philosophy.md 링크 제거
- PR #12: CHANGELOG `[Unreleased]` 보강 (실수로 main 직접 머지 — 결과적으로 OK)
- PR #13: release sync
- PR #14: Twitter→Reddit/Dev.to 회귀 hotfix (PR #11 conflict resolution에서 한 줄 잃었던 거 복구)
- PR #15: CONTRIBUTING.md 추가 + README 링크
- PR #16: 최종 release sync (develop → main)

**Phase 4 — Public 출시 직전 정비** (2026-05-12 마무리)
- Sensitive info 스캔: 자격증명/시크릿/내부경로/TODO 전부 0건
- **`git filter-repo`로 전체 40 commits 이메일 noreply 치환** (`terroir713@gmail.com`, `hwkim@mammothsoft.co.kr` → `50819563+scappyJr@users.noreply.github.com`) + force-push to main/develop
- 글로벌 git config user.email → noreply (사용자 직접)
- GitHub 프로필 Name → `scappyJr` (사용자 직접)
- E2E 기능 테스트: 3개 템플릿 init + 7개 file-output 슬래시 명령 (모든 산출물 검증) + 4개 대화형 명령 (instruction 품질 검토)
- Init 흐름 검증: 에러 케이스 (non-empty dir, invalid name, 51자, 하이픈-시작) + 모든 플래그 (`--yes`, `--no-git`, `-t`)
- **재검증 (Windows 환경, post-PR #16)**: 14개 케이스 전체 통과 — smoke(version/list/help), init×3 템플릿(27/28/28 files, .git ✓), placeholder 100% 치환, overlay 패턴(`/new-screen`, `/new-page` + 플랫폼별 CLAUDE.md), base 슬래시 명령 8개 모두 존재, `--no-git`/잘못된 이름/51자/non-empty dir 모두 exit 1. 하이픈-시작 결함은 알려진 대로 재현됨.

**다음 액션** (출시 준비 100% 완료, 사용자 GUI 작업 4건):

1. **Public 전환** — Settings → General → Danger Zone → Change repository visibility → Make public → 2FA 확인
2. **Branch Protection 적용** (Public이면 무료) — Settings → Branches → Add branch protection rule on `main`:
   - ✅ Require a pull request before merging
   - ✅ Require linear history
   - ✅ Block force pushes
   - ✅ Restrict deletions
   - ⏸ Skip "Require approvals" (솔로) / "Require status checks" (CI 없음)
3. **npm publish 흐름**:
   - `packages/cli/package.json` 버전 bump (`0.1.0-beta.1` → 보통 `0.1.0-beta.2`)
   - `CHANGELOG.md` `[Unreleased]` → `[0.1.0-beta.2] · 2026-05-XX` 섹션화 + 새 빈 `[Unreleased]` 위에 추가
   - npm 계정 + 2FA → `cd packages/cli && npm publish --tag beta`
4. Reddit/Disquiet 출시 글 (`docs/reddit-launch-templates.md` 참고)

### 주의사항

- ⚠️ 로컬 Claude 메모리(`~/.claude/projects/.../memory/`)는 다른 환경에 동기화 안 됨. 새 환경에선 이 문서 + memory 인덱스가 핵심.
- ⚠️ npm publish와 Reddit 출시는 **Public 전환 후**에만 진행.
- ⚠️ **`gh` CLI 인증 fragile** — 세션마다 `& "C:\Program Files\GitHub CLI\gh.exe" auth status`로 먼저 확인. unauth 상태면 `git push -u` 후 출력되는 URL로 웹 PR 생성 (B방식). 재인증: `! "C:\Program Files\GitHub CLI\gh.exe" auth login`.
- ⚠️ **PR 생성 시 base 브랜치 주의** — GitHub 기본은 `main`. CLAUDE.md 흐름(`feature/* → develop`)을 따르려면 PR 만들 때 base를 **develop으로 명시 변경**. (PR #1, PR #12 두 번 실수로 main에 머지된 이력.)
- ⚠️ 루트 `package-lock.json` 재발 주의 — npm 명령은 항상 `packages/cli/` 안에서. 루트에서 잘못 돌리면 빈 lockfile 생김.
- ℹ️ 글로벌 git config user.email은 이제 **noreply**. 새 commit도 안전 (개인 이메일 노출 없음).
- ℹ️ `packages/cli/package-lock.json`은 tracked. 새 환경 셋업: `cd packages/cli && npm install` 필수.
- ℹ️ **AI DevSeed 템플릿 = overlay 패턴**. `init.js`가 항상 `base/`를 복사한 뒤 선택 템플릿을 `overwrite: true`로 덮음. mobile-rn/web-react는 코드 스캐폴드가 아니라 `CLAUDE.md` + 플랫폼별 명령 1개를 덮는 **AI 컨텍스트 overlay**.
- ℹ️ **알려진 minor UX 결함** (출시 후 patch 후보): 프로젝트 이름이 `-`로 시작하면 Commander.js가 flag로 오인 → 우리 validator 메시지 안 뜨고 generic "unknown option" 에러 노출.
- ℹ️ **이전 commit SHA 무효화**: `git filter-repo`로 전체 history 재작성 → 옛 SHA는 더 이상 존재 안 함. 본 문서나 memory에 SHA 직접 언급 거의 없음.

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
- [x] 3개 템플릿: `base`, `mobile-rn`, `web-react`
- [x] 핵심 기능: `init`, `list`, `--help`
- [x] Placeholder 시스템 (`{{PROJECT_NAME}}`, `{{AUTHOR}}` 등)
- [x] Git 자동 초기화
- [x] README (마케팅 페이지 역할)
- [x] LICENSE (MIT)
- [x] 출시 가이드 (GitHub, npm publish, Reddit)

### 다음 단계
- [x] GitHub 저장소 생성 (Private)
- [x] 로컬 → GitHub 푸시 (main + develop)
- [x] About + Topics + 라벨 셋업
- [x] README hero 데모 스크린샷 (PR #1)
- [x] `example/ai-devseed` placeholder URL 수정 (PR #1)
- [x] Free tier 슬래시 명령 8개로 확장 (PR #2 + PR #4)
- [x] web-react 템플릿 실 overlay (PR #3)
- [x] develop → main release sync 다회 (PR #5/#7/#9/#13/#16)
- [x] README audit 8건 모두 수정 (PR #6/#8/#10/#11/#14)
- [x] CHANGELOG `[Unreleased]` 보강 (PR #12)
- [x] CONTRIBUTING.md (PR #15)
- [x] Sensitive info 스캔 + 개인 이메일 noreply 일괄 치환 (`git filter-repo`)
- [x] 글로벌 git config noreply 적용 (사용자 직접)
- [x] GitHub 프로필 Name → scappyJr (사용자 직접)
- [x] E2E 기능 테스트 (3 템플릿 + 11개 슬래시 명령)
- [ ] **Public 전환** (Settings → General → Change visibility)
- [ ] Branch Protection 적용 (Public 후 무료)
- [ ] npm 계정 + 2FA → `npm publish --tag beta`
- [ ] Reddit/Disquiet 출시 글
- [ ] 첫 사용자 피드백 받기

### 미완성 (의도적)
- 자동 테스트 없음 (수동 테스트로 충분)
- Pro 티어 기능 미구현 (먼저 무료 검증)

## 💰 수익화 전략

**모델**: Freemium + 가이드북 (사용자 결정)

### 무료 (Free Tier) - 현재
- 모든 기본 템플릿 (base + mobile-rn overlay + web-react overlay)
- 핵심 슬래시 명령 8개 (`/daily`, `/idea`, `/add-decision`, `/handoff`, `/retro`, `/review`, `/explore`, `/test-plan`) + 템플릿별 1개씩 (`/new-screen`, `/new-page`)
- 문서/워크플로우 셋업 + Branch Protection 가이드 (in workflow-guide.md)
- CONTRIBUTING.md (베타 contributors 온보딩)

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

*이 문서는 2026-04-29 작성, 2026-05-11/12 GitHub 셋업 + CLI 가다듬기 + 출시 준비 (PR #1~#16 + 기능 검증) 결과 반영하여 업데이트*
*Original 대화 내역은 Claude.ai 웹의 "Otori → AI DevSeed" 대화에 보관됨*
