import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const characterGuidelines = [
  {
    title: '캐릭터 스타일',
    description: '플랫폼 캐릭터의 기본 스타일과 디자인 원칙을 확인하세요.',
    emoji: '🎭',
    features: ['일러스트 스타일', '색상 팔레트', '표현 방식']
  },
  {
    title: '포즈 가이드',
    description: '다양한 상황에서 사용할 수 있는 캐릭터 포즈입니다.',
    emoji: '🤝',
    features: ['인사 포즈', '작업 포즈', '휴식 포즈']
  },
  {
    title: '표정 변화',
    description: '감정과 상황에 따른 캐릭터 표정 변화를 확인하세요.',
    emoji: '😊',
    features: ['기본 표정', '감정 표현', '상황별 표정']
  },
  {
    title: '사용 가이드',
    description: '캐릭터를 올바르게 사용하기 위한 가이드라인입니다.',
    emoji: '📋',
    features: ['사용 원칙', '금지 사항', '다운로드']
  }
];

export default function PlatformCharactersPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {characterGuidelines.map((guideline, index) => (
          <Card key={index} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">{guideline.emoji}</span>
                </div>
                <div>
                  <CardTitle className="text-lg">{guideline.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm">
                {guideline.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {guideline.features.map((feature, featureIndex) => (
                  <Badge key={featureIndex} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>캐릭터 디자인 원칙</CardTitle>
            <CardDescription>
              플랫폼 캐릭터를 디자인할 때 따라야 할 기본 원칙입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">친근함</h4>
                <p className="text-sm text-muted-foreground">
                  캐릭터는 사용자에게 친근하고 접근하기 쉬운 느낌을 주어야 합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">일관성</h4>
                <p className="text-sm text-muted-foreground">
                  모든 캐릭터 변형은 동일한 디자인 언어와 스타일을 유지해야 합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">다양성</h4>
                <p className="text-sm text-muted-foreground">
                  다양한 상황과 감정을 표현할 수 있는 충분한 변형이 필요합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">확장성</h4>
                <p className="text-sm text-muted-foreground">
                  새로운 포즈나 표정을 추가할 수 있는 유연한 구조를 가져야 합니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
