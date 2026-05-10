# 🐙 AI DevSeed - GitHub 셋업 가이드

오픈소스 프로젝트로 GitHub에 공개하는 단계별 가이드.

> Otori GitHub 셋업과 다른 점:
> - **Public 저장소** (오픈소스)
> - **README가 마케팅 페이지** 역할
> - **MIT License** 명시
> - **npm publish** 추가 단계
> - **Reddit 출시** 가이드 포함

---

## 📋 전체 체크리스트

```
[ ] 1. GitHub 저장소 생성 (Public!)
[ ] 2. 로컬 → GitHub 연결
[ ] 3. 브랜치 셋업
[ ] 4. 이슈 라벨 만들기
[ ] 5. 이슈 템플릿 적용
[ ] 6. About 섹션 채우기 (중요!)
[ ] 7. README 검토 및 보완
[ ] 8. (선택) GitHub Discussions 활성화
[ ] 9. (선택) GitHub Pages 활성화
[ ] 10. npm publish 준비
[ ] 11. npm publish (베타)
[ ] 12. Reddit 출시 글 준비
[ ] 13. Dev.to 출시 글 작성
```

예상 시간: **3-4시간** (글 쓰기 시간 포함)

---

## 1️⃣ GitHub 저장소 생성

### GitHub 웹에서

1. 우상단 `+` → **New repository**
2. 다음과 같이 설정:

| 항목 | 값 |
|------|------|
| Owner | 본인 username |
| Repository name | `ai-devseed` |
| Description | `🌱 Plant the seed for AI-collaborative solo development. CLI tool for bootstrapping projects optimized for working with Claude Code.` |
| Visibility | **🌍 Public** ⚠️ (오픈소스이므로 Public!) |
| Initialize | **모두 체크 해제** |

3. **Create repository** 클릭

### Public/Private 차이

**Otori (Private)**: 개인 프로젝트, 코드 보호
**AI DevSeed (Public)**: 오픈소스, 누구나 볼 수 있음

⚠️ **주의**: Public이라 더더욱 `.env` 같은 비밀 파일 커밋 금지!

✅ **확인**: 빈 저장소 페이지 도달

---

## 2️⃣ 로컬 → GitHub 연결

### 2-1. ZIP 압축 해제

```bash
# 작업 폴더로 이동
cd ~/projects  # 또는 본인 폴더

# ZIP 압축 해제
unzip ai-devseed-v0.1-beta.zip
cd ai-devseed
```

### 2-2. Git 초기화 + 첫 커밋

```bash
# Git 시작
git init
git branch -M main

# 사용자 정보 (이미 설정됐으면 스킵)
git config user.name "Your Name"
git config user.email "your-email@example.com"

# .gitignore 확인
ls -la
cat .gitignore  # 없으면 생성 (아래 참고)
```

### 2-3. .gitignore 생성 (없는 경우)

루트에 `.gitignore` 파일 생성:

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.npm
.yarn

# Build
dist/
build/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Tests
coverage/
EOF
```

### 2-4. 모든 파일 추가 + 커밋

```bash
# 추가될 파일 확인 (node_modules 없어야 함)
git add .
git status | head -30

# 첫 커밋
git commit -m "feat: initial release of AI DevSeed v0.1.0-beta

- CLI tool for bootstrapping AI-collaborative projects
- Base template (generic)
- Mobile-RN template (React Native + Expo)
- Comprehensive documentation
- MIT License

Built with extracted patterns from real solo development."
```

### 2-5. GitHub 연결 + 푸시

```bash
# SSH (권장)
git remote add origin git@github.com:{your-username}/ai-devseed.git

# 또는 HTTPS
# git remote add origin https://github.com/{your-username}/ai-devseed.git

# 푸시
git push -u origin main
```

✅ **확인**: GitHub 페이지 새로고침 시 모든 파일 보임

### 2-6. develop 브랜치

```bash
git checkout -b develop
git push -u origin develop
```

---

## 3️⃣ 브랜치 전략

Otori와 동일:
- `main` ← 안정 버전 (npm publish 가능 상태)
- `develop` ← 통합 브랜치
- `feature/*` ← 작업 단위

오픈소스니까 추가로:
- 외부 기여자도 `feature/*` 브랜치 사용 가능
- PR로 `develop`에 머지

---

## 4️⃣ 이슈 라벨 만들기

Otori와 동일한 라벨 시스템 사용. 이미 만들어둔 스크립트 활용:

```bash
# GitHub CLI 설치 (없으면)
# Mac: brew install gh
# Windows: scoop install gh
# 또는: https://cli.github.com

# 인증
gh auth login

# 라벨 생성 스크립트 실행
# (Otori 셋업할 때 만든 setup-labels.sh 가져와서 활용)
```

또는 **AI DevSeed용 간소화 라벨**을 직접 만드세요:

```bash
# Type
gh label create "type/bug" --color "D73A4A"
gh label create "type/feature" --color "A2EEEF"
gh label create "type/enhancement" --color "84B6EB"
gh label create "type/docs" --color "FEF2C0"
gh label create "type/question" --color "D876E3"

# Priority
gh label create "priority/high" --color "B60205"
gh label create "priority/medium" --color "FBCA04"
gh label create "priority/low" --color "0E8A16"

# Status
gh label create "status/blocked" --color "B60205"
gh label create "status/in-progress" --color "0E8A16"
gh label create "status/needs-review" --color "FBCA04"

# 오픈소스 특화
gh label create "good first issue" --color "7057FF" --description "처음 기여하기 좋은 이슈"
gh label create "help wanted" --color "008672" --description "기여자 환영"

# Template 관련
gh label create "template/base" --color "FFE5D9"
gh label create "template/mobile-rn" --color "FF8C61"
gh label create "template/web-react" --color "4FC3F7"
```

---

## 5️⃣ 이슈 템플릿 적용

ZIP 안에 이미 포함되어 있어야 하는데, 없으면 다음 파일들을 만드세요:

```
.github/ISSUE_TEMPLATE/
├── bug_report.md
├── feature_request.md
├── question.md
└── config.yml
```

이미 포함되어 있는지 확인:
```bash
ls -la .github/ISSUE_TEMPLATE/ 2>/dev/null
```

없으면 Otori 프로젝트의 것을 복사하거나 새로 만드세요.

---

## 6️⃣ About 섹션 채우기 (중요!)

이게 **마케팅에 가장 중요**한 부분 중 하나예요.

### GitHub 저장소 페이지 → 우측 ⚙️ "About" 클릭

다음을 채우세요:

**Description**:
```
🌱 Plant the seed for AI-collaborative solo development. CLI tool for bootstrapping projects optimized for working with Claude Code.
```

**Website**: 
- 임시: `https://github.com/{username}/ai-devseed`
- 나중에 Gumroad 페이지나 자체 사이트

**Topics** (해시태그 같은 역할, **매우 중요!**):
```
ai
claude
claude-code
boilerplate
template
starter-kit
scaffold
solo-dev
indie-dev
cli
nodejs
typescript
react-native
mit-license
ai-tools
```

**Include in the home page**:
- ✅ Releases
- ✅ Packages
- ⬜ Deployments

✅ **확인**: 저장소 메인 페이지에 About 섹션이 잘 채워짐

---

## 7️⃣ README 검토 및 보완

이미 만들어둔 README가 잘 작성되어 있지만, 몇 가지 추가하면 좋아요:

### 7-1. 데모 영상/GIF 추가 (강력 추천)

```markdown
## 🎬 Demo

![Demo](docs/demo.gif)
```

만드는 법:
- macOS: 터미널 녹화 + `gif` 변환 도구
- 도구: [terminalizer](https://terminalizer.com), [asciinema](https://asciinema.org)
- 또는 단순 스크린샷도 OK

### 7-2. 배지 추가

README 상단에 다음 추가:

```markdown
[![npm version](https://img.shields.io/npm/v/ai-devseed?color=orange)](https://www.npmjs.com/package/ai-devseed)
[![npm downloads](https://img.shields.io/npm/dm/ai-devseed)](https://www.npmjs.com/package/ai-devseed)
[![GitHub stars](https://img.shields.io/github/stars/{username}/ai-devseed?style=social)](https://github.com/{username}/ai-devseed)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

### 7-3. 실제 링크 채우기

README 안에 `https://github.com/example/...`로 된 부분을 본인 URL로 변경:

```bash
# 일괄 변경
sed -i 's|github.com/example/ai-devseed|github.com/{your-username}/ai-devseed|g' README.md

# 확인
grep "github.com" README.md
```

---

## 8️⃣ (선택) GitHub Discussions 활성화

오픈소스에서 **이슈와 다른 토론 공간**을 제공해요.

### 활성화 방법

1. 저장소 → **Settings** → **General**
2. "Features" 섹션에서 **Discussions** 체크
3. 카테고리 설정:
   - 📣 Announcements (공지)
   - 💬 General (일반 대화)
   - 💡 Ideas (아이디어 제안)
   - 🙏 Q&A (질문)
   - 🎉 Show and tell (사용 사례)

### 왜 좋은가?
- 이슈에 비해 가벼운 분위기
- "사용 후기" 같은 글 받기 좋음
- 커뮤니티 형성 효과

---

## 9️⃣ (선택) GitHub Pages

본격적인 사이트는 나중에. 일단은 **README가 곧 사이트** 역할.

나중에 만들 때:
- `gh-pages` 브랜치
- `docs/` 폴더 활용
- VitePress, Docusaurus 등 사용

지금은 스킵.

---

## 🔟 npm publish 준비

이게 사실상 가장 중요한 단계예요. **사용자가 `npx ai-devseed` 할 수 있게 만드는 것.**

### 10-1. npm 계정 만들기

https://www.npmjs.com/signup

- 사용자명, 이메일, 비밀번호
- 이메일 인증
- 2FA 활성화 (강력 권장)

### 10-2. 로컬에서 npm 로그인

```bash
npm login
# 사용자명, 비밀번호, OTP(2FA) 입력
```

### 10-3. 패키지 이름 확인

```bash
# 이미 누가 등록했는지 확인
npm view ai-devseed
# "404 Not Found" 나오면 사용 가능

# 또는 브라우저에서:
# https://www.npmjs.com/package/ai-devseed
```

⚠️ **만약 이미 사용 중이면** 다른 이름 고려:
- `@{your-username}/ai-devseed` (스코프 패키지)
- `devseed-cli`
- `ai-dev-seed`

### 10-4. package.json 최종 확인

`packages/cli/package.json` 확인:

```bash
cd packages/cli
cat package.json
```

다음 항목들이 본인 정보로 채워졌는지 확인:
- `"author": "Your Name"` → 본인 이름
- `"homepage"` → 본인 GitHub URL
- `"bugs"` → 본인 Issues URL
- `"repository"` 추가 (없으면):

```json
"repository": {
  "type": "git",
  "url": "https://github.com/{username}/ai-devseed.git",
  "directory": "packages/cli"
}
```

### 10-5. 로컬 테스트 (publish 전!)

```bash
cd packages/cli

# 패키지로 만들어보기 (publish 안 함)
npm pack

# 어떤 파일이 들어갔는지 확인
tar -tzf ai-devseed-0.1.0-beta.1.tgz | head -30

# 로컬에 설치해보기
cd /tmp
npm install -g /path/to/ai-devseed-0.1.0-beta.1.tgz

# 동작 확인
ai-devseed --version
ai-devseed init test-from-package

# 정리
npm uninstall -g ai-devseed
rm /path/to/ai-devseed-0.1.0-beta.1.tgz
```

### 10-6. 베타 publish

```bash
cd packages/cli

# 베타 태그로 publish
npm publish --tag beta --access public
```

⚠️ **주의사항:**
- 한 번 publish하면 **버전 번호로 다시 publish 못 함**
- 실수했으면 버전 올리고 다시: `npm version 0.1.0-beta.2`
- 첫 publish는 항상 긴장됨, 천천히 확인하면서

✅ **확인**: 
- `npm view ai-devseed` 시 정보 보임
- `npx ai-devseed@beta --version` 동작
- https://www.npmjs.com/package/ai-devseed 페이지 존재

### 10-7. 정식 publish는?

베타 충분히 검증 후 (1-2주):
```bash
npm version 0.1.0  # beta 떼기
npm publish --access public
```

---

## 1️⃣1️⃣ Reddit 출시 글 준비

**여기가 진짜 마케팅 시작**이에요.

### 추천 서브레딧 (출시 첫 주)

| 서브레딧 | 멤버 수 | 분위기 | 추천도 |
|----------|--------|-------|------|
| r/SideProject | 200K+ | 매우 환영 | ⭐⭐⭐⭐⭐ |
| r/programming | 6M+ | 깐깐, 기술적 깊이 필요 | ⭐⭐⭐ |
| r/learnprogramming | 4M+ | 초보 친화적 | ⭐⭐⭐⭐ |
| r/ClaudeAI | 50K+ | Claude 사용자 모임 | ⭐⭐⭐⭐⭐ |
| r/opensource | 200K+ | OS 프로젝트 | ⭐⭐⭐⭐ |
| r/webdev | 2M+ | 웹 개발 | ⭐⭐⭐ |
| r/reactnative | 100K+ | RN 사용자 | ⭐⭐⭐⭐ |
| r/typescript | 200K+ | TS 사용자 | ⭐⭐⭐ |

### 글 작성 원칙

**❌ 피할 것 (스팸 취급):**
- "Check out my new tool!" (자기 자랑)
- 이모지 떡칠
- "Please subscribe/upvote" (구걸)
- 동일 글 여러 서브레딧 동시 도배

**✅ 환영 받는 글:**
- 만든 동기와 문제 해결 스토리
- 솔직한 한계 인정
- 피드백 요청
- 도움이 필요한 부분

### 글 템플릿 (영문)

각 서브레딧별로 약간씩 다르게 작성하세요. 기본 템플릿:

```markdown
**Title**: I built a CLI tool for AI-collaborative project setup [Beta] 🌱

After building several side projects with Claude Code, I kept rewriting the 
same setup files over and over: CLAUDE.md, ADR templates, workflow guides...

So I extracted the patterns into a CLI tool: **AI DevSeed**

```bash
npx ai-devseed init my-app
```

It generates a project structure optimized for AI-collaborative development:
- CLAUDE.md template (auto-loaded by Claude Code)
- ADR (Architecture Decision Records) folder
- Daily journal templates
- Idea management system (inbox/big ideas)
- GitHub issue templates
- Workflow guides

Currently in beta. Would love feedback from anyone using AI tools for solo 
development.

GitHub: https://github.com/{username}/ai-devseed

**Honest about limitations:**
- Still in beta, expect rough edges
- Only 2 templates so far (generic, mobile-RN)
- Documentation could be better
- No automated tests yet

**Looking for:**
- General feedback on the approach
- Template suggestions
- Bug reports

Inspired by my own pain points + ideas from indie hacker communities.
```

### 글 올리기 전 체크리스트

```
[ ] README가 매력적으로 작성됨
[ ] 데모 GIF 또는 스크린샷 있음
[ ] GitHub Star 최소 5개 (지인 부탁)
[ ] npm publish 완료 (npx 동작 확인)
[ ] 서브레딧 규칙 읽음
[ ] 다른 글 보고 톤 맞춤
[ ] 댓글 응답할 시간 확보 (첫 1-2시간이 골든타임)
```

### 글 올린 후

- **2-4시간 동안 댓글에 응답** (가장 중요!)
- 비판도 정중하게 받기
- "Thanks for feedback" 만 말고 구체적 답변
- 좋은 제안은 Issue로 등록 ("Tracking this here: #X")

---

## 1️⃣2️⃣ Dev.to 출시 글

블로그 형태의 더 긴 글. **검색 트래픽** 효과가 큼.

### 글 주제 아이디어

1. **"How I built X with Claude Code in 60 days"** (Otori 출시 후)
2. **"Why I extracted my project setup into a CLI tool"** (지금 가능)
3. **"AI-first documentation: A new way to think about README"**
4. **"The Single Source of Truth principle for solo developers"**

### 권장 구조

```markdown
1. Hook (문제 제기) - 2-3 문단
2. Story (어떻게 발견) - 3-5 문단
3. Solution (만든 것) - 코드 + 스크린샷
4. Lessons learned - 솔직한 회고
5. Try it yourself - GitHub/npm 링크
6. Discussion - "Have you tried similar?"
```

### 영어가 부담되면?

**Claude를 활용하세요:**
```
"이 글의 영어 자연스러운지 검토해주고 어색한 표현 수정해줘:
[글 본문]"
```

이게 본인의 강점이에요. 영어가 약해도 AI로 보완 가능.

### 게시 후

- 댓글 응답
- 좋은 댓글 → Twitter/Reddit으로 인용 (계정 만들면)
- 시리즈 형태로 후속글 ("Building Otori - Part 2")

---

## 📊 출시 후 1주일 액션 플랜

```
Day 1 (출시일):
- GitHub 저장소 공개
- npm publish (베타)
- 친구/지인에게 공유 (Star 부탁)
- Reddit r/SideProject에 글
- Reddit r/ClaudeAI에 글

Day 2:
- 댓글 응답
- 받은 피드백 정리 (Issue로 등록)
- Dev.to 글 작성

Day 3:
- Dev.to 글 게시
- Reddit r/programming 글 (다른 톤으로)
- Disquiet (한국 인디 메이커) 글

Day 4-7:
- 받은 피드백 반영
- 작은 버그 수정 → v0.1.0-beta.2 publish
- LinkedIn 글 1개

Week 2:
- 트래픽 분석 (GitHub Insights, npm stats)
- 가장 반응 좋은 채널 집중
- 다음 기능 우선순위 결정
```

---

## 📈 성공 지표 (현실적인 목표)

### 1주일 후 목표
- GitHub Star: 20-50개
- npm 다운로드: 100-300회
- Reddit 업보트: 50-200개
- 첫 GitHub 이슈: 1-3개

### 1개월 후
- GitHub Star: 100-300개
- npm 다운로드 (월): 500-2000회
- Discord/Discussion 참여자: 5-20명
- 첫 외부 기여 (PR): 1-3개

### 3개월 후
- GitHub Star: 500+
- 월 다운로드: 5,000+
- Pro 구매: 5-20건/월

⚠️ **이 숫자는 매우 낙관적**입니다. 현실은 더 작을 수 있어요. 0개여도 정상이에요. 첫 프로젝트 출시는 인지도 쌓는 과정이에요.

---

## 🆘 자주 막히는 곳

### Q. npm publish 시 "403 Forbidden"
- 패키지명 이미 사용 중 → 다른 이름 또는 스코프 패키지
- 2FA 인증 누락 → `npm publish --otp=XXXXXX`

### Q. Reddit 글이 자동 삭제됨
- 신생 계정은 신뢰도 부족 → 다른 글에 댓글 남기며 신뢰 쌓기
- 자기 홍보 비율 너무 높음 → 다양한 글 쓰기

### Q. GitHub Star가 안 오름
- 정상이에요. 첫 1주일이 가장 어려움
- README 개선 + 더 많은 채널에 공유
- "Show HN" Hacker News에 한 번 올려보기 (월요일 오전 9시 EST 추천)

### Q. 사용자가 npx 했는데 에러
- Node.js 버전 너무 낮음 (18+ 필요)
- package.json `engines` 명시 확인
- 베타라 어쩔 수 없는 부분도 있음, 빠르게 패치

---

## 🎯 다음 단계 (출시 후)

1. **피드백 수집 → v0.1.0-beta.2 출시**
2. **web-react 템플릿 추가**
3. **Otori 진행하면서 새 패턴 추가**
4. **Otori MVP 완성 후 → 가이드북 시작**
5. **충분한 사용자 모이면 → Pro 티어 출시**

---

*Made with 🌱 for the open source community*
