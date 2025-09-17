# 기술 아키텍처 설계서

## 1. 아키텍처 개요
- Next.js(App Router) 정적 내보내기(`output:'export'`), GitHub Pages 배포
- 라우팅: `/app-guide` 이하 섹션, 루트는 리다이렉트

## 2. 기술 스택
- FE: Next 15, React 19, TypeScript 5, Tailwind v4, shadcn/ui, Radix UI
- 문서: `react-markdown`, `gray-matter`

## 3. 시스템 다이어그램(요약)
- Markdown(Content) → 빌드 시 파싱 → 정적 페이지 → Pages/CDN

## 4. API 설계
- 현재 백엔드 API 없음(정적). 필요 시 OpenAPI 기반 확장 예정

## 5. 보안/규정 준수
- 비밀정보 저장 금지, 공개 저장소 정책 준수

## 6. 운영 고려사항
- `basePath:'/guide'`, `trailingSlash:true`, 이미지 `unoptimized:true`
- Lighthouse/링크체커/A11y CI 권장

## 7. 비용/용량 계획
- 정적 호스팅/캐시 기반, 비용 최소

## 8. 리스크 및 대안
- 정적 한계(동적 검색/주석) → 클라이언트 검색 도입/SSG+ISR 대안
