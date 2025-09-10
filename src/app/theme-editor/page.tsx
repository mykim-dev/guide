'use client';

import React from 'react';
import { ThemeEditorPreview } from '@/components/theme-editor/theme-editor-preview';

// 테마 에디터 메인 컴포넌트 (독립 레이아웃 사용)
// 레이아웃은 src/app/theme-editor/layout.tsx에서 자동으로 적용됨
export default function ThemeEditorPage() {
  return <ThemeEditorPreview />;
}
