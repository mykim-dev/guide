---
title: "Progress"
description: "진행률 컴포넌트 사용 가이드"
---

# Progress 컴포넌트

Progress 컴포넌트는 작업의 진행 상태를 시각적으로 표시하는 UI 요소입니다.

## 기본 사용법

```tsx
import { Progress } from '@/components/ui/progress';

export function MyComponent() {
  return (
    <Progress value={33} />
  );
}
```

## 사용 예제

### 기본 진행률
```tsx
<Progress value={33} />
```

### 라벨과 함께 사용
```tsx
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label>Upload Progress</Label>
  <Progress value={75} />
</div>
```

### 제어된 컴포넌트
```tsx
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';

function ControlledProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-2">
      <Label>Loading: {progress}%</Label>
      <Progress value={progress} />
    </div>
  );
}
```

### 다양한 진행률 값
```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label>Low Progress: 25%</Label>
    <Progress value={25} />
  </div>
  <div className="space-y-2">
    <Label>Medium Progress: 50%</Label>
    <Progress value={50} />
  </div>
  <div className="space-y-2">
    <Label>High Progress: 75%</Label>
    <Progress value={75} />
  </div>
  <div className="space-y-2">
    <Label>Complete: 100%</Label>
    <Progress value={100} />
  </div>
</div>
```

### 애니메이션과 함께 사용
```tsx
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';

function AnimatedProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-2">
      <Label>Processing: {progress}%</Label>
      <Progress value={progress} className="transition-all duration-300" />
    </div>
  );
}
```

### 파일 업로드 진행률
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

function FileUploadProgress() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>File Upload Progress</Label>
        <Progress value={uploadProgress} />
        <p className="text-sm text-muted-foreground">
          {uploadProgress.toFixed(1)}% complete
        </p>
      </div>
      
      <Button 
        onClick={simulateUpload} 
        disabled={isUploading}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        {isUploading ? 'Uploading...' : 'Start Upload'}
      </Button>
    </div>
  );
}
```

### 다중 진행률
```tsx
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';

function MultipleProgress() {
  const [progresses, setProgresses] = useState({
    download: 0,
    processing: 0,
    upload: 0,
  });

  useEffect(() => {
    const timers = {
      download: setInterval(() => {
        setProgresses(prev => ({
          ...prev,
          download: Math.min(prev.download + 2, 100),
        }));
      }, 100),
      processing: setInterval(() => {
        setProgresses(prev => ({
          ...prev,
          processing: Math.min(prev.processing + 1, 100),
        }));
      }, 200),
      upload: setInterval(() => {
        setProgresses(prev => ({
          ...prev,
          upload: Math.min(prev.upload + 3, 100),
        }));
      }, 150),
    };

    return () => {
      Object.values(timers).forEach(clearInterval);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Download: {progresses.download}%</Label>
        <Progress value={progresses.download} />
      </div>
      <div className="space-y-2">
        <Label>Processing: {progresses.processing}%</Label>
        <Progress value={progresses.processing} />
      </div>
      <div className="space-y-2">
        <Label>Upload: {progresses.upload}%</Label>
        <Progress value={progresses.upload} />
      </div>
    </div>
  );
}
```

### 상태별 스타일링
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

function StatusProgress() {
  const [progress, setProgress] = useState(65);

  const getStatus = (value: number) => {
    if (value < 30) return { label: 'Low', variant: 'destructive' as const };
    if (value < 70) return { label: 'Medium', variant: 'secondary' as const };
    return { label: 'High', variant: 'default' as const };
  };

  const status = getStatus(progress);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Task Progress</Label>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>
      <Progress 
        value={progress} 
        className={
          progress < 30 ? 'bg-red-100' : 
          progress < 70 ? 'bg-yellow-100' : 
          'bg-green-100'
        }
      />
      <p className="text-sm text-muted-foreground">
        {progress}% complete
      </p>
    </div>
  );
}
```

### 인디케이터와 함께 사용
```tsx
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

function IndicatorProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'pending' | 'processing' | 'complete'>('pending');

  useEffect(() => {
    if (progress >= 100) {
      setStatus('complete');
    } else if (progress > 0) {
      setStatus('processing');
    }
  }, [progress]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const getIcon = () => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {getIcon()}
        <Label>Task Status</Label>
      </div>
      <Progress value={progress} />
      <p className="text-sm text-muted-foreground">
        {status === 'complete' ? 'Task completed successfully' : 
         status === 'processing' ? 'Processing...' : 
         'Waiting to start'}
      </p>
    </div>
  );
}
```

### 커스텀 스타일링
```tsx
import { Label } from '@/components/ui/label';

<div className="space-y-4">
  <div className="space-y-2">
    <Label>Default Progress</Label>
    <Progress value={60} />
  </div>
  
  <div className="space-y-2">
    <Label>Custom Colored Progress</Label>
    <Progress 
      value={80} 
      className="bg-blue-100 [&>div]:bg-blue-500"
    />
  </div>
  
  <div className="space-y-2">
    <Label>Large Progress</Label>
    <Progress 
      value={40} 
      className="h-4 [&>div]:bg-gradient-to-r from-purple-500 to-pink-500"
    />
  </div>
</div>
```

## 접근성

Progress 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 적절한 ARIA 속성 (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`)
- 스크린 리더 호환성
- 키보드 접근성
- 라벨 연결 지원

## 모범 사례

1. **명확한 라벨링**: 진행률이 무엇을 나타내는지 명확히 표시
2. **적절한 업데이트**: 진행률을 적절한 간격으로 업데이트
3. **상태 피드백**: 완료, 진행 중, 오류 등의 상태를 명확히 표시
4. **시각적 구분**: 진행률 레벨에 따른 색상 구분
5. **접근성 고려**: 스크린 리더 사용자를 위한 적절한 설명

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | 진행률 값 (0-100) |
| `max` | `number` | `100` | 최대값 |
| `className` | `string` | - | 추가 CSS 클래스 |
