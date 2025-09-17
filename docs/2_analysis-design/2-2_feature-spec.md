# 기능 정의서 (Feature Specification)

## Feature: 컴포넌트 가이드 라우팅
- 목적: `content/component-guide/*.md` → `/app-guide/component-guide/[slug]`
- 요구사항: Front matter(`title`,`description`) 파싱, 목록/상세 렌더
- 우선순위: P0
- AC: 모든 md 접근 가능, 404 없음, 사이드 네비 활성 상태 반영

## Feature: 디자인 토큰 CSS 생성
- 목적: `generated-theme-variables.css` 자동 생성 및 다크/라이트 스위치
- 구현: `scripts/generate-css-variables.ts` → `src/app/generated-theme-variables.css`
- 우선순위: P0
- AC: 빌드 후 CSS 동작, 테마 전환 정상

## Feature: 정적 배포 설정
- 목적: GitHub Pages 호환 빌드/배포
- 구현: `next.config.ts`(`output:'export'`, `basePath:'/guide'`, `trailingSlash:true`, `images.unoptimized`)
- 우선순위: P0
- AC: `out/` 산출물에서 모든 링크 정상

## Feature: 플레이그라운드
- 목적: UI 컴포넌트 실시간 테스트 및 코드 확인
- 우선순위: P1
- AC: 주요 컴포넌트 상호작용 가능
