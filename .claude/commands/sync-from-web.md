---
description: Claude.ai (웹)에서 한 작업/결정을 Claude Code로 가져와 반영
---

사용자가 Claude.ai에서 큰 결정/논의/기획을 하고 돌아왔을 때 사용하는 명령어.
다음 워크플로우로 진행:

## 1단계: 사용자에게 확인

다음 질문을 한 번에 물어봐 (인터랙티브하게):

```
🌐 Claude.ai에서 작업하고 돌아오셨네요!

다음 중 어떤 게 있었나요? (해당하는 것 모두 입력)

1. 새 결정사항 (ADR로 기록할 만한 것)
2. 새 아이디어 (다음 기능/방향성)
3. 와이어프레임/디자인 변경
4. 새 문서 또는 문서 변경
5. 기존 ADR 수정/대체
6. 위에 없음 (단순 논의만)

번호로 답해주세요 (예: "1, 3" 또는 "6")
```

## 2단계: 각 항목별 처리

### 1번 - 새 결정사항 선택 시
```
어떤 결정인지 자세히 알려주세요:
- 결정 내용:
- 결정 이유:
- 영향 받는 코드/문서:
- (이미 ADR 번호 정한 게 있나요? 없으면 자동 부여)
```

→ 답변 받으면:
1. `docs/decisions/NNN-{slug}.md` 자동 생성 (폴더 없으면 만들고 다음 번호 사용)
2. ADR 표준 형식 따라 작성 (Context / Decision / Consequences)
3. `HANDOFF-aidevseed.md` 최근 결정 섹션에 1줄 추가 (없으면 새 섹션 생성)
4. `CHANGELOG.md` `[Unreleased]`에 ADR 항목 기록
5. 영향받는 코드/문서 목록 출력 (사용자가 다음 작업으로 진행)

### 2번 - 새 아이디어 선택 시
```
아이디어 카테고리는?
1. 🔥 즉시 처리 (작은 개선)
2. 🌱 다음 버전 기능
3. 🌳 큰 비전
4. 💭 단편적 (인박스만)
```

→ 카테고리별 처리:
- 1번: GitHub Issue로 등록 (`gh issue create`)
- 2번: GitHub Issue로 등록 + phase 라벨
- 3번: `docs/ideas/big/{이름}.md` 생성
- 4번: `docs/ideas/inbox.md`에 한 줄 추가

### 3번 - 와이어프레임/디자인 변경
```
어떤 변경인가요?
1. 새 와이어프레임 / 다이어그램 추가 (SVG·PNG)
2. 기존 와이어프레임 수정
3. 디자인/UX 결정 (ADR-급 아니지만 기록할 만한 것)
4. 로고/아이콘 변경

파일이 있나요? (Claude.ai에서 SVG·이미지 받은 게 있다면 경로 알려주세요)
```

→ 처리:
- 새 와이어프레임/이미지: `docs/images/` 또는 `docs/wireframes/v{현재버전+1}/`에 추가 (폴더 없으면 생성)
- 디자인/UX 메모: `docs/design-notes.md` 추가/업데이트 (해당 프로젝트에 없으면 새 파일)
- CHANGELOG `[Unreleased]`에 변경 기록

### 4번 - 새 문서 / 문서 변경
```
어떤 문서인가요?
1. 기존 문서 업데이트 (어떤 파일?)
2. 새 문서 추가 (어디에?)

내용을 알려주거나, Claude.ai에서 복사한 마크다운을 붙여넣어 주세요.
```

→ 처리:
- 해당 위치에 파일 생성/업데이트
- `HANDOFF-aidevseed.md`에 동기화 항목 한 줄 추가 (날짜·출처·요약)

### 5번 - ADR 수정/대체
```
어떤 ADR을 수정/대체하나요?
- 기존 ADR 번호:
- 새 결정:
- 상태 변경: (Deprecated / Superseded)
```

→ 처리:
- 기존 ADR 상태를 "Deprecated" 또는 "Superseded"로 변경
- 새 ADR 작성 (필요시)
- `HANDOFF-aidevseed.md` 업데이트

### 6번 - 단순 논의만
```
✅ Claude.ai에서 좋은 논의 하셨네요!

특별히 동기화할 건 없어 보이지만, 만약 정리해두고 싶다면:
- 단편 메모: docs/ideas/inbox.md
- 회의록 형태: docs/conversations/YYYY-MM-DD-{주제}.md

원하시면 알려주세요. 아니면 그냥 코딩 시작!
```

## 3단계: 최종 정리

모든 항목 처리 후:

1. **`HANDOFF-aidevseed.md` 업데이트**:
   - "Last sync" 날짜 갱신 (출처: Claude.ai → Claude Code)
   - 이번 세션 반영 내역을 적절한 Phase/섹션에 1~2줄로 추가
   - 새 결정사항이 있으면 별도 기록

2. **변경사항 요약 출력** (예시):
```
✅ 동기화 완료!

📝 변경된 파일:
- docs/decisions/NNN-{slug}.md (신규)
- HANDOFF-aidevseed.md (업데이트)
- CHANGELOG.md (업데이트)

🎯 다음 작업 제안:
- 영향 받는 코드/문서 수정
- 필요 시 테스트 추가

💾 자동 커밋할까요? (y/n)
- 커밋 메시지: "docs: sync from Claude.ai session — ADR NNN"
```

3. **사용자 동의 시 자동 커밋**:
```bash
git add docs/ HANDOFF-aidevseed.md CHANGELOG.md
git commit -m "docs: sync from Claude.ai session

- Added ADR NNN: {decision title}
- Updated HANDOFF-aidevseed.md
- Updated CHANGELOG.md"
```

## 사용 예시

```
사용자: /sync-from-web

Claude: 🌐 Claude.ai에서 작업하고 돌아오셨네요!
       [질문 목록]

사용자: 1, 2

Claude: [1번 질문]
사용자: [답변]

Claude: [2번 질문]
사용자: [답변]

Claude: ✅ 동기화 완료!
       [변경 사항 요약]
       💾 자동 커밋할까요? (y/n)

사용자: y

Claude: ✅ 커밋 완료. 이제 코딩 시작하시면 됩니다!
       /daily 명령으로 오늘 할 일도 확인해보세요.
```

## 주의사항

- 한 번에 너무 많은 변경을 동기화하려 하지 말 것
- 5개 이상 항목이면 여러 번 나눠서 진행
- 사용자가 잘 모르면 단순히 `HANDOFF-aidevseed.md`에 메모로만 남기기
- ADR 작성은 신중하게 — 사용자에게 확인 받기
- 프로젝트에 `docs/decisions/`·`docs/ideas/` 폴더가 없으면 먼저 만들어도 되는지 한 번 확인
