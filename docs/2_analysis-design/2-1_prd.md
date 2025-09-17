# PRD (Product Requirement Document)

## 1. 개요
- 제품: Design System Guide (정적 문서 사이트)
- 목표: 일관된 UI/토큰/문서 제공 및 재사용성 극대화

## 2. 사용자 및 페르소나
- FE 개발자, 디자이너, QA, 문서 소비자(내부/협력사)

## 3. 기능 요구사항 (우선순위)
- P0: `layout-guide` 섹션 렌더(overview, foundations, component-guide, playground, resource)
- P0: `content/component-guide`의 MD 파일 목록을 라우팅(`/app-guide/component-guide/[slug]`)
- P0: 토큰 CSS 생성(`src/app/generated-theme-variables.css`), 다크/라이트 동작
- P1: 플레이그라운드 실시간 조작, 코드 보기
- P1: 컴포넌트 템플릿/자동 생성 스크립트 유지

## 4. 사용자 흐름 / 시나리오
- 사용자는 홈 → `/app-guide`로 리다이렉트되어 섹션 탐색
- 컴포넌트 목록 → 컴포넌트 상세 → 코드/예제 확인

## 5. 비기능 요구사항 (NFR)
- 정적 export, Pages 배포, `basePath:'/guide'`, `trailingSlash:true`
- 이미지 최적화 비활성(`images.unoptimized:true`)

## 6. 릴리스 범위 및 단계화
- MLP: Foundations/Component Guide/Playground 기본 제공
- MVP: 토큰 에디터/자동 생성 스크립트/접근성 체크

## 7. 측정 및 성공 기준
- 404/링크 깨짐 0, Lighthouse 90+, 컴포넌트 50+ 커버

## 8. 리스크 및 가정
- 문서와 코드 동기화는 스크립트와 리뷰로 보장

## 9. 승인
- 승인자 / 일자
