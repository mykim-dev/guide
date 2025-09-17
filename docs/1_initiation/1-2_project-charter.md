# 프로젝트 개요서 (Project Charter)

## 1. 프로젝트 목적
- 조직 표준 UI/토큰/문서화를 위한 디자인 시스템 가이드 구축 및 운영

## 2. 범위(High-level Scope)
- 포함: Next.js 정적 문서, 컴포넌트 카탈로그, 토큰/팔레트/타이포, 플레이그라운드, UI 템플릿
- 제외: 인증/백엔드, 복잡한 데이터 편집기능, 멀티 테넌시

## 3. 일정/마일스톤 (예시)
- M1: IA/템플릿 정리
- M2: 컴포넌트 가이드/토큰 구현 완료
- M3: QA/접근성 검증/Lighthouse CI
- M4: GitHub Pages 배포/운영

## 4. 예산 및 자원
- FE 1-2, 디자인 1, QA 1 (파트타임 가능)
- 도구: GitHub, Pages, Lighthouse/Axe

## 5. 조직 및 역할
- Product Owner, Tech Lead, FE Dev, Designer, QA

## 6. 거버넌스/의사결정 구조
- 주간 스탠드업, PR 리뷰, 문서 변경 승인(PR Template)

## 7. 성공 기준
- 50+ 컴포넌트 문서화, A11y 기본 체크 통과, Core Web Vitals 양호, 배포 자동화

## 8. 제약/가정
- 정적 배포(`output:'export'`, `basePath:'/guide'`) 전제
- 브라우저: 최신 크롬/엣지/사파리

## 9. 리스크
- 문서-코드 불일치 → 자동 생성 스크립트/리뷰로 완화

## 10. 승인
- 승인자 / 일자
