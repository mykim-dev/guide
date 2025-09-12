import { ScrollArea } from "@/components/ui/scroll-area";

export default function IntroductionPage() {
  return (
    <>
      <div className="flex flex-col gap-24">
        <div>
          <h2 className="text-2xl font-bold mb-2">목표</h2>
          <ul className="list-disc list-inside ml-2">
            <li>일관성 : 모든 제품에서 동일한 디자인 언어 사용</li>
            <li>효율성 : 재사용 가능한 컴포넌트로 개발 속도 향상</li>
            <li>접근성 : 모든 사용자가 사용할 수 있는 인터페이스 제공</li>
            <li>확장성 : 새로운 요구사항에 유연하게 대응</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">핵심 원칙</h2>
          <ul className="list-disc list-inside ml-2">
            <li>일관성 (Consistency) : 모든 UI 요소는 동일한 디자인 토큰을 사용하여 일관된 모습을 유지합니다.</li>
            <li>단순성 (Simplicity) : 불필요한 복잡성을 제거하고 사용자가 직관적으로 이해할 수 있는 인터페이스를 만듭니다.</li>
            <li>접근성 (Accessibility) : 모든 사용자가 제품을 사용할 수 있도록 접근성을 고려합니다.</li>
            <li>반응형 (Responsive) : 다양한 화면 크기에서 최적의 경험을 제공합니다.</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-1">디자인 토큰</h2>
          <p className="text-sm text-muted-foreground mb-2">디자인 토큰은 디자인 시스템의 기본 구성 요소입니다.</p>
          <ul className="list-disc list-inside ml-2">
            <li>색상 : 브랜드 색상과 기능적 색상</li>
            <li>타이포그래피 : 폰트 크기, 줄 높이, 글자 간격</li>
            <li>간격 : 여백과 패딩 값</li>
            <li>그림자 : 깊이와 계층 구조 표현</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-1">컴포넌트</h2>
          <p className="text-sm text-muted-foreground mb-2">재사용 가능한 UI 컴포넌트들을 제공합니다:</p>
          <ul className="list-disc list-inside ml-2">
            <li>기본 요소 : 버튼, 입력 필드, 라벨 등</li>
            <li>복합 요소 : 카드, 모달, 네비게이션 등</li>
            <li>레이아웃 : 그리드, 컨테이너, 플렉스박스 등</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-2">사용 방법</h2>
          <ul className="list-disc list-inside ml-2">
            <li>디자인 토큰 확인 : 색상, 타이포그래피, 간격 토큰을 먼저 확인하세요.</li>
            <li>컴포넌트 선택 : 필요한 컴포넌트를 찾아 사용하세요.</li>
            <li>커스터마이징 : 필요에 따라 테마 에디터를 사용해 커스터마이징하세요.</li>
            <li>테스트 : 플레이그라운드에서 다양한 설정을 테스트해보세요.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
