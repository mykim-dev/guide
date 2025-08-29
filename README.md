# 🎨 Design System Guide

> 체계적인 디자인 시스템을 구축하고 관리할 수 있는 종합적인 가이드입니다. 디자인 토큰부터 컴포넌트 라이브러리, 그리고 테마 에디터까지 모든 것을 제공합니다.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## ✨ 주요 기능

### 🎯 디자인 토큰 시스템
- **색상 토큰**: 브랜드 색상과 기능적 색상 체계 (OKLCH 색상 공간 지원)
- **타이포그래피 토큰**: 폰트 크기, 줄 높이, 글자 간격
- **간격 토큰**: 여백과 패딩 값 체계
- **Tailwind CSS v4 통합**: 자동 설정 생성 및 CSS 변수 지원

### 🧩 컴포넌트 라이브러리 (50+ 컴포넌트)
- **shadcn/ui 기반**: 현대적이고 접근성 높은 컴포넌트
- **다양한 컴포넌트**: 버튼, 입력 필드, 카드, 모달, 차트, 캐러셀 등
- **일관된 디자인**: 통일된 디자인 언어와 스타일 시스템
- **접근성 우선**: ARIA 속성과 키보드 네비게이션 지원

### 📚 Markdown 기반 문서화
- **디자인 가이드**: 디자인 원칙과 가이드라인
- **컴포넌트 가이드**: 각 컴포넌트의 사용법과 예제
- **실시간 렌더링**: Markdown을 실시간으로 렌더링
- **자동 가이드 생성**: 컴포넌트 템플릿 기반 자동 문서 생성

### 🎮 플레이그라운드
- **실시간 테스트**: 컴포넌트를 실시간으로 테스트
- **속성 조정**: 다양한 속성을 실시간으로 변경
- **코드 생성**: 설정에 따른 코드 자동 생성
- **50+ 컴포넌트 지원**: 모든 UI 컴포넌트 실시간 테스트

### 🎨 테마 에디터
- **색상 커스터마이징**: OKLCH 색상 공간 기반 실시간 편집
- **미리보기**: 변경사항 실시간 미리보기
- **설정 내보내기**: Tailwind CSS 설정 자동 생성
- **로컬 테마**: 페이지별 임시 테마 적용

### ⚡ 자동화 도구
- **컴포넌트 가이드 생성**: `npm run generate-guides`
- **CSS 변수 생성**: `npm run generate-css`
- **빌드 최적화**: Turbopack을 통한 빠른 개발 환경

## 🛠️ 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| **Framework** | Next.js 15.5.0 | App Router 기반 React 프레임워크 |
| **Language** | TypeScript 5 | 타입 안전성과 개발자 경험 향상 |
| **Styling** | Tailwind CSS v4 | 유틸리티 우선 CSS 프레임워크 |
| **Components** | shadcn/ui | 50+ 현대적 UI 컴포넌트 |
| **Markdown** | react-markdown | 실시간 Markdown 렌더링 |
| **Icons** | Lucide React | 아름다운 아이콘 라이브러리 |
| **State** | React Context | 전역 상태 관리 |
| **Build Tool** | Turbopack | 빠른 개발 환경 |
| **Color System** | OKLCH | 현대적 색상 공간 |

## 🚀 빠른 시작

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd design-system-guide
```

### 2. 의존성 설치
```bash
npm install
# 또는
pnpm install
# 또는
yarn install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 확인
```
http://localhost:3000
```

## 📦 사용 가능한 명령어

```bash
# 개발 서버 실행 (Turbopack 사용)
npm run dev

# 컴포넌트 가이드 자동 생성
npm run generate-guides

# CSS 변수 자동 생성
npm run generate-css

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 타입 체크
npm run type-check

# 린트 검사
npm run lint
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # 컴포넌트 페이지
│   ├── design-guide/       # 디자인 가이드
│   ├── component-guide/    # 컴포넌트 가이드
│   ├── playground/         # 플레이그라운드
│   ├── theme-editor/       # 테마 에디터
│   ├── tokens/             # 디자인 토큰
│   ├── globals.css         # 전역 스타일
│   └── generated-theme-variables.css # 자동 생성된 CSS 변수
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트 (50+)
│   ├── docs/               # 문서 관련 컴포넌트
│   └── layout/             # 레이아웃 컴포넌트
├── lib/
│   ├── tokens/             # 디자인 토큰 정의
│   ├── themes/             # 테마 시스템
│   ├── utils/              # 유틸리티 함수
│   ├── component-guide-templates.ts # 자동 가이드 생성 템플릿
│   └── markdown.ts         # Markdown 처리
└── hooks/                  # 커스텀 훅

content/
├── design-guide/           # 디자인 가이드 Markdown
└── component-guide/        # 컴포넌트 가이드 Markdown (자동 생성)

scripts/
├── generate-component-guides.ts # 컴포넌트 가이드 자동 생성
└── generate-css-variables.ts    # CSS 변수 자동 생성
```

## 🎨 디자인 토큰

### 색상 시스템 (OKLCH 기반)
- **Primary**: 브랜드 메인 색상
- **Secondary**: 보조 색상
- **Neutral**: 중성 색상
- **Success**: 성공 상태
- **Warning**: 경고 상태
- **Error**: 오류 상태
- **Info**: 정보 상태
- **Custom**: 사용자 정의 색상

### 타이포그래피
- **Display**: 큰 제목용 (2XL, XL, LG, MD, SM)
- **Heading**: 제목용 (XL, LG, MD, SM)
- **Body**: 본문용 (XL, LG, MD, SM)
- **Label**: 라벨용 (LG, MD, SM)

### 간격
- **0-96**: 4px 단위로 구성된 간격 체계
- **px**: 1px 간격
- **0.5-3.5**: 소수점 간격

## 🧩 사용 가능한 컴포넌트 (50+)

### 📝 기본 컴포넌트
- Button, Input, Textarea, Label, Select
- Checkbox, Radio Group, Switch, Slider
- Badge, Avatar, Progress, Separator

### 📐 레이아웃 컴포넌트
- Card, Accordion, Collapsible
- Tabs, Sidebar, Drawer, Sheet
- Navigation Menu, Breadcrumb

### 🎯 인터랙션 컴포넌트
- Dialog, Alert Dialog, Popover, Tooltip
- Hover Card, Context Menu, Dropdown Menu
- Command, Menubar

### 📊 데이터 컴포넌트
- Table, Calendar, Pagination
- Carousel, Chart, Data Table

### 🔧 기타 컴포넌트
- Color Picker, Input OTP, Toggle, Toggle Group
- Resizable, Scroll Area, Skeleton
- Aspect Ratio, Calendar

## 🔧 사용 방법

### 1. 디자인 토큰 확인
- `/tokens` 페이지에서 기본 토큰들을 확인
- 색상, 타이포그래피, 간격 토큰 체계 이해
- OKLCH 색상 공간의 장점 체험

### 2. 컴포넌트 탐색
- `/components` 페이지에서 사용 가능한 컴포넌트 확인
- 각 컴포넌트의 다양한 변형과 사용법 학습
- 50+ 컴포넌트의 일관된 디자인 시스템 체험

### 3. 문서 읽기
- `/design-guide`에서 디자인 원칙과 가이드라인 확인
- `/component-guide`에서 각 컴포넌트의 상세 사용법 확인
- 자동 생성된 가이드의 완성도 확인

### 4. 플레이그라운드에서 테스트
- `/playground`에서 컴포넌트를 실시간으로 테스트
- 다양한 속성 조합을 시도해보기
- 50+ 컴포넌트의 모든 기능 체험

### 5. 테마 커스터마이징
- `/theme-editor`에서 OKLCH 색상 공간 기반 커스터마이징
- 실시간 색상 변경 및 미리보기
- Tailwind CSS 설정 자동 생성

## 📝 Markdown 문서 작성

### 디자인 가이드 작성
```markdown
---
title: "문서 제목"
description: "문서 설명"
---

# 제목

내용...

## 부제목

내용...
```

### 컴포넌트 가이드 작성
```markdown
---
title: "ComponentName"
description: "컴포넌트 설명"
---

# ComponentName 컴포넌트

## 기본 사용법

```tsx
import { ComponentName } from '@/components/ui/component-name';

<ComponentName>Content</ComponentName>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop` | `type` | `default` | 설명 |
```

## 🎯 개발 가이드

### 새로운 컴포넌트 추가
1. `src/components/ui/`에 컴포넌트 파일 생성
2. shadcn/ui 컴포넌트 추가: `npx shadcn@latest add component-name`
3. `src/app/components/page.tsx`에 컴포넌트 예제 추가
4. `src/lib/component-guide-templates.ts`에 가이드 템플릿 추가
5. `npm run generate-guides`로 가이드 자동 생성

### 새로운 토큰 추가
1. `src/lib/tokens/`에 토큰 정의 파일 생성
2. `src/lib/tokens/index.ts`에 토큰 추가
3. 관련 페이지에 토큰 표시 추가
4. `npm run generate-css`로 CSS 변수 자동 생성

### 새로운 문서 추가
1. `content/design-guide/` 또는 `content/component-guide/`에 Markdown 파일 생성
2. Front matter에 title과 description 추가
3. 자동으로 페이지에 반영됨

### 자동화 스크립트 사용
```bash
# 컴포넌트 가이드 자동 생성
npm run generate-guides

# CSS 변수 자동 생성
npm run generate-css
```

## ❓ 문제 해결

### 일반적인 문제

#### 1. 의존성 설치 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 2. TypeScript 오류
```bash
# 타입 체크 실행
npm run type-check
```

#### 3. 빌드 오류
```bash
# 캐시 삭제 후 재빌드
npm run build -- --no-cache
```

#### 4. 개발 서버 문제
```bash
# 포트 변경
npm run dev -- -p 3001
```

### 브라우저 호환성
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🙏 감사의 말

- [shadcn/ui](https://ui.shadcn.com/) - 아름다운 컴포넌트 라이브러리
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 우선 CSS 프레임워크
- [Next.js](https://nextjs.org/) - React 프레임워크
- [Radix UI](https://www.radix-ui.com/) - 접근성 높은 UI 프리미티브
- [Lucide](https://lucide.dev/) - 아름다운 아이콘 라이브러리

## 🚀 추가 개발 아이디어

### 🎯 단기 목표
- [ ] 더 많은 컴포넌트 추가: shadcn/ui의 모든 컴포넌트
- [ ] 다크 모드 개선: 더 세밀한 다크 모드 지원
- [ ] 애니메이션 시스템: Framer Motion 통합
- [ ] 접근성 도구: 접근성 검사 도구 추가

### 📈 중기 목표
- [ ] 성능 모니터링: 컴포넌트 성능 측정
- [ ] 국제화: 다국어 지원
- [ ] 테마 저장: 로컬 스토리지에 테마 저장
- [ ] 컴포넌트 코드 복사: 클립보드 복사 기능

### 🌟 장기 목표
- [ ] 디자인 시스템 API: RESTful API 제공
- [ ] 플러그인 시스템: 확장 가능한 아키텍처
- [ ] 협업 기능: 팀 기반 테마 관리
- [ ] 버전 관리: 디자인 토큰 버전 관리 시스템

---

<div align="center">

**Design System Guide** - 체계적인 디자인 시스템 구축을 위한 종합 가이드

[시작하기](#-빠른-시작) • [문서 보기](/design-guide) • [컴포넌트 보기](/components) • [플레이그라운드](/playground)

</div>