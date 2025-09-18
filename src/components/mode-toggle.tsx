'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/lib/themes/theme-provider';
import { cn } from '@/lib/utils';

interface ModeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

// 테마 옵션 상수
const THEME_OPTIONS = [
  { value: 'light' as const, label: '라이트', icon: Sun },
  { value: 'dark' as const, label: '다크', icon: Moon },
  { value: 'system' as const, label: '시스템', icon: Monitor },
] as const;

// 테마 아이템 컴포넌트
const ThemeMenuItem = React.memo(function ThemeMenuItem({
  option,
  isActive,
  onSelect,
}: {
  option: typeof THEME_OPTIONS[number];
  isActive: boolean;
  onSelect: (theme: 'light' | 'dark' | 'system') => void;
}) {
  const Icon = option.icon;

  return (
    <DropdownMenuItem
      onClick={() => onSelect(option.value)}
      className={cn(
        'cursor-pointer transition-colors',
        isActive && 'bg-accent text-accent-foreground'
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      {option.label}
    </DropdownMenuItem>
  );
});

ThemeMenuItem.displayName = 'ThemeMenuItem';

export const ModeToggle = React.memo(function ModeToggle({
  className,
  showLabel = false,
  variant = 'outline',
  size = 'icon'
}: ModeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 현재 테마 정보를 메모이제이션
  const currentTheme = useMemo(() =>
    THEME_OPTIONS.find(option => option.value === theme) || THEME_OPTIONS[0],
    [theme]
  );

  // 테마 변경 핸들러를 메모이제이션
  const handleThemeChange = useCallback((newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  }, [setTheme]);

  // 로딩 상태 렌더링
  if (!mounted) {
    return (
      <Button variant={variant} size={size} disabled className={className}>
        <Sun className="h-4 w-4" />
        {showLabel && <span className="ml-2">테마</span>}
        <span className="sr-only">테마 변경</span>
      </Button>
    );
  }

  const CurrentIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(className, "rounded-full")}
          aria-label="테마 변경"
        >
          <CurrentIcon className="h-4 w-4" />
          {showLabel && <span className="ml-2">{currentTheme.label}</span>}
          <span className="sr-only">테마 변경</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {THEME_OPTIONS.map((option) => (
          <ThemeMenuItem
            key={option.value}
            option={option}
            isActive={theme === option.value}
            onSelect={handleThemeChange}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ModeToggle.displayName = 'ModeToggle';
