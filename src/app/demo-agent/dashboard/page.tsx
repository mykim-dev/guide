'use client';

import React from 'react';
import CalsAgentHeader from '@/components/agent/header';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, CloudCog, CloudCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


type Project = { id: string; title: string; date: string; state?: string }

const PROJECTS: ReadonlyArray<Project> = [
  { id: 'p1', title: '물류 관리 시스템 물류', state: '요구사항 수집 진행중', date: '2025-02-01' },
  { id: 'p2', title: '콘텐츠 분석 에이전트', state: '요구사항 수집 확인 대기중', date: '2025-01-28' },
  { id: 'p3', title: '이커머스 대시보드', state: '배포 진행중', date: '2025-01-15' },
  { id: 'p4', title: '물류 관리 시스템', state: '배포 완료', date: '2025-02-01' },
  { id: 'p5', title: '콘텐츠 분석 에이전트', state: '배표 실패', date: '2025-01-28' },
  { id: 'p6', title: '이커머스 대시보드', state: '생성 확인 대기중', date: '2025-01-15' },
  { id: 'p7', title: '물류 관리 시스템', state: '생성 확인 대기중', date: '2025-02-01' },
  { id: 'p8', title: '콘텐츠 분석 에이전트', state: '생성 확인 대기중', date: '2025-01-28' },
  { id: 'p9', title: '이커머스 대시보드', state: '생성 확인 대기중', date: '2025-01-15' },
  { id: 'p10', title: '물류 관리 시스템', state: '생성 확인 대기중', date: '2025-02-01' },
  { id: 'p11', title: '콘텐츠 분석 에이전트', state: '생성 확인 대기중', date: '2025-01-28' },
  { id: 'p12', title: '이커머스 대시보드', state: '생성 확인 대기중', date: '2025-01-15' },
  { id: 'p13', title: '물류 관리 시스템', state: '생성 확인 대기중', date: '2025-02-01' },
  { id: 'p14', title: '콘텐츠 분석 에이전트', state: '생성 확인 대기중', date: '2025-01-28' },
  { id: 'p15', title: '이커머스 대시보드', date: '2025-01-15' },
]

export default function CalsAgentDashboardPage() {
  return (
    <div className="bg-background">
      <CalsAgentHeader className="static" />

      <main className="bg-secondary/45">
        <div className="container mx-auto py-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium">프로젝트 목록</h2>
            <div className="flex items-center gap-4 my-4">
              <Button variant="ghost" size="icon" className="p-0 rounded-full cursor-pointer">
                <RefreshCcw className="size-4" />
              </Button>
              <Button variant="customer" size="lg" className="rounded-full border border-cyan-100  cursor-pointer">
                새 프로젝트 시작하기
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[75svh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map(p => (
                <Card key={p.id} className="shadow-none py-4">
                  <CardTitle>
                    <div className="px-4 truncate">{p.title}</div>
                  </CardTitle>
                  <CardDescription className="px-4">
                    <span className="flex justify-between items-center">
                      {p.state && <Badge variant="secondary">{p.state}</Badge>}
                      <span className="text-sx text-must-foreground">최근 업데이트 : {p.date}</span>
                    </span>
                  </CardDescription>
                  <CardContent className="p-0">
                    <div className="flex justify-end gap-4 px-4">
                      <Button variant="secondary" aria-label='Agent'>
                        <Brain aria-hidden="true" className="size-4" /><span>Agent</span></Button>
                      <Button variant="secondary" aria-label='CALS Studio'>
                        <CloudCog aria-hidden="true" className="size-4" /><span>CALS Studio</span></Button>
                      <Button variant="secondary" aria-label='CALS App'>
                        <CloudCheck aria-hidden="true" className="size-4" /><span>CALS App</span></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  )
}