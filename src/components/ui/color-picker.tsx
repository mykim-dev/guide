import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onSave?: (name: string) => void;
  title?: string;
  showSaveButton?: boolean;
}

export function ColorPicker({ 
  color, 
  onChange, 
  onSave, 
  title = "사용자 색상 선택", 
  showSaveButton = false 
}: ColorPickerProps) {
  const [themeName, setThemeName] = useState('');

  const handleSave = () => {
    if (themeName.trim() && onSave) {
      onSave(themeName.trim());
      setThemeName('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <HexColorPicker 
            color={color} 
            onChange={onChange}
            className="w-full max-w-[200px]"
          />
          
          <div className="w-full space-y-2">
            <Label htmlFor="color-input">색상 코드</Label>
            <HexColorInput 
              id="color-input"
              color={color} 
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md text-center font-mono"
              prefixed
            />
          </div>

          {showSaveButton && (
            <div className="w-full space-y-2">
              <Label htmlFor="theme-name">테마 이름</Label>
              <div className="flex gap-2">
                <Input
                  id="theme-name"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  placeholder="테마 이름을 입력하세요"
                  className="flex-1"
                />
                <Button 
                  onClick={handleSave}
                  disabled={!themeName.trim()}
                  size="sm"
                >
                  저장
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
