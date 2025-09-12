import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PlatformLogosPage() {
  return (
    <>
    <div className="flex flex-col gap-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="flex items-center justify-center bg-slate-500/5 rounded-lg">
                    <img
                      src="/guide/images/brand/logo-signature-guide.png"
                      alt="시그니처 로고 가이드"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
