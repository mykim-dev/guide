# 테스트 계획서 (Test Plan)

## 1. 목적 및 범위
- 범위: `/app-guide/**` 모든 정적 페이지와 링크 무결성, 접근성 기본

## 2. 일정 및 역할
- 개발 완료 후 1주 내 QA, UAT 2일, 승인 배포

## 3. 테스트 전략
- 기능: 라우팅/렌더
- 회귀: MD 변경 시 주요 페이지 스팟 체크
- 접근성: 키보드/명도/ARIA 체크
- 성능: Lighthouse 샘플링

## 4. 기준 및 종료 조건
- Critical/High 결함 0, Major 0, Minor 허용 범위
- Lighthouse 90+, 링크 깨짐 0

## 5. 환경
- GitHub Pages 미리보기, 로컬 `pnpm build && pnpm export`

## 6. 산출물
- 테스트 케이스 결과, 버그 리포트, 테스트 리포트(UAT 포함)
