# 배포 계획서 (Release Plan)

## 1. 개요
- 대상: GitHub Pages(`/guide/`) 정적 배포
- 목표: 링크 무결성/성능 90+ 확보

## 2. 범위
- Next export 산출물 `out/` 전체

## 3. 일정 및 단계
- Build → QA → UAT → Export → Pages 배포

## 4. 배포 방법
- `pnpm build && pnpm export` 후 `gh-pages -d out`
- `basePath:'/guide'`, `trailingSlash:true` 확인

## 5. 롤백 전략
- 이전 태그로 재배포, 캐시 무효화

## 6. 커뮤니케이션
- CHANGELOG 공유, 이해관계자 공지

## 7. 위험 및 완화
- 링크 깨짐 → 링크체커 사전 실행
- 대비/접근성 이슈 → UAT 시 확인
