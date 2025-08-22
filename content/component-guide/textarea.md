---
title: "Textarea"
description: "텍스트 영역 컴포넌트 사용 가이드"
---

# Textarea 컴포넌트

텍스트 영역은 여러 줄의 텍스트를 입력받는 UI 요소입니다.

## 기본 사용법

```tsx
import { Textarea } from '@/components/ui/textarea';

export function MyComponent() {
  return (
    <Textarea placeholder="Enter your message here" />
  );
}
```

## 사용 예제

### 기본 텍스트 영역
```tsx
<Textarea placeholder="Tell us about yourself..." />
```

### 라벨과 함께 사용
```tsx
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea
    id="message"
    placeholder="Enter your message here..."
  />
</div>
```

### 크기 조절
```tsx
<div className="space-y-4">
  <Textarea placeholder="Default size" />
  <Textarea 
    placeholder="Large textarea" 
    className="min-h-[200px] resize-none" 
  />
  <Textarea 
    placeholder="Small textarea" 
    className="min-h-[80px] resize-none" 
  />
</div>
```

### 읽기 전용 모드
```tsx
<Textarea
  value="This is a read-only textarea. Users cannot edit this content."
  readOnly
  className="resize-none"
/>
```

### 비활성화 상태
```tsx
<Textarea
  placeholder="This textarea is disabled"
  disabled
/>
```

### 제어된 컴포넌트
```tsx
import { useState } from 'react';

function ControlledTextarea() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Type something..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-sm text-muted-foreground">
        Character count: {value.length}
      </p>
    </div>
  );
}
```

### 유효성 검사
```tsx
import { useState } from 'react';

function ValidationExample() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    if (value.length < 10) {
      setError('Message must be at least 10 characters long');
    } else {
      setError('');
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Enter your message (minimum 10 characters)"
        value={message}
        onChange={handleChange}
        className={error ? 'border-red-500' : ''}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
```

### 폼과 함께 사용
```tsx
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Your email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Your message..."
          className="min-h-[120px]"
        />
      </div>
      <Button type="submit">Send Message</Button>
    </form>
  );
}
```

### 자동 크기 조절
```tsx
import { useRef, useEffect } from 'react';

function AutoResizeTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <Textarea
      ref={textareaRef}
      placeholder="This textarea will automatically resize..."
      onChange={adjustHeight}
      className="resize-none overflow-hidden"
    />
  );
}
```

## 접근성

텍스트 영역 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 적절한 라벨 연결 (`htmlFor` 속성)
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 포커스 표시
- 읽기 전용 상태 지원

## 모범 사례

1. **명확한 라벨링**: 모든 텍스트 영역에 명확한 라벨 제공
2. **적절한 플레이스홀더**: 사용자가 무엇을 입력해야 하는지 명확히 안내
3. **적절한 크기**: 내용에 맞는 최소 높이 설정
4. **유효성 검사**: 실시간 피드백 제공
5. **접근성 고려**: 스크린 리더 사용자를 위한 적절한 설명

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 텍스트 영역 비활성화 |
| `readOnly` | `boolean` | `false` | 읽기 전용 모드 |
| `required` | `boolean` | `false` | 필수 필드 표시 |
| `value` | `string` | - | 제어된 컴포넌트의 값 |
| `onChange` | `(e: ChangeEvent<HTMLTextAreaElement>) => void` | - | 값 변경 핸들러 |
| `rows` | `number` | - | 기본 행 수 |
| `cols` | `number` | - | 기본 열 수 |
| `className` | `string` | - | 추가 CSS 클래스 |
