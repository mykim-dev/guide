# 📚 프로젝트 문서 (IT/서비스 개발 전 단계)

> 현재 리포(Next.js 정적 문서, basePath '/guide')에 맞춘 실전 템플릿입니다.

## 🗂 문서 네비게이션

- 1) 기획/아이데이션
  - [프로젝트 제안서 (Proposal)](./1_initiation/1-1_proposal.md)
  - [프로젝트 개요서 (Project Charter)](./1_initiation/1-2_project-charter.md)
  - [요구사항 정의서 (BRD)](./1_initiation/1-3_brd.md)
  - [시장/경쟁 분석 보고서](./1_initiation/1-4_market-analysis.md)
- 2) 분석/설계
  - [PRD (Product Requirement Document)](./2_analysis-design/2-1_prd.md)
  - [기능 정의서 (Feature Spec)](./2_analysis-design/2-2_feature-spec.md)
  - [IA (Information Architecture)](./2_analysis-design/2-3_information-architecture.md)
  - [UX/UI 와이어프레임 & 프로토타입](./2_analysis-design/2-4_ux-wireframes-prototype.md)
  - [데이터 모델링 (ERD/DB 스키마)](./2_analysis-design/2-5_data-modeling.md)
  - [기술 아키텍처 설계서](./2_analysis-design/2-6_technical-architecture.md)
- 3) 개발
  - [개발 가이드](./3_development/3-1_development-guide.md)
  - [API 명세서](./3_development/3-2_api-spec.md)
  - [테스트 케이스](./3_development/3-3_test-cases.md)
  - [변경 이력 (Changelog)](./3_development/3-4_CHANGELOG.md)
- 4) 테스트/검증
  - [테스트 계획서](./4_testing/4-1_test-plan.md)
  - [테스트 결과 보고서](./4_testing/4-2_test-report.md)
  - [UAT (사용자 인수 테스트)](./4_testing/4-3_uat.md)
- 5) 배포/운영
  - [배포 계획서](./5_release-ops/5-1_release-plan.md)
  - [운영 매뉴얼](./5_release-ops/5-2_operations-manual.md)
  - [사용자 매뉴얼](./5_release-ops/5-3_user-guide.md)
  - [FAQ & Troubleshooting](./5_release-ops/5-4_faq-troubleshooting.md)
- 6) 종료/회고
  - [프로젝트 완료 보고서](./6_closure/6-1_project-closure-report.md)
  - [회고 보고서](./6_closure/6-2_retrospective.md)
  - [성과 분석 (KPI/ROI)](./6_closure/6-3_kpi-roi.md)

## ✅ 최소 필수 세트 (요약)
- 시작: 제안서, 요구사항 정의서(BRD)
- 설계: PRD, 와이어프레임/IA, 아키텍처 설계
- 개발: 개발 가이드, 테스트 케이스
- 테스트: 테스트 계획/결과
- 배포: 배포 계획, 운영/사용자 매뉴얼
- 종료: 완료 보고서, 회고 보고서

## ℹ️ 프로젝트 특이사항 반영
- 정적 배포: `output:'export'`, `basePath:'/guide'`, `trailingSlash:true`
- 콘텐츠 파이프라인: `content/component-guide/*.md` → `/app-guide/component-guide/[slug]`
- 토큰/테마: `scripts/generate-css-variables.ts` → `src/app/generated-theme-variables.css`
- 네비게이션/IA: `src/app/app-guide/**`
