/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorSelectProps {
  value?: string;
  onChange?: (colorName: string, colorValue: string) => void;
  label?: string;
  className?: string;
  colorList?: Record<string, any>;
}

export function ColorSelect({ value, onChange, label = "색상 선택", className = "", colorList }: ColorSelectProps) {
  const [selectedColor, setSelectedColor] = useState(value || "blue");

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    if (onChange && colorList) {
      // colorList에서 선택된 색상의 500 값을 가져옴
      const selectedColorPalette = colorList[colorName];
      if (selectedColorPalette && selectedColorPalette['500']) {
        const colorValue = selectedColorPalette['500'];
        onChange(colorName, colorValue);
      }
    }
  };

  // value prop이 변경되면 내부 상태도 업데이트
  React.useEffect(() => {
    if (value && value !== selectedColor) {
      setSelectedColor(value);
    }
  }, [value, selectedColor]);

  // colorList가 없으면 빈 배열 반환
  if (!colorList) {
    return (
      <div className={`space-y-3 ${className}`}>
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-sm text-gray-500">색상 목록이 제공되지 않았습니다.</p>
      </div>
    );
  }

  // colorList에서 색상 목록 생성
  const availableColors = Object.entries(colorList).map(([colorName, colorPalette]) => ({
    name: colorName,
    label: colorName.charAt(0).toUpperCase() + colorName.slice(1), // 첫 글자 대문자
    colorValue: colorPalette?.['500'] || '#000000'
  }));

  return (
    <div className={cn("space-y-3", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      <RadioGroup value={selectedColor} onValueChange={handleColorChange} className="grid grid-cols-8 gap-2">
        {availableColors.map((color) => {
          const isSelected = selectedColor === color.name;
          return (
            <div key={color.name} className="flex flex-col items-center space-y-1">
              <RadioGroupItem 
                value={color.name} 
                id={color.name}
                className="peer sr-only"
              />
              <Label 
                htmlFor={color.name}
                className={cn(
                  "flex flex-col items-center space-y-1 cursor-pointer group transition-all duration-200",
                  "hover:scale-105 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-lg p-1"
                )}
              >
                <div
                  className={cn(
                    "size-7 rounded-full border-2",
                    isSelected 
                      ? 'border-primary ring-2' 
                      : 'border-border'
                  )}
                  style={{ backgroundColor: color.colorValue }}
                />
                {/* <span className={cn(
                  "text-xs transition-colors text-center leading-tight",
                  isSelected ? 'text-primary font-medium' : 'text-muted-foreground'
                )}>
                  {color.label}
                </span> */}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}