'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalsAgentHeader from '@/components/agent/header';
import CalsAgentPrompt from '@/components/agent/prompt';
import HeroSection from '@/components/agent/hero-section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

export default function CalsAgentPromptPage() {
  return (
    <div className="page-prompt">
      <CalsAgentHeader />
      <main>
        <HeroSection 
          title={['한 줄의 프롬프트,', '에이전트 팀이 완성합니다.']}
          subtitle={['기획부터 완성, 운영까지', '에이전트로 만들고, 로우코드로 운영하세요.']}
        >
          <div className="space-y-6">
            <CalsAgentPrompt 
              placeholder="예: '온라인 쇼핑몰을 만들어주세요' 또는 '피트니스 앱을 개발해주세요'"
              buttonText="에이전트 호출"
            />
          </div>
        </HeroSection>
      </main>
    </div>
  )
}