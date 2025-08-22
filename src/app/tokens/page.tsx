import { Navigation } from '@/components/layout/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { defaultColors, typographyTokens, spacingTokens } from '@/lib/tokens';

export default function TokensPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">디자인 토큰</h1>
          <p className="text-muted-foreground">
            디자인 시스템의 기본 구성 요소인 색상, 타이포그래피, 간격 토큰들을 확인하세요.
          </p>
        </div>

        <Tabs defaultValue="colors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">색상</TabsTrigger>
            <TabsTrigger value="typography">타이포그래피</TabsTrigger>
            <TabsTrigger value="spacing">간격</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(defaultColors).map(([category, scale]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">{category}</CardTitle>
                    <CardDescription>
                      {category} 색상 팔레트
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(scale).map(([shade, token]) => (
                        <div key={shade} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: token.value }}
                            />
                            <span className="text-sm font-mono">{token.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground font-mono">
                            {token.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(typographyTokens).map(([key, token]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="text-sm">{token.name}</CardTitle>
                    <CardDescription>{token.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="mb-4"
                      style={{
                        fontSize: token.fontSize,
                        lineHeight: token.lineHeight,
                        fontWeight: token.fontWeight,
                        letterSpacing: token.letterSpacing,
                      }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>Font Size: {token.fontSize}</div>
                      <div>Line Height: {token.lineHeight}</div>
                      <div>Font Weight: {token.fontWeight}</div>
                      {token.letterSpacing && (
                        <div>Letter Spacing: {token.letterSpacing}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spacing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(spacingTokens).map(([key, token]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="text-sm">{token.name}</CardTitle>
                    <CardDescription>{token.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className="bg-primary rounded"
                          style={{ width: token.value, height: '1rem' }}
                        />
                        <span className="text-sm font-mono">{token.value}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
