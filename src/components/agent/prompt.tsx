'use client';

import React, { useState } from 'react';
import { ArrowUp, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface CalsAgentPromptProps {
  type?: 'icon' | 'text';
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (value: string) => void;
}

export default function CalsAgentPrompt({
  type = 'icon',
  placeholder,
  buttonText,
  onSubmit
}: CalsAgentPromptProps) {
  const [value, setValue] = useState('');

  // buttonText가 있으면 자동으로 text 타입으로 변환
  const effectiveType = buttonText ? 'text' : type;

  const getButtonContent = () => {
    if (effectiveType === 'text') {
      return buttonText || '에이전트 호출';
    }
    return <ArrowUp className="size-5 p-0" />;
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (effectiveType === 'text') {
      return '아이디어를 입력하고 에이전트를 호출하세요...';
    }
    return '프롬프트를 입력하세요...';
  };

  const getButtonClassName = () => {
    const baseClasses = "flex items-center justify-center h-8 text-base font-medium text-center text-background rounded-full bg-transparent transition-colors disabled:bg-muted disabled:text-muted-foreground/80 disabled:cursor-not-allowed";

    if (effectiveType === 'text') {
      return `${baseClasses} px-4`;
    }

    if (effectiveType === 'icon') {
      return `${baseClasses} w-8 p-0`;
    }
    return baseClasses;
  };

  const handleSubmit = () => {
    if (!value.trim()) return;

    onSubmit?.(value);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isButtonDisabled = !value.trim();

  return (
    <>
      <div className="prompt-wrap w-3/5 mx-auto p-3 flex flex-col md:flex-row items-end border rounded-4xl bg-background shadow">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none focus-visible:ring-0 border-none shadow-none min-h-10 max-h-32"
          placeholder={getPlaceholder()}
        />
        <div className="btn-prompt">
          <button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className={getButtonClassName()}
          >
            {getButtonContent()}
          </button>
        </div>
      </div>
    </>
  );
}