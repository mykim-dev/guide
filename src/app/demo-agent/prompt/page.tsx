'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import CalsAgentHeader from '@/components/agent/header';
import CalsAgentPrompt from '@/components/agent/prompt';

export default function CalsAgentPromptPage() {
  return (
    <div className="bg-background">
      <CalsAgentHeader />
      <main>
        <section className="h-[calc(100svh-4rem)] flex flex-col items-center justify-center">
          <div className="container mx-auto space-y-24">
            <h2 className="text-gradient typography-7xl text-center">
              한 줄의 프롬프트 <br />에이전트 팀이 완성합니다.
            </h2>

            <div className="flex items-center justify-center">
              <span className="flex">기획부터 완성, 운영까지</span>
              <span className="flex w-8 h-[1px] mx-2 bg-muted-foreground" />
              <span className="flex">에이전트로 만들고, 로우코드로 운영하세요.</span>
            </div>

            <CalsAgentPrompt />
          </div>
        </section>
      </main>
    </div>
  )
}