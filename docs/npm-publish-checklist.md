# 📦 npm 배포 체크리스트

AI DevSeed를 npm에 배포하기 전 확인할 모든 것.

---

## 🎯 배포 전 체크리스트

### 1. npm 계정 준비
- [ ] https://www.npmjs.com/signup 가입
- [ ] 이메일 인증 완료
- [ ] 2FA 활성화 (Account Settings → Two-factor authentication)
- [ ] 로컬에서 `npm login` 완료

### 2. package.json 점검
- [ ] `name` - 사용 가능한 이름인지 확인 (`npm view ai-devseed`)
- [ ] `version` - 베타는 `0.1.0-beta.1` 형식
- [ ] `description` - 한 줄 설명
- [ ] `keywords` - 검색에 쓰일 키워드 (10개 이내)
- [ ] `author` - 본인 이름
- [ ] `license` - MIT
- [ ] `homepage` - GitHub URL
- [ ] `bugs.url` - GitHub Issues URL
- [ ] `repository` - GitHub repo 정보
- [ ] `bin` - CLI 명령어 매핑
- [ ] `files` - 배포할 파일 목록
- [ ] `engines.node` - Node 버전 요구사항

### 3. 코드 점검
- [ ] CLI 동작 테스트 (`node bin/ai-devseed.js init test`)
- [ ] 모든 옵션 테스트 (`--yes`, `--template`, `--no-git`)
- [ ] 에러 핸들링 확인
- [ ] README 링크 모두 실제 URL인지

### 4. 파일 점검
- [ ] `LICENSE` 파일 존재
- [ ] `README.md` 패키지 설명
- [ ] `.npmignore` 또는 `package.json files` 제대로 설정
- [ ] `node_modules` 제외됨

### 5. 보안 점검
- [ ] `.env` 같은 비밀 파일 없음
- [ ] API 키 하드코딩 없음
- [ ] `npm audit` 실행 (의존성 취약점 확인)

---

## 🚀 배포 절차

### Step 1: 로컬 테스트 (배포 전 필수!)

```bash
cd packages/cli

# 패키지 만들어보기 (실제 publish 안 함)
npm pack

# 어떤 파일이 들어갔는지 확인
tar -tzf ai-devseed-*.tgz
# node_modules 없어야 함!

# 임시 디렉토리에서 설치 테스트
cd /tmp
npm install -g $(ls /path/to/ai-devseed/packages/cli/ai-devseed-*.tgz)

# 동작 확인
ai-devseed --version
ai-devseed init test-from-package --yes --no-git
ls test-from-package

# 정리
npm uninstall -g ai-devseed
rm -rf test-from-package
rm /path/to/ai-devseed/packages/cli/ai-devseed-*.tgz
```

### Step 2: Dry run

```bash
cd packages/cli

# 실제 publish 없이 어떻게 될지 확인
npm publish --dry-run --tag beta

# 출력:
# - 어떤 파일이 publish 될지
# - 패키지 크기
# - 메타데이터
```

확인 사항:
- 파일 개수 (templates + src + bin + docs)
- 총 크기 (보통 < 100KB)
- node_modules 없음

### Step 3: 베타 publish

```bash
npm publish --tag beta --access public
```

⚠️ 주의:
- 한 번 publish하면 동일 버전 다시 publish 불가
- 24시간 내에는 unpublish 가능 (그 후엔 어려움)
- `--tag beta`는 `latest`로 안 가서 안전

### Step 4: 검증

```bash
# 메타데이터 확인
npm view ai-devseed

# 페이지 방문
open https://npmjs.com/package/ai-devseed

# 다른 시스템에서 설치 시도
npx ai-devseed@beta --version
```

### Step 5: 다음 버전 (수정 시)

```bash
# 패치 버전 (0.1.0-beta.1 → 0.1.0-beta.2)
npm version prerelease --preid=beta

# 또는 수동
# package.json 직접 수정

# 다시 publish
npm publish --tag beta --access public
```

---

## 🎯 정식 배포 (베타 → 정식)

베타 1-2주 운영 후 안정되면:

### 1. 버전 정리

```bash
# 0.1.0-beta.X → 0.1.0
npm version 0.1.0
```

### 2. 정식 publish

```bash
npm publish --access public
# --tag 없으면 latest로 됨
```

### 3. 베타 사용자 안내

GitHub Discussion이나 README에:
```
v0.1.0 stable is out!
Update with: npm install -g ai-devseed@latest
```

---

## 📊 배포 후 모니터링

### 다운로드 통계
- https://www.npmjs.com/package/ai-devseed
- https://npm-stat.com (자세한 차트)
- https://npmtrends.com (다른 패키지와 비교)

### GitHub Insights
- Stars 추이
- Traffic (방문자)
- 어디서 유입되는지

### 사용자 피드백 추적
- GitHub Issues
- GitHub Discussions  
- Reddit 댓글
- Twitter 멘션 (계정 만들면)

---

## ⚠️ 흔한 실수

### 1. node_modules가 publish됨
**원인:** `.npmignore` 또는 `files` 미설정
**해결:** `package.json`의 `files` 배열에 명시:
```json
"files": ["bin/", "src/", "templates/", "README.md", "LICENSE"]
```

### 2. 패키지명 중복
**원인:** 이미 누가 사용 중
**해결:**
- 다른 이름 시도
- 스코프 패키지: `@username/ai-devseed`

### 3. 권한 에러 (403)
**원인:** 2FA OTP 누락 또는 로그인 안 됨
**해결:**
```bash
npm whoami  # 로그인 확인
npm publish --otp=123456  # OTP 직접 전달
```

### 4. publish 후 에러 발견
**해결:** 빠르게 새 버전 publish
```bash
npm version patch
npm publish --tag beta
```

24시간 이내면 unpublish도 가능:
```bash
npm unpublish ai-devseed@0.1.0-beta.1
# 권장 X (사용자에게 혼란)
```

### 5. CLI가 실행 안 됨
**원인:** `bin` 파일에 shebang 없음 또는 권한 없음
**해결:**
- 첫 줄: `#!/usr/bin/env node`
- 권한: `chmod +x bin/ai-devseed.js`

---

## 🛠 자동화 (선택)

### GitHub Actions로 자동 배포

`.github/workflows/release.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: cd packages/cli && npm install
      - run: cd packages/cli && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

GitHub release 만들면 자동 배포됨.

⚠️ 처음엔 수동으로. 익숙해진 후 자동화.

---

## 📋 첫 배포 일정 추천

```
Day 1 (오늘):
- npm 계정 만들기
- 로컬 테스트 (npm pack)

Day 2:
- npm publish (베타)
- 본인 시스템에서 npx ai-devseed 동작 확인
- 친구 1명에게 테스트 부탁

Day 3:
- GitHub README 최종 다듬기
- 작은 버그 발견되면 패치 버전 publish

Day 4:
- 첫 Reddit/Disquiet 글
- 댓글 응답

Day 5-7:
- 피드백 반영
- 필요시 v0.1.0-beta.2 publish

Week 2-4:
- 안정화
- 정식 v0.1.0 출시 검토
```

---

## 🆘 도움이 필요할 때

- npm 공식 문서: https://docs.npmjs.com
- "How to publish your first npm package" 검색
- GitHub Discussions에 질문
- 또는 Claude에게 물어보기 😄
