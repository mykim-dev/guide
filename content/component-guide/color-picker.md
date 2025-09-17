---
title: "ColorPicker"
description: "ColorPicker는 다양한 색상 포맷을 지원하는 색상 선택기입니다."
---

# ColorPicker 컴포넌트

ColorPicker는 다양한 색상 포맷을 지원하는 색상 선택기입니다.

## 기본 사용법

```tsx
import { ColorPicker } from '@/components/ui/color-picker';

export function MyComponent() {
  return (
    <ColorPicker>기본 ColorPicker</ColorPicker>
  );
}
```

ColorPicker는 문자열 타입의 변수를 value로 바인딩해야 합니다.

### 기본값이 있는 경우

:::component-example ColorPickerBasicExample
```tsx
import { ColorPicker } from "@/components/ui/color-picker";

export function ColorPickerBasic() {
  const [color1, setColor1] = React.useState("#409EFF");
  const [color2, setColor2] = React.useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-32">기본값이 있는 경우</span>
        <ColorPicker value={color1} onChange={setColor1} />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-32">기본값이 없는 경우</span>
        <ColorPicker value={color2} onChange={setColor2} placeholder="색상을 선택하세요" />
      </div>
    </div>
  );
}
```

<div>
  <ColorPicker value="#409EFF" onChange={() => {}} />
</div>
:::

## Alpha 채널

ColorPicker는 Alpha 채널 선택을 지원합니다. Alpha 선택을 활성화하려면 `showAlpha` 속성을 추가하세요.

:::component-example ColorPickerAlphaExample
```tsx
import { ColorPicker } from "@/components/ui/color-picker";

export function ColorPickerAlpha() {
  const [color, setColor] = React.useState("rgba(19, 206, 102, 0.8)");

  return (
    <ColorPicker 
      value={color} 
      onChange={setColor}
      showAlpha 
    />
  );
}
```

<div>
  <ColorPicker value="rgba(19, 206, 102, 0.8)" onChange={() => {}} showAlpha />
</div>
:::

## 사전 정의된 색상

ColorPicker는 사전 정의된 색상 옵션을 지원합니다.

:::component-example ColorPickerPredefineExample
```tsx
import { ColorPicker } from "@/components/ui/color-picker";

export function ColorPickerPredefine() {
  const [color, setColor] = React.useState("rgba(255, 69, 0, 0.68)");
  
  const predefineColors = [
    "#ff4500",
    "#ff8c00", 
    "#ffd700",
    "#90ee90",
    "#00ced1",
    "#1e90ff",
    "#c71585",
    "rgba(255, 69, 0, 0.68)",
    "rgb(255, 120, 0)",
    "#c7158577",
  ];

  return (
    <ColorPicker 
      value={color} 
      onChange={setColor}
      showAlpha 
      predefine={predefineColors} 
    />
  );
}
```

<div>
  <ColorPicker value="rgba(255, 69, 0, 0.68)" onChange={() => {}} showAlpha predefine={["#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585"]} />
</div>
:::

## 크기

ColorPicker는 다양한 크기를 지원합니다:

### Large

:::component-example ColorPickerLargeExample
```tsx
<ColorPicker value="#409EFF" onChange={() => {}} size="large" />
```

<div>
<ColorPicker value="#409EFF" onChange={() => {}} size="large" />
</div>
:::

### Default

:::component-example ColorPickerDefaultExample
```tsx
<ColorPicker value="#409EFF" onChange={() => {}} />
```

<div>
<ColorPicker value="#409EFF" onChange={() => {}} />
</div>
:::

### Small

:::component-example ColorPickerSmallExample
```tsx
<ColorPicker value="#409EFF" onChange={() => {}} size="small" />
```

<div>
<ColorPicker value="#409EFF" onChange={() => {}} size="small" />
</div>
:::

## 색상 포맷

다양한 색상 포맷을 지원합니다.

### HEX 포맷

:::component-example ColorPickerHexExample
```tsx
<ColorPicker value="#409EFF" onChange={() => {}} colorFormat="hex" />
```

<div>
<ColorPicker value="#409EFF" onChange={() => {}} colorFormat="hex" />
</div>
:::

### RGB 포맷

:::component-example ColorPickerRgbExample
```tsx
<ColorPicker value="rgb(64, 158, 255)" onChange={() => {}} colorFormat="rgb" />
```

<div>
<ColorPicker value="rgb(64, 158, 255)" onChange={() => {}} colorFormat="rgb" />
</div>
:::

## 비활성화

:::component-example ColorPickerDisabledExample
```tsx
<ColorPicker value="#409EFF" onChange={() => {}} disabled />
```

<div>
<ColorPicker value="#409EFF" onChange={() => {}} disabled />
</div>
:::

## API

### Props

| 이름 | 설명 | 타입 | 기본값 |
|------|------|------|--------|
| value | 바인딩 값 | string | "#409EFF" |
| onChange | 값이 변경될 때 호출되는 함수 | (color: string) => void | - |
| showAlpha | Alpha 슬라이더를 표시할지 여부 | boolean | false |
| size | ColorPicker의 크기 | "small" \| "default" \| "large" | "default" |
| disabled | ColorPicker를 비활성화할지 여부 | boolean | false |
| predefine | 사전 정의된 색상 옵션 | string[] | [] |
| colorFormat | v-model의 색상 포맷 | "hex" \| "rgb" \| "hsl" \| "hsv" | "hex" |
| className | 커스텀 클래스 이름 | string | - |
| placeholder | 플레이스홀더 텍스트 | string | "색상을 선택하세요" |

### 이벤트

| 이름 | 설명 | 타입 |
|------|------|------|
| onChange | 입력 값이 변경될 때 트리거 | (color: string) => void |

## 특징

- **HSV 색상 공간**: 직관적인 색상 선택을 위해 HSV 색상 공간을 사용합니다
- **다양한 포맷 지원**: HEX, RGB, HSL, HSV 포맷을 지원합니다
- **Alpha 채널**: 투명도 조절을 위한 Alpha 채널을 지원합니다
- **사전 정의된 색상**: 자주 사용되는 색상을 빠르게 선택할 수 있습니다
- **반응형 디자인**: 다양한 화면 크기에 적응합니다
- **접근성**: 키보드 네비게이션과 스크린 리더를 지원합니다
