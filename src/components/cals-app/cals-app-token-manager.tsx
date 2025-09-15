'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { Textarea } from '@/components/ui/textarea';
import { CheckIcon, RefreshCcwIcon, Copy, Save, Settings } from 'lucide-react';
import { oklchToHex } from '@/lib/utils/color-utils';
import { DEFAULT_TOKENS } from '@/hooks/use-theme-editor';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CalsAppTokenManagerProps {
  inputValues: Record<string, string>;
  colorTokensAsHex: Record<string, string>;
  colorOptions: Array<{ name: string; label: string; value: string }>;
  customerColorOptions: Array<{ name: string; label: string; value: string }>;
  tokenCode: string;
  setTokenCode: (code: string) => void;
  updateToken: (tokenKey: string, value: string) => void;
  handleSaveUserTokens: () => void;
  handleResetUserTokens: () => void;
  handleSaveTokenCode: () => void;
  handleResetTokenCode: () => void;
  handleSaveTokenCodeToStorage: () => void;
  handleCopyTokenCode: () => void;
  handleApplyToken: (tokenKey: string) => void;
  handleResetToken: (tokenKey: string) => void;
  handleExportTokens: () => void;
}

export function CalsAppTokenManager({
  inputValues,
  colorTokensAsHex,
  colorOptions,
  customerColorOptions,
  tokenCode,
  setTokenCode,
  updateToken,
  handleSaveUserTokens,
  handleResetUserTokens,
  handleSaveTokenCode,
  handleResetTokenCode,
  handleSaveTokenCodeToStorage,
  handleCopyTokenCode,
  handleApplyToken,
  handleResetToken,
  handleExportTokens,
}: CalsAppTokenManagerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full cursor-pointer" title='토큰 관리'>
          <Settings />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle>토큰 관리</SheetTitle>
          <SheetDescription>변경사항은 이 페이지에서만 미리보기됩니다.</SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="settings" className="w-full px-4">
          <TabsList className="w-full">
            <TabsTrigger value="settings">설정</TabsTrigger>
            <TabsTrigger value="edit">편집</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            {/* 액션 버튼들 */}
            <div className="flex items-center justify-end gap-2">
              <Button onClick={handleSaveUserTokens} size="sm">
                <CheckIcon /> 적용
              </Button>
              <Button onClick={handleResetUserTokens} variant="outline" size="sm">
                <RefreshCcwIcon /> 초기화
              </Button>
            </div>
            <ScrollArea className="h-[calc(100svh-250px)]">
              <div className="flex flex-col gap-4 pr-4">
                {Object.entries(colorTokensAsHex)
                  .map(([tokenKey, hexValue]) => (
                    tokenKey === '--primary' ? (
                      <div key={tokenKey} className="flex flex-col items-center gap-1">
                        <Label htmlFor={tokenKey} className="w-full text-xs">
                          {tokenKey}
                        </Label>
                        <div className="w-full flex gap-2">
                          <ColorPicker
                            value={inputValues['--primary'] || oklchToHex(DEFAULT_TOKENS['--primary'])}
                            onChange={(color) => updateToken('--primary', color)}
                            size="small"
                            predefine={colorOptions.map(color => oklchToHex(color.value))}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
                            onClick={() => handleApplyToken('--primary')}
                            title="Primary 색상 적용"
                          >
                            <CheckIcon className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
                            onClick={() => handleResetToken('--primary')}
                            title="Primary 색상 초기화"
                          >
                            <RefreshCcwIcon className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ) : tokenKey === '--customer' ? (
                      <div key={tokenKey} className="flex flex-col items-center gap-1">
                        <Label htmlFor={tokenKey} className="w-full text-xs">
                          {tokenKey}
                        </Label>
                        <div className="w-full flex gap-2">
                          <ColorPicker
                            value={inputValues['--customer'] || oklchToHex(DEFAULT_TOKENS['--customer'])}
                            onChange={(color) => updateToken('--customer', color)}
                            size="small"
                            predefine={customerColorOptions.map(color => oklchToHex(color.value))}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
                            onClick={() => handleApplyToken('--customer')}
                            title="Customer 색상 적용"
                          >
                            <CheckIcon className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
                            onClick={() => handleResetToken('--customer')}
                            title="Customer 색상 초기화"
                          >
                            <RefreshCcwIcon className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div key={tokenKey} className="flex flex-col gap-1">
                        <Label htmlFor={tokenKey} className="w-full text-xs">
                          {tokenKey}
                        </Label>
                        <div className="flex gap-2 flex-1">
                          <ColorPicker
                            value={inputValues[tokenKey] || hexValue}
                            onChange={(color) => updateToken(tokenKey, color)}
                            size="small"
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
                            onClick={() => handleApplyToken(tokenKey)}
                            title={`${tokenKey} 토큰 적용`}
                          >
                            <CheckIcon className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
                            onClick={() => handleResetToken(tokenKey)}
                            title={`${tokenKey} 토큰 초기화`}
                          >
                            <RefreshCcwIcon className="size-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="edit" className="space-y-4">
            {/* 액션 버튼들 */}
            <div className="flex items-center justify-end gap-2">
              <Button onClick={handleSaveTokenCode} size="sm">
                <CheckIcon /> 적용
              </Button>
              <Button onClick={handleExportTokens} variant="outline" size="sm">
                <Save /> 다운로드
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyTokenCode}>
                <Copy /> Copy
              </Button>
              <Button onClick={handleResetTokenCode} variant="outline" size="sm">
                <RefreshCcwIcon /> 초기화
              </Button>
            </div>
            <Textarea
              value={tokenCode}
              onChange={(e) => setTokenCode(e.target.value)}
              placeholder="토큰 JSON 코드를 입력하세요..."
              className="h-[calc(100svh-350px)] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              JSON 형식으로 토큰을 직접 편집할 수 있습니다.
              <br />• <strong>적용</strong>: 변경사항을 즉시 미리보기에 반영합니다.
              <br />• <strong>다운로드</strong>: 토큰을 JSON 파일로 다운로드합니다.
              <br />• <strong>Copy</strong>: 토큰 코드를 클립보드에 복사합니다.
              <br />• <strong>초기화</strong>: 기본값으로 되돌립니다.
            </p>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
