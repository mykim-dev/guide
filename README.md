# Design System Guide

체계적인 디자인 시스템을 구축하고 관리할 수 있는 종합적인 가이드입니다. 디자인 토큰부터 컴포넌트 라이브러리, 그리고 실시간 테마 에디터까지 모든 것을 제공합니다.

## 🚀 주요 기능

### 1. 디자인 토큰 시스템
- **색상 토큰**: 브랜드 색상과 기능적 색상 체계
- **타이포그래피 토큰**: 폰트 크기, 줄 높이, 글자 간격
- **간격 토큰**: 여백과 패딩 값 체계
- **Tailwind CSS 통합**: 자동 설정 생성

### 2. 컴포넌트 라이브러리
- **shadcn/ui 기반**: 현대적이고 접근성 높은 컴포넌트
- **다양한 컴포넌트**: 버튼, 입력 필드, 카드, 모달 등
- **일관된 디자인**: 통일된 디자인 언어

### 3. Markdown 기반 문서화
- **디자인 가이드**: 디자인 원칙과 가이드라인
- **컴포넌트 가이드**: 각 컴포넌트의 사용법과 예제
- **실시간 렌더링**: Markdown을 실시간으로 렌더링

### 4. 플레이그라운드
- **실시간 테스트**: 컴포넌트를 실시간으로 테스트
- **속성 조정**: 다양한 속성을 실시간으로 변경
- **코드 생성**: 설정에 따른 코드 자동 생성

### 5. 테마 에디터
- **색상 커스터마이징**: 색상 팔레트 실시간 편집
- **미리보기**: 변경사항 실시간 미리보기
- **설정 내보내기**: Tailwind CSS 설정 자동 생성

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Markdown**: react-markdown
- **Icons**: Lucide React
- **State Management**: React Context

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 브라우저에서 확인
```
http://localhost:3000
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
│   └── tokens/             # 디자인 토큰
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── docs/               # 문서 관련 컴포넌트
│   └── layout/             # 레이아웃 컴포넌트
├── lib/
│   ├── tokens/             # 디자인 토큰 정의
│   ├── themes/             # 테마 시스템
│   ├── utils/              # 유틸리티 함수
│   └── markdown.ts         # Markdown 처리
└── types/                  # TypeScript 타입 정의

content/
├── design-guide/           # 디자인 가이드 Markdown
└── component-guide/        # 컴포넌트 가이드 Markdown
```

## 🎨 디자인 토큰

### 색상 시스템
- **Primary**: 브랜드 메인 색상
- **Secondary**: 보조 색상
- **Neutral**: 중성 색상
- **Success**: 성공 상태
- **Warning**: 경고 상태
- **Error**: 오류 상태
- **Info**: 정보 상태

### 타이포그래피
- **Display**: 큰 제목용 (2XL, XL, LG, MD, SM)
- **Heading**: 제목용 (XL, LG, MD, SM)
- **Body**: 본문용 (XL, LG, MD, SM)
- **Label**: 라벨용 (LG, MD, SM)

### 간격
- **0-96**: 4px 단위로 구성된 간격 체계
- **px**: 1px 간격
- **0.5-3.5**: 소수점 간격

## 🔧 사용 방법

### 1. 디자인 토큰 확인
- `/tokens` 페이지에서 기본 토큰들을 확인
- 색상, 타이포그래피, 간격 토큰 체계 이해

### 2. 컴포넌트 탐색
- `/components` 페이지에서 사용 가능한 컴포넌트 확인
- 각 컴포넌트의 다양한 변형과 사용법 학습

### 3. 문서 읽기
- `/design-guide`에서 디자인 원칙과 가이드라인 확인
- `/component-guide`에서 각 컴포넌트의 상세 사용법 확인

### 4. 플레이그라운드에서 테스트
- `/playground`에서 컴포넌트를 실시간으로 테스트
- 다양한 속성 조합을 시도해보기

### 5. 테마 커스터마이징
- `/theme-editor`에서 색상 팔레트 커스터마이징
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

### 새로운 토큰 추가
1. `src/lib/tokens/`에 토큰 정의 파일 생성
2. `src/lib/tokens/index.ts`에 토큰 추가
3. 관련 페이지에 토큰 표시 추가

### 새로운 문서 추가
1. `content/design-guide/` 또는 `content/component-guide/`에 Markdown 파일 생성
2. Front matter에 title과 description 추가
3. 자동으로 페이지에 반영됨

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🙏 감사의 말

- [shadcn/ui](https://ui.shadcn.com/) - 아름다운 컴포넌트 라이브러리
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 우선 CSS 프레임워크
- [Next.js](https://nextjs.org/) - React 프레임워크
- [Radix UI](https://www.radix-ui.com/) - 접근성 높은 UI 프리미티브



## 추가 개발 아이디어
- 더 많은 컴포넌트 추가: shadcn/ui의 모든 컴포넌트
- 다크 모드 개선: 더 세밀한 다크 모드 지원
- 애니메이션 시스템: Framer Motion 통합
- 접근성 도구: 접근성 검사 도구 추가
- 성능 모니터링: 컴포넌트 성능 측정
- 국제화: 다국어 지원
- 테마 저장: 로컬 스토리지에 테마 저장
- 컴포넌트 코드 복사: 클립보드 복사 기능