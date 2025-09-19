import React from 'react';

export default function IntroductionPage() {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">디자인 시스템 소개</h2>
        <p className="text-muted-foreground mb-6">
          이 디자인 시스템은 일관성 있고 확장 가능한 사용자 인터페이스를 구축하기 위한 
          포괄적인 가이드라인과 컴포넌트를 제공합니다.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">핵심 원칙</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• 일관성: 모든 컴포넌트가 동일한 디자인 언어를 사용</li>
            <li>• 접근성: 모든 사용자가 쉽게 사용할 수 있도록 설계</li>
            <li>• 확장성: 새로운 요구사항에 유연하게 대응</li>
            <li>• 재사용성: 효율적인 개발을 위한 컴포넌트 기반 설계</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">주요 특징</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• UI 컴포넌트 제공</li>
            <li>• 토큰 기반 테마 시스템</li>
            <li>• 반응형 디자인 지원</li>
            <li>• TypeScript 완전 지원</li>
            <li>• 실시간 테마 커스터마이징</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">시작하기</h3>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            디자인 시스템을 사용하려면 다음 단계를 따르세요:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Foundations 섹션에서 디자인 토큰을 확인하세요</li>
            <li>Components 섹션에서 필요한 UI 컴포넌트를 찾아보세요</li>
            <li>Playground에서 컴포넌트를 실시간으로 테스트해보세요</li>
            <li>Demos로 브랜드에 맞는 테마를 커스터마이징하세요</li>
          </ol>
        </div>
      </div>
    </div>
  );
}