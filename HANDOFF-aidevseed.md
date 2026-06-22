# 🤝 AI DevSeed 프로젝트 인수인계 (Handoff)

> 이 문서는 Claude Code가 프로젝트 컨텍스트를 빠르게 파악하기 위한 인수인계서입니다.

---

## 🔄 다음 세션 시작하기 (Last sync: 2026-06-22)

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

**완료** — 2026-05-11~13 출시 준비 전체 (Public 전환 직전):

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

**Phase 5 — 메인테이너 워크플로우 보강** (2026-05-13, develop only)
- 개인 워크플로우 슬래시 명령 2개 추가 (repo root `.claude/commands/`):
  - `/sync-from-web` — Claude.ai 세션 결과(결정/아이디어/문서/디자인)를 ADR·아이디어 인박스·HANDOFF·git 커밋까지 자동 반영
  - `/prepare-for-web` — git log/status/HANDOFF에서 컨텍스트 자동 수집해 Claude.ai에 붙여넣을 프롬프트 생성 (6가지 목적별 템플릿, 클립보드 자동 복사)
- `docs/sync-workflow-guide.md` 추가 — 도구 역할 분담, 일일 패턴 4가지, 전환 결정 트리, 흔한 실수 6가지
- develop 커밋: `3f205fa` (HANDOFF 재검증 노트), `4e47541` (sync 워크플로우). origin/develop 동기화 완료.

**Phase 6 — npm publish 사전 점검 + 차단급 이슈 수정** (2026-05-20, branch `fix/npm-publish-prep`)
- `npm publish --dry-run --tag beta`로 사전 검증 → publish 차단급 5건 발견:
  1. **`bin` 필드 `"./bin/ai-devseed.js"`** — npm 11.x가 선행 `./`를 무효로 보고 publish 시 자동 제거 → `npx ai-devseed` 작동 불가. `"bin/ai-devseed.js"`로 수정.
  2. **`packages/cli/`에 `README.md`/`LICENSE` 부재** — `files` 배열엔 있는데 실제 파일이 없어서 tarball에 미포함, npm 페이지에 README 안 떴을 것. 루트 README 복사 + 상대 링크 6곳을 절대 GitHub URL로 치환 (status 배지 `.`, demo.png, getting-started.md, workflow-guide.md, CONTRIBUTING.md, LICENSE).
  3. **`repository` 필드 누락** — npm 페이지 GitHub 링크 미표시. `type/url/directory: packages/cli` 추가.
  4. **`main: "src/index.js"`** — 파일 미존재. CLI라 무해하지만 잘못된 필드 → 제거.
  5. **npm 이름 `ai-devseed`** — 사용 가능 (404 = 미선점) ✓
- 재검증: dry-run 경고 사라짐, tarball 36 → 38 파일 (LICENSE 1.1kB + README 7.6kB 포함).
- Branch push + PR #21 (base=develop) 머지 완료 (PR 본문 단계는 다음 Phase 7에서 일괄 처리).

**Phase 7 — publish 직전 잔여 audit + 버전 cut + main sync** (2026-06-11~12, PR #21~#25)
- **README↔실제 대조** 1회차: `setup-labels.sh`가 README "GitHub Integration"에서 약속되는데 `packages/cli/templates/base/.github/`에 없음 (repo root에만 존재 → end user 미수령) 발견.
- PR #22 `fix/template-labels-script` → develop: `setup-labels.sh`를 base 템플릿으로 옮김. AI DevSeed 메인테이너 전용 `template/*` 라벨 3개 제외 → **17 labels** (generic: type/priority/status/community/effort). 헤더에 `{{PROJECT_NAME}}` 치환. README/`packages/cli/README.md` "20 labels" → "17 labels".
- **Pre-public audit** 2회차 (Explore agent 사용): 4건의 fixable 이슈 발견.
- PR #23 `fix/pre-launch-polish` → develop:
  1. `packages/cli/templates/base/.gitattributes` 추가 → `*.sh`/`*.bash` LF 강제. Windows autocrlf가 setup-labels.sh를 CRLF로 ship하면 macOS/Linux에서 bash 깨짐.
  2. `init.js` `printSuccessMessage`에 템플릿별 명령 출력 (`/new-screen` for mobile-rn, `/new-page` for web-react). README는 광고했는데 CLI가 안 알려줬음.
  3. `src/utils/git.js` 재작성: stderr를 pipe로 받아 throw error 메시지에 포함. 이전엔 "Git initialization skipped: Command failed"만 노출 → `user.email` 미설정 등 흔한 케이스의 원인 불명.
  4. `bin/ai-devseed.js`에서 dead `--no-install` flag 제거 (init.js에서 참조 안 됨).
  5. **사용자 요청**: 후원 링크 `buymeacoffee.com/scappyJr` → `ko-fi.com/scappyjr` (README × 2).
- PR #24 `chore/v0.1.0-beta.3` → develop: `package.json` 버전 `0.1.0-beta.2` → `0.1.0-beta.3`. CHANGELOG `[Unreleased]` 내용을 `[0.1.0-beta.3] · 2026-06-11`로 cut + publish-prep 변경분 backfill. `package-lock.json` 재생성 (beta.1에 멈춰있던 것 → beta.3).
- PR #25 release sync (`develop` → `main`): **9 commits, 12 files, +402 -33**. PR #21~#24 누적 + Phase 6 HANDOFF doc.

**Phase 8 — Pro tier MVP 기획 + 콘텐츠 빌드 + 패키징** (2026-06-13~19, PR #26~#37)

기획 + 마케팅 sync (PR #26~#29):
- PR #26 `plan/pro-tier-mvp` → develop: `docs/pro-tier-mvp-plan.md` 신규. Pro MVP scope 확정 (12 commands + 10 ADR scenarios, $19). 기존 README의 aspirational 7가지 claims (15+ commands, Excel WBS, 간트차트 SVG, wireframe, 이메일 지원 등)을 절반으로 잘라내고 ship-가능한 정수로 정리.
- PR #27 (재머지) → develop: 배포 모델을 **단일 repo open-source pricing**으로 전환. `pro/`를 repo root에 두고 npm tarball 구조적 제외, Gumroad zip은 "큐레이션 + 업데이트 + 후원"으로 프레이밍 (shadcn/ui · Tailwind UI · Excalidraw 모델). 별도 Private repo 안은 폐기.
- PR #28 `docs/pro-tier-marketing-sync` → develop: README + HANDOFF + `packages/cli/README` 3 surfaces를 새 Pro scope + 단일 repo 모델에 맞춰 sync.
- PR #29 release sync `develop` → `main`: 위 3 PR + Phase 7 HANDOFF narrative.

README 폴리시 + Pro skeleton (PR #30~#31):
- PR #30 `fix/readme-audit-polish` → develop: README↔실제 대조 audit 4건 — `.github/`와 `docs/retrospective/`가 base 템플릿에는 있는데 illustrative tree에서 누락. "WBS templates" / "Daily journal templates" 복수 표현이 실제 1개 파일과 불일치. 두 README (root + `packages/cli/`) 동기 수정.
- PR #31 `feat/pro-skeleton` → develop: `pro/` 디렉토리 신규 — `README.md` (open-source-pricing rationale), `LICENSE` (NOT MIT, personal/team use), `CHANGELOG.md` (Keep a Changelog format), `commands/.gitkeep`, `adr-scenarios/.gitkeep`. **구조적 invariant 검증**: `npm pack --dry-run` 결과 40 files 그대로 (pro/ 0 매치) — `pro/`가 `packages/cli/` 밖이라 `files` 배열로 닿지 않음.

12 Pro slash 명령 (PR #32~#34):
- PR #32 `feat/pro-commands-1`: `/scope`, `/timebox`, `/release`, `/changelog-entry` (4 of 12). 스코핑 + 출시 의례.
- PR #33 `feat/pro-commands-2`: `/spike`, `/postmortem`, `/migration`, `/refactor-plan` (8 of 12). 조사 + 인시던트 + 마이그레이션 + 리팩터.
- PR #34 `feat/pro-commands-3`: `/dependency-audit`, `/onboarding`, `/diagram`, `/feedback-summary` (12 of 12 ✓). 의존성 헬스 + 온보딩 + Mermaid 다이어그램 + 피드백 종합.
- 각 명령 포맷: YAML frontmatter + When/How/Template/Rules + 인라인 마크다운 템플릿. Free 8개 명령과 동일. Pro-only tooling 의존성 0건.

10 ADR scenario 시작 템플릿 (PR #35~#36):
- PR #35 `feat/pro-adr-scenarios-1`: `001-state-management`, `002-auth-provider`, `003-database`, `004-css-strategy`, `005-api-style` (5 of 10).
- PR #36 `feat/pro-adr-scenarios-2`: `006-monorepo-strategy`, `007-deployment-platform`, `008-testing-strategy`, `009-error-handling`, `010-observability` (10 of 10 ✓).
- 각 시나리오: Context (6+ 트레이드오프) + Options (5+ 옵션 with pros/cons) + Tradeoff matrix (6 axes) + 빈 Decision/Reasoning/Consequences. Title이 `ADR NNN` placeholder — 사용자가 자기 repo의 `docs/decisions/`로 복사하며 renumber.

패키징 (PR #37):
- PR #37 `feat/pro-readme-finalize` → develop:
  1. `pro/README.md` finalize — 상태 표시 "in progress" → "content + packaging complete; awaiting Gumroad listing". Install placeholder 제거 + 실제 2-path 안내 (Gumroad zip / manual copy). Adoption notes (ADR 번호 renumber) + Quick start 3개 (`/scope`, `/release`, `/onboarding`).
  2. `scripts/build-pro-zip.sh` 추가 — tag-driven (`pro-v*` HEAD) or 명시적 버전 인자. `pro/` 구조 검증, `zip` → Python `shutil.make_archive` fallback (Windows 기본엔 `zip` 없음). 출력 `dist/ai-devseed-pro-vX.Y.Z.zip` (gitignored). Size + SHA256 보고. **로컬 검증**: `0.1.0-test` 빌드 → 60K, 25 files (3 root + 12 commands + 10 scenarios), Python zipfile로 valid 확인.
  3. 루트 `.gitattributes` 신규 — `*.sh`/`*.bash` LF 강제. Phase 7에서 base 템플릿에 적용한 것과 같은 패턴, 이번엔 root 범위.

**결과**: `pro-v0.1.0` 콘텐츠 + 패키징 100% 완료. 남은 외부 작업은 (a) develop → main release sync, (b) `git tag pro-v0.1.0`, (c) Gumroad product 셋업 + zip 업로드 + 페이지 카피, (d) root README "Get Pro" CTA의 "Coming soon" → 실제 Gumroad URL.

**Phase 9 — Phase 8 main 반영 + Pro 태그 + 테스트 가이드 + npm 사전검증 + Pro zip 빌드 + draft release** (2026-06-19~20, PR #38~#44)
- PR #38: 이 HANDOFF의 Phase 8 narrative.
- PR #39: release sync (`develop` → `main`) — Phase 8 Pro 콘텐츠 전체를 main에 반영.
- PR #40 `chore/pro-v0.1.0-changelog-cut`: `pro/CHANGELOG.md`를 v0.1.0으로 cut. **`pro-v0.1.0` 태그 생성 완료** (HANDOFF Pro 트랙 7번 태그 부분 ✓).
- PR #42 `docs/test-guides`: `docs/test-guide-free.md` + `docs/test-guide-pro.md` (Free/Pro 수동 테스트 가이드).
- PR #43 release sync (`develop` → `main`, 2026-06-20): test guides 반영. 이후 main back-merge로 **develop ↔ main 완전 정렬 (0/0)**.
- **npm publish 직전 검증** (2026-06-20, `cd packages/cli && npm pack --dry-run`): **40 files invariant 유지**, pro/ 누출 0건, 경고/에러 0건, README.md(7.9kB)+LICENSE(1.1kB) 포함, `bin`/`repository`/`engines` 필드 정상, 엔트리포인트 스모크(`--version`/`list`) 정상. package size 26.7kB / unpacked 71.0kB. **publish 버튼만 남음** (Public 전환 + npm 2FA는 본인).
- **Pro zip 빌드** (2026-06-20, `bash scripts/build-pro-zip.sh 0.1.0`): `dist/ai-devseed-pro-v0.1.0.zip` (60K, 25 files = root 3 + commands 12 + ADR 10). `python -m zipfile --test` 통과. **SHA256 `5a1b8f413e06049cbc3ebc19605399d14f434b2fce74ef32334eff794b0c639c`**.
  - **빌드 중 버그 수정** (PR #44): Windows에서 `python3`이 MS Store 앱실행 별칭 스텁으로 잡혀 `command -v`는 통과하지만 실행 시 exit 49로 죽음 → 빌드 차단. `build-pro-zip.sh`가 후보(python3/python/py)를 `--version`으로 실제 실행해보고 동작하는 걸 고르도록 수정.
  - `pro/CHANGELOG.md` `[0.1.0]` 섹션에 위 SHA256 코드블록 추가.
- **draft GitHub Release 생성** (2026-06-20, `gh release create pro-v0.1.0 --draft`): title "AI DevSeed Pro v0.1.0", zip asset 첨부 (GitHub 자동 계산 digest = 위 SHA256 일치 검증됨), 본문 = 마케팅 카피 (Free 소개 + 12 commands + 10 ADR + install + open-source-pricing 설명 + SHA256 verify). **본문 링크가 `main` 기준** — 게시는 Public 전환 + (이미 완료된) main sync 후. 게시: `gh release edit pro-v0.1.0 --draft=false`.
- PR #44 release sync (`develop` → `main`, 2026-06-20): Phase 9 HANDOFF + 스크립트 수정 + SHA256 (3 files). back-merge로 **develop ↔ main 정렬 (0/0)**.

**Phase 10 — Gumroad publish + URL sync** (2026-06-22, PR `chore/pro-v0.1.0-launch-urls`)
- **Pro v0.1.0 Gumroad 라이브**: `https://haemcheephox.gumroad.com/l/ai-devseed-pro` · $19 · `LAUNCH50` first-50-buyer $9 discount (Gumroad Checkout → Discounts, Fixed $10 off, max 50 uses, Set a minimum quantity 1). Auto-apply URL: `https://haemcheephox.gumroad.com/l/ai-devseed-pro/LAUNCH50` — Reddit/Disquiet 출시 글 전용 (README 정가 트래픽으로 50개 한도 보호).
- **SHA256 정정**: Phase 9의 "build deterministic" 가정 무너짐. `pro/CHANGELOG.md`에 SHA256를 적는 순간 CHANGELOG 자체가 zip 콘텐츠라 hash가 무효화 = chicken-and-egg. Phase 10의 새 빌드 = Gumroad 업로드 zip hash = **`d28f294d5ab4da8d9bc486348425a37f74166a78beeb44eaa0f36ef0301337ad`**. `pro/CHANGELOG.md` + Gumroad description page는 새 값으로 정합. draft GitHub Release `pro-v0.1.0`의 notes 본문은 여전히 옛값(`5a1b8f4...`) — Public 전환 후 release 게시 시점에 본인이 `gh release edit pro-v0.1.0 --notes-file ...`로 정정 (별도 PR 불요).
- **PR**: root README 3 spot + `packages/cli/README.md` 3 spot + `docs/getting-started.md` 1 spot의 "Coming soon" / placeholder URL → 실제 Gumroad URL. `pro/CHANGELOG.md` SHA256 갱신. Gumroad description은 `dist/gumroad-description.html` (gitignored, 브라우저 → Ctrl+A/C → Gumroad paste 방식 — WYSIWYG가 마크다운 미지원이라 HTML clipboard 사용).

**다음 액션** (Free + Pro 양쪽 ready; 남은 건 외부 액션 위주):

### A. Free 출시 트랙

1. **Public 전환** — Settings → General → Danger Zone → Change repository visibility → Make public → 2FA 확인
2. **Branch Protection 적용** (Public이면 무료) — Settings → Branches → Add branch protection rule on `main`:
   - ✅ Require a pull request before merging
   - ✅ Require linear history
   - ✅ Block force pushes
   - ✅ Restrict deletions
   - ⏸ Skip "Require approvals" (솔로) / "Require status checks" (CI 없음)
   - ℹ️ Linear history 켠 뒤 future develop→main PR은 **Rebase and merge** 또는 squash로 (일반 merge commit 차단됨).
3. **npm publish 흐름**:
   - 버전: `0.1.0-beta.3`, CHANGELOG `[0.1.0-beta.3]` 정리됨, lockfile sync됨. **2026-06-20 `npm pack --dry-run` 재검증 clean** (40 files, pro/ 0건, no warnings, README+LICENSE 포함)
   - npm 계정 + 2FA → `cd packages/cli && npm publish --tag beta`
   - publish 후 npm 페이지에서 README 이미지/링크 렌더링 확인 (`packages/cli/README.md`가 절대 GitHub URL 사용)
   - `npx ai-devseed init test-pkg --yes --no-git` 으로 published version 동작 확인
4. **Reddit/Disquiet 출시 글** (`docs/reddit-launch-templates.md` 참고) — Claude가 draft 도움 가능. publish 후 실제 npm URL 확보 후 진행 권장.
5. **첫 사용자 피드백 대응** — Issue/Discussion 응답, hyphen-leading-name 결함 등 patch 후보 정리.

### B. Pro 출시 트랙 (콘텐츠 + 패키징 완료)

6. ✅ **develop → main release sync** — 완료 (Phase 9, PR #39/#43). develop ↔ main 정렬 (0/0).
7. ✅ **`pro-v0.1.0` tag + zip 빌드 + draft release** — 모두 완료 (Phase 9):
   - `pro-v0.1.0` 태그 생성/푸시 (PR #40).
   - `dist/ai-devseed-pro-v0.1.0.zip` 빌드 (60K, 25 files). SHA256 = Phase 10 narrative 참조 (chicken-and-egg로 빌드값 변경됨; 현재 정합값 `d28f294...`).
   - **draft GitHub Release** 생성 (zip asset 첨부됨). ⬜ 게시만 남음 (Public 전환 후): `gh release edit pro-v0.1.0 --draft=false`. notes 본문의 SHA256 옛값(`5a1b8f4...`)도 같이 정정 권장.
   - ⚠️ `dist/`는 gitignored — 다른 환경에서 release 게시하려면 `bash scripts/build-pro-zip.sh 0.1.0`으로 zip 재빌드. `pro/CHANGELOG.md`가 zip에 포함되므로 그 내용에 따라 hash가 달라짐 (Phase 9에서 deterministic 가정은 잘못이었음).
8. ✅ **Gumroad product 셋업** — 완료 (Phase 10, 2026-06-22): `https://haemcheephox.gumroad.com/l/ai-devseed-pro` 라이브. $19 + LAUNCH50($10 off, max 50). 페이지 카피는 `dist/gumroad-description.html` 사용. KRW payout = 신한은행 (SWIFT `SHBKKRSEXXX`, 영문 명의 통장 필요).
9. ✅ **Root README "Get Pro" CTA → Gumroad URL** — 완료 (Phase 10 PR). README 6 spot + getting-started 1 spot.
10. **Pro 출시 announcement** — Free 출시와 동시 또는 직후. Reddit (r/SideProject, r/ClaudeAI), Dev.to. Claude draft 가능. LAUNCH50 자동 적용 URL (`.../ai-devseed-pro/LAUNCH50`) 우선 사용.

### 권장 순서

Free 트랙 (1~3) → Pro 트랙 (6~9) → 양쪽 announcement (4/10). Pro 트랙 6 (release sync)은 언제 해도 무해하니 다음 세션 첫 작업으로 두면 main이 최신 상태가 됨.

### 주의사항

- ⚠️ 로컬 Claude 메모리(`~/.claude/projects/.../memory/`)는 다른 환경에 동기화 안 됨. 새 환경에선 이 문서 + memory 인덱스가 핵심.
- ⚠️ npm publish와 Reddit 출시는 **Public 전환 후**에만 진행.
- ⚠️ **`pro/`는 npm tarball에서 구조적으로 제외**됨 (`packages/cli/` 밖). 새 파일을 패키지 surface에 추가할 때 `cd packages/cli && npm pack --dry-run`으로 정기 확인 — 40 files 유지가 invariant. 의도치 않게 pro/가 끌려오면 publish 차단급 결함.
- ℹ️ Pro zip 빌드 산출물은 `dist/` (gitignored). `scripts/build-pro-zip.sh`는 `zip` → Python `shutil.make_archive` fallback이라 Windows에서도 동작 (`zip` 미설치 환경 포함).
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
- [x] Pro MVP plan 작성 + open-source pricing 결정 (PR #26~#28)
- [x] Pro 콘텐츠 22 markdown 빌드 (PR #31~#36 — skeleton + 12 commands + 10 ADR scenarios)
- [x] Pro 패키징 (Pro README finalize + `scripts/build-pro-zip.sh` + root `.gitattributes`; PR #37)
- [ ] **Public 전환** (Settings → General → Change visibility)
- [ ] Branch Protection 적용 (Public 후 무료)
- [ ] npm 계정 + 2FA → `npm publish --tag beta`
- [x] develop → main release sync (Phase 9, PR #39/#43/#44)
- [x] `git tag pro-v0.1.0` + `bash scripts/build-pro-zip.sh` (Phase 9, PR #40)
- [x] Gumroad product 셋업 + zip 업로드 + $19 가격 (Phase 10, 2026-06-22)
- [x] Root README "Get Pro" CTA → 실제 Gumroad URL (Phase 10 PR)
- [ ] Reddit/Disquiet 출시 글 (Free + Pro)
- [ ] 첫 사용자 피드백 받기

### 미완성 (의도적)
- 자동 테스트 없음 (수동 테스트로 충분)
- Pro CLI 자동 설치 명령 없음 (`ai-devseed install-pro <zip>` 등) — MVP는 수동 copy. 시장 검증 후 재평가.

## 💰 수익화 전략

**모델**: Freemium + 가이드북 (사용자 결정)

### 무료 (Free Tier) - 현재
- 모든 기본 템플릿 (base + mobile-rn overlay + web-react overlay)
- 핵심 슬래시 명령 8개 (`/daily`, `/idea`, `/add-decision`, `/handoff`, `/retro`, `/review`, `/explore`, `/test-plan`) + 템플릿별 1개씩 (`/new-screen`, `/new-page`)
- 라벨 setup 스크립트 (17 labels, in `templates/base/.github/setup-labels.sh`)
- 문서/워크플로우 셋업 + Branch Protection 가이드 (in workflow-guide.md)
- CONTRIBUTING.md (베타 contributors 온보딩)

### 유료 (Pro Tier - $19) — **콘텐츠 + 패키징 완료** (`pro/` + `docs/pro-tier-mvp-plan.md`)
- 슬래시 명령 12개 ✅ — `/scope`, `/timebox`, `/release`, `/changelog-entry`, `/spike`, `/postmortem`, `/migration`, `/refactor-plan`, `/dependency-audit`, `/onboarding`, `/diagram`, `/feedback-summary`
- ADR scenario 시작 템플릿 10개 ✅ — state mgmt, auth, DB, CSS, API style, monorepo, deploy, testing, errors, observability
- 배포: 이 repo의 `pro/` 디렉토리 (단일 Public repo). npm tarball에선 구조적으로 제외 (`packages/cli/` 밖). Gumroad zip은 `scripts/build-pro-zip.sh`로 빌드 (60K, 25 files). 콘텐츠는 GitHub에서 공개적으로 보임 (open-source pricing, shadcn/ui · Tailwind UI · Excalidraw 모델).
- **남은 작업**: `pro-v0.1.0` tag + zip 빌드 → Gumroad product 셋업 → page copy → root README CTA 업데이트. 본인 액션 위주.
- **deferred (v0.2+ 후보)**: Excel WBS, 간트차트 SVG, wireframe 템플릿, 프리미엄 코드 템플릿, 이메일 지원 — Free 시장 검증 후 재평가

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

*이 문서는 2026-04-29 작성, 2026-05-11/12 GitHub 셋업 + CLI 가다듬기 + 출시 준비 (PR #1~#16 + 기능 검증) 결과 반영하여 업데이트, 2026-06-11/12 publish-prep + audit 보강 + v0.1.0-beta.3 cut + main sync (PR #21~#25) 반영, 2026-06-13~19 Pro tier MVP 기획 + 콘텐츠 22 markdown 빌드 + 패키징 (PR #26~#37) 반영*
*Original 대화 내역은 Claude.ai 웹의 "Otori → AI DevSeed" 대화에 보관됨*
