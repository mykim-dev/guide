import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CircleX } from 'lucide-react';
import Image from 'next/image';

export default function BrandPage() {
  return (
    <>
      <div className="flex flex-col gap-24">
        {/* 시그니처 로고 */}
        <div>
          <h2 className="text-2xl font-bold mb-2">시그니처 로고</h2>
          <p className="text-sm text-muted-foreground mb-6">퀸텟시스템즈의 중심이 되는 대표 로고입니다. 대·내외 다양한 커뮤니케이션에 최우선으로 사용되어야 하며, 단독으로 표기하는 것을 원칙으로 하고 있습니다.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">로고 가이드</CardTitle>
                <CardDescription>로고 사용 시 준수해야 할 가이드라인</CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9} className="flex items-center justify-center bg-slate-500/5 rounded-lg">
                  <img
                    src="/guide/images/brand/logo-signature-guide.png"
                    alt="시그니처 로고 가이드"
                  />
                </AspectRatio>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">시그니처 로고</CardTitle>
                <CardDescription>공식 브랜드 시그니처 로고</CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9} className="flex items-center justify-center bg-slate-500/5 rounded-lg">
                  <img
                    src="/guide/images/brand/logo-signature.png"
                    alt="시그니처 로고"
                  />
                </AspectRatio>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 심볼 로고 */}
        <div>
          <h2 className="text-2xl font-bold mb-2">심볼 로고</h2>
          <p className="text-sm text-muted-foreground mb-6">브랜드의 핵심 이미지를 간결하게 표현한 심볼형 로고입니다. 제한된 공간이나 아이콘 형태로 활용할 때 적합하며, 브랜드 로고와 동일한 가이드라인을 따라야 합니다.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">로고 가이드</CardTitle>
                <CardDescription>로고 사용 시 준수해야 할 가이드라인</CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9} className="flex items-center justify-center bg-slate-500/5 rounded-lg">
                  <img
                    src="/guide/images/brand/logo-symbol-guide.png"
                    alt="심볼 로고 가이드"
                  />
                </AspectRatio>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">심볼 로고</CardTitle>
                <CardDescription>공식 브랜드 심볼 로고</CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9} className="flex items-center justify-center bg-slate-500/5 rounded-lg">
                  <img
                    src="/guide/images/brand/logo-symbol.png"
                    alt="심볼 로고"
                  />
                </AspectRatio>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 브랜드 컬러 */}
        <div>
          <h2 className="text-2xl font-bold mb-2">브랜드 컬러</h2>
          <p className="text-sm text-muted-foreground mb-6">퀸텟시스템즈의 정체성을 가장 잘 드러내는 색상 체계입니다. 로고, 솔루션, 홍보물 등 모든 시각적 요소에 일관되게 적용되어야 합니다.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            <div className="flex flex-col justify-between px-10 py-10 gap-10 rounded-lg text-background bg-[#C33D2E]">
              <div>Quintet Red</div>
              <div>#C33D2E</div>
            </div>
            <div className="flex flex-col justify-between px-10 py-10 gap-10 rounded-lg text-background bg-[#302927]">
              <div className="">Quintet Black</div>
              <div className="">#302927</div>
            </div>
          </div>
        </div>

        {/* 컬러 적용 우선순위 */}
        <div>
          <h2 className="text-2xl font-bold mb-2">컬러 적용 우선순위</h2>
          <p className="text-sm text-muted-foreground mb-6">브랜드 컬러 적용 시 우선순위를 명확히 정해, 상황에 따라 가장 적합한 색상을 사용할 수 있도록 기준을 제시합니다.</p>
          
          <div className="grid grid-cols-1 gap-10 mb-8">
            <div className="flex items-center justify-center bg-background border rounded-lg p-20">
              <img
                src="/guide/images/brand/logo-signature.png"                
                alt=""
              />
            </div>
          </div>
        </div>

        {/* 모노로고 */}
        <div>
          <h2 className="text-2xl font-bold mb-2">모노로고</h2>
          <p className="text-sm text-muted-foreground mb-6">단색 인쇄나 제한된 환경에서 활용할 수 있는 흑백 및 단색 버전 로고입니다. 컬러 사용이 불가능한 경우를 대비해 준비된 대체안입니다.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            <AspectRatio ratio={16 / 9} className="flex items-center justify-center bg-background border rounded-lg">
              <img
                src="/guide/images/brand/logo-mono.png"
                alt="모노로고"
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="flex items-center justify-center bg-foreground border rounded-lg">
              <img
                src="/guide/images/brand/logo-mono2.png"
                alt="모노로고"
              />
            </AspectRatio>
          </div>
        </div>

        {/* 사용 가이드 */}
        <div>
          <h2 className="text-2xl font-bold mb-2">사용 가이드</h2>
          <p className="text-sm text-muted-foreground mb-6">브랜드 로고의 지나친 변형과 왜곡은 브랜드 아이덴티티의 일관성을 저해할 수 있으므로 사용 시 주의를 요합니다.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            <div className="guide-error flex flex-col items-start gap-4 p-4 bg-slate-500/5 rounded-xl">
              <p className="flex items-center gap-2"><CircleX className="text-destructive" />로고의 정해진 비율을 임의로 왜곡하지 마세요.</p>
              <img
                src="/guide/images/brand/logo-error.png"
                alt=""
              />
            </div>
            <div className="guide-error flex flex-col items-start gap-4 p-4 bg-slate-500/5 rounded-xl">
              <p className="flex items-center gap-2"><CircleX className="text-destructive" />로고를 서로 조합하지마세요.</p>
              <img
                src="/guide/images/brand/logo-error2.png"
                alt=""
              />
            </div>
            <div className="guide-error flex flex-col items-start gap-4 p-4 bg-slate-500/5 rounded-xl">
              <p className="flex items-center gap-2"><CircleX className="text-destructive" />로고의 임의로 자르지 마세요.</p>
              <img
                src="/guide/images/brand/logo-error3.png"
                alt=""
              />
            </div>
            <div className="guide-error flex flex-col items-start gap-4 p-4 bg-slate-500/5 rounded-xl">
              <p className="flex items-center gap-2"><CircleX className="text-destructive" />로고의 요소들을 임의로 조합하지 마세요.</p>
              <img
                src="/guide/images/brand/logo-error4.png"
                alt=""
              />
            </div>
            <div className="guide-error flex flex-col items-start gap-4 p-4 bg-slate-500/5 rounded-xl">
              <p className="flex items-center gap-2"><CircleX className="text-destructive" />로고 테두리에 시각적 효과를 적용하지 마세요.</p>
              <img
                src="/guide/images/brand/logo-error5.png"
                alt=""
              />
            </div>
            <div className="guide-error flex flex-col items-start gap-4 p-4 bg-slate-500/5 rounded-xl">
              <p className="flex items-center gap-2"><CircleX className="text-destructive" />로고를 임의로 비슷하게 만들지 마세요.</p>
              <img
                src="/guide/images/brand/logo-error6.png"
                alt=""
              />
            </div>
            <div className="guide-error flex flex-col items-start gap-4 p-4 bg-slate-500/5 rounded-xl">
              <p className="flex items-center gap-2"><CircleX className="text-destructive" />임의로 컬러를 조합하지 마세요.</p>
              <img
                src="/guide/images/brand/logo-error7.png"
                alt=""
              />
            </div>
            <div className="guide-error flex flex-col items-start gap-4 p-4 bg-slate-500/5 rounded-xl">
              <p className="flex items-center gap-2"><CircleX className="text-destructive" />로고에 임의로 그라디언트 효과를 사용하지 마세요.</p>
              <img
                src="/guide/images/brand/logo-error8.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
