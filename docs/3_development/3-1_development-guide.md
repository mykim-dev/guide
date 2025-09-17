# 개발 가이드 (Coding & Process Guide)

## 1. 코딩 컨벤션
- TypeScript 명시적 타입, 의미 있는 네이밍, 접근성 우선
- 컴포넌트: 함수형, props 문서화, shadcn/ui 패턴 준수
- 스타일: Tailwind v4, 토큰(CSS variables) 활용

## 2. 브랜치/커밋
- main(배포), feature/*, fix/*
- Conventional Commits: feat/fix/docs/chore/refactor/test

## 3. 스크립트
- dev/build/start/lint/export/deploy
- guides 생성: `scripts/generate-component-guides.ts`
- CSS 변수 생성: `scripts/generate-css-variables.ts`

## 4. 설정
- `next.config.ts`: `output:'export'`, `basePath:'/guide'`, `trailingSlash:true`
- `src/app/page.tsx`: `/app-guide`로 redirect

## 5. 문서 파이프라인
- `content/component-guide/*.md` → `/app-guide/component-guide/[slug]`
- `lib/markdown.ts`로 front matter 파싱

## 6. 품질/테스트
- ESLint, 접근성 수동 체크, Lighthouse(권장)

## 7. 배포
- GitHub Pages(gh-pages), `out/` 산출물
