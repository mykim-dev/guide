'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowUp, User } from 'lucide-react';
import { Card, CardTitle, CardContent } from '@/components/ui/card';

export default function CalsAgentPromptPage() {  
  return (
    <div className="layout-container bg-background">
      <main className="layout-main">      
        <section className="section1 min-h-[calc(100svh-4rem)] flex items-center justify-center">
          <div className="container text-center flex flex-col justify-center items-center gap-[8svh]">
            <div className="section-title">
              <h2 className="text-gradient text-7xl font-bold leading-tight">
                한 줄의 프롬프트 <br />에이전트 팀이 완성합니다.
              </h2>
            </div>

            <div className="section-description">
              <p className="relative flex items-center justify-center">
                <span className="flex">기획부터 완성, 운영까지</span>
                <span className="flex w-8 h-[1px] mx-2 bg-muted-foreground" />
                <span className="flex">에이전트로 만들고, 로우코드로 운영하세요.</span>
              </p>
            </div>

            <div className="prompt-wrap w-full flex border rounded-2xl">
              <Textarea className="h-30 resize-none focus-visible:outline-0 border-none shadow-none flex-1" />
              <div className="prompt-options flex items-end justify-end">
                <Button disabled className="btn-prompt-action size-10 rounded-full p-0 m-2">
                  <ArrowUp className="size-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        </main>
    </div>
  )
}