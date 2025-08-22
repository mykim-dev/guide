---
title: "Avatar"
description: "아바타 컴포넌트 사용 가이드"
---

# Avatar 컴포넌트

Avatar 컴포넌트는 사용자 프로필 이미지나 이니셜을 표시하는 UI 요소입니다.

## 기본 사용법

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function MyComponent() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
```

## 사용 예제

### 기본 아바타
```tsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

### 이미지가 없는 경우
```tsx
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### 다양한 크기
```tsx
<div className="flex items-center space-x-4">
  <Avatar className="h-6 w-6">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback className="text-xs">CN</AvatarFallback>
  </Avatar>
  <Avatar className="h-8 w-8">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback className="text-sm">CN</AvatarFallback>
  </Avatar>
  <Avatar className="h-10 w-10">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar className="h-12 w-12">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback className="text-lg">CN</AvatarFallback>
  </Avatar>
  <Avatar className="h-16 w-16">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback className="text-xl">CN</AvatarFallback>
  </Avatar>
</div>
```

### 사용자 목록
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    image: 'https://github.com/shadcn.png',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    image: '',
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    image: 'https://github.com/shadcn.png',
  },
];

function UserList() {
  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 상태 표시와 함께 사용
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const users = [
  { name: 'John Doe', status: 'online', image: 'https://github.com/shadcn.png' },
  { name: 'Jane Smith', status: 'away', image: '' },
  { name: 'Bob Johnson', status: 'offline', image: 'https://github.com/shadcn.png' },
];

function UserStatusList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="relative">
            <Avatar>
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
          </div>
          <div className="flex-1">
            <p className="font-medium">{user.name}</p>
            <Badge variant="secondary" className="text-xs capitalize">
              {user.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 그룹 아바타
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const groupMembers = [
  { name: 'John Doe', image: 'https://github.com/shadcn.png' },
  { name: 'Jane Smith', image: '' },
  { name: 'Bob Johnson', image: 'https://github.com/shadcn.png' },
  { name: 'Alice Brown', image: '' },
];

function GroupAvatar() {
  const displayMembers = groupMembers.slice(0, 3);
  const remainingCount = groupMembers.length - 3;

  return (
    <div className="flex -space-x-2">
      {displayMembers.map((member, index) => (
        <Avatar key={index} className="h-8 w-8 border-2 border-white">
          <AvatarImage src={member.image} alt={member.name} />
          <AvatarFallback className="text-xs">
            {member.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted border-2 border-white text-xs font-medium">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
```

### 프로필 카드
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function ProfileCard() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Senior Developer',
    image: 'https://github.com/shadcn.png',
    status: 'active',
  };

  return (
    <Card className="w-80">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="text-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Role</span>
          <Badge variant="secondary">{user.role}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
            {user.status}
          </Badge>
        </div>
        <Button className="w-full">Edit Profile</Button>
      </CardContent>
    </Card>
  );
}
```

### 커스텀 스타일링
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

<div className="flex items-center space-x-4">
  <Avatar className="h-12 w-12 ring-2 ring-primary">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  
  <Avatar className="h-12 w-12 border-4 border-dashed border-muted-foreground">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  
  <Avatar className="h-12 w-12 shadow-lg">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  
  <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback className="text-white">CN</AvatarFallback>
  </Avatar>
</div>
```

### 로딩 상태
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';

function LoadingAvatar() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // 이미지 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setImageSrc('https://github.com/shadcn.png');
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Avatar className="h-12 w-12">
      {isLoading ? (
        <AvatarFallback className="animate-pulse bg-muted">
          <div className="h-4 w-4 rounded-full bg-muted-foreground/20" />
        </AvatarFallback>
      ) : (
        <>
          <AvatarImage src={imageSrc} />
          <AvatarFallback>CN</AvatarFallback>
        </>
      )}
    </Avatar>
  );
}
```

## 접근성

Avatar 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 적절한 alt 텍스트 지원
- 스크린 리더 호환성
- 키보드 접근성
- 포커스 표시

## 모범 사례

1. **적절한 alt 텍스트**: 이미지에 대한 명확한 설명 제공
2. **이니셜 사용**: 이미지가 없을 때 사용자 이름의 이니셜 표시
3. **일관된 크기**: 애플리케이션 내에서 일관된 아바타 크기 사용
4. **상태 표시**: 온라인/오프라인 상태를 명확히 표시
5. **접근성 고려**: 스크린 리더 사용자를 위한 적절한 설명

## API Reference

### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |

### AvatarImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | 이미지 소스 URL |
| `alt` | `string` | - | 이미지 대체 텍스트 |
| `className` | `string` | - | 추가 CSS 클래스 |

### AvatarFallback Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 폴백 콘텐츠 |
