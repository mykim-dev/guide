'use client';

import React from 'react';
import { LayoutCalsApp } from '@/components/layout/layout-cals-app';

// 테마 에디터 메인 컴포넌트 (독립 레이아웃 사용)
// 레이아웃은 src/app/layout-theme/layout.tsx에서 자동으로 적용됨
export default function CalsAppPage() {
  return <LayoutCalsApp />;
}
