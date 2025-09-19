'use client';

import React from 'react';
import { useThemeEditorState } from '@/hooks/use-theme-editor';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ArrowUp, X, Expand, Download, Loader2, CheckCircle, AlertCircle, FileText, Link, BellDot, UserRound, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { SupervisorIcon } from '@/components/agent/icon/SupervisorIcon';
import { BAIcon } from '@/components/agent/icon/BAIcon';
import { PlannerIcon } from '@/components/agent/icon/PlannerIcon';
import { DBAIcon } from '@/components/agent/icon/DBAIcon';
import { BackendIcon } from '@/components/agent/icon/BackendIcon';
import { FrontendIcon } from '@/components/agent/icon/FrontendIcon';
import { QAIcon } from '@/components/agent/icon/QAIcon';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import CalsAgentPrompt from '@/components/agent/prompt';

export interface Agent {
  id: string // 노드 ID
  name: string // 노드 이름
  type: "supervisor" | "planner" | "ba" | "dba" | "backend" | "frontend" | "qa"
  messages: number // 메시지 수
  toolCalls: number // 툴 호출 수
}

// 아이콘 타입 정의
type AgentType = Agent['type'];

// 아이콘 컴포넌트 타입 정의
type IconComponent = React.ComponentType<{ variant: 'default' | 'active' }>;

// 아이콘 매핑 객체
const AGENT_ICONS: Record<AgentType, IconComponent> = {
  supervisor: SupervisorIcon,
  ba: BAIcon,
  planner: PlannerIcon,
  dba: DBAIcon,
  backend: BackendIcon,
  frontend: FrontendIcon,
  qa: QAIcon,
} as const;

// 아이콘을 렌더링하는 함수 (성능 최적화)
const getAgentIcon = (type: AgentType, isActive: boolean): React.ReactElement => {
  const variant = isActive ? "active" : "default";
  const IconComponent = AGENT_ICONS[type] || SupervisorIcon;
  return <IconComponent variant={variant} />;
};

const AGENTS: Agent[] = [
  {
    id: "supervisor",
    name: "Supervisor",
    type: "supervisor",
    messages: 0,
    toolCalls: 0,
  },
  {
    id: "ba",
    name: "BA Agent",
    type: "ba",
    messages: 0,
    toolCalls: 0,
  },
  {
    id: "planner",
    name: "Planner",
    type: "planner",
    messages: 0,
    toolCalls: 0,
  },
  {
    id: "dba",
    name: "DBA Agent",
    type: "dba",
    messages: 0,
    toolCalls: 0,
  },
  {
    id: "backend",
    name: "Backend",
    type: "backend",
    messages: 0,
    toolCalls: 0,
  },
  {
    id: "frontend",
    name: "Frontend",
    type: "frontend",
    messages: 0,
    toolCalls: 0,
  },
  {
    id: "qa",
    name: "QA Agent",
    type: "qa",
    messages: 0,
    toolCalls: 0,
  },
]

export default function CalsAgentStudioPage() {
  const { mounted } = useThemeEditorState();

  const containerClasses = React.useMemo(() =>
    'layout-container grid grid-rows-[3rem_1fr] grid-cols-[3rem_1fr] bg-background transition-all duration-300', []
  );

  const scrollAreaClasses = React.useMemo(() =>
    'h-[calc(100svh-3rem)] w-[calc(100svw-3rem)] transition-all duration-300', []
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">UI 템플릿를 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-studio ${containerClasses}`}>
      <header className="col-span-2 flex justify-around items-center gap-4 px-4 h-12 border-b bg-background">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="font-semibold">자동차 운반선 차량 할당 처리 서비스</h1>
        </div>
        <div className="flex-1 flex items-end gap-4"></div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
            <UserRound className="size-5" />
          </Button>
        </div>
      </header>

      <aside className="row-span-2 border-r transition-all duration-300 w-12 bg-background">
        <ScrollArea className="h-[calc(100svh-3rem)]">
          <nav className="flex flex-col gap-4 py-2">
            {AGENTS.map((agent) => {
              const isActive = agent.id === 'supervisor';
              return (
                <Tooltip key={agent.id}>
                  <TooltipTrigger asChild>
                    <button
                      className={`menu-item flex justify-center items-center size-11 rounded-md cursor-pointer [&>svg]:z-10 ${isActive ? 'active-agent' : ''}`}
                      aria-label={agent.name}
                    >
                      {getAgentIcon(agent.type, isActive)}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {agent.name}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>

      <main>
        <ScrollArea className={scrollAreaClasses}>
          <div className="grid grid-cols-2 h-[calc(100svh-3rem)]">
            <div className="chat-wrap relative p-5">
              <ScrollArea className="h-[calc(100svh-5rem)]">
                <div className="chat-wrap">
                  <div className="chat-row">
                    <div className="chat-bubble">
                      사용자가 입력한 프롬프트를 표시 사용자가 입력한 프롬프트를
                      표시사용자가 입력한 프롬프트를 표시사용자가 입력한
                      프롬프트를 표시사용자가 입력한 프롬프트를 표시사용자가
                      입력한 프롬프트를 표시사용자가 입력한 프롬프트를
                      표시사용자가 입력한 프롬프트를 표시사용자가 입력한
                      프롬프트를 표시사용자가 입력한 프롬프트를 표시사용자가
                      입력한 프롬프트를 표시
                    </div>
                  </div>

                  {/* Agent */}
                  <div className="chat-row">
                    {/* Supervisor */}
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="item-1"
                      className="chat-accordion"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="agent-title">
                            <SupervisorIcon variant="active" /> Supervisor
                            <Loader2
                              className="size-5 text-muted-foreground animate-spin"
                              aria-label="진행중"
                            />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>
                            안녕하세요 OO 님. <br />
                            요청하신대로 &apos;자동차 운반선 차량 할당 처리&apos; 서비스
                            개발을 시작하겠습니다. 다음과 같은 작업을 수행할
                            예정입니다.
                          </p>

                          <ul>
                            <li>BA : 인터뷰를 통해 상세 비즈니스 정보 수집</li>
                            <li>
                              Planner : 수집한 정보를 바탕으로 앱 메뉴와 기능
                              설계 및 생성
                            </li>
                            <li>DBA : 데이터 베이스와 저장소 설계 및 생성</li>
                            <li>Backend : 서버와 API 로직 설계 및 생성</li>
                            <li>Frontend : 사용자화면 생성</li>
                          </ul>

                          <p>
                            그럼, 차량 할당 처리 앱 생성을 위해 필요한 필수 정보
                            수집부터 시작하겠습니다.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="chat-row">
                    {/* BA */}
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="item-1"
                      className="chat-accordion"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="agent-title">
                            <BAIcon variant="active" /> BA
                            <CheckCircle
                              className="size-5 text-green-500"
                              aria-label="완료"
                            />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>
                            로르 퍼포머 운반선 차량 할당 앱을 개발하는 목표를
                            위해, 어느 기능을 이 앱의 메인 기능으로 삼고
                            싶으신가요?
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="chat-row">
                    {/* Planner */}
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="item-1"
                      className="chat-accordion"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="agent-title">
                            <PlannerIcon variant="active" /> Planner
                            <AlertCircle
                              className="size-5 text-red-500"
                              aria-label="오류"
                            />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>
                            로르 퍼포머 운반선 차량 할당 앱을 개발하는 목표를
                            위해, 설계된 구조를 바탕으로 데이터 베이스와 저장소
                            설계 및 생성을 시작합니다.
                          </p>

                          <span className="status-mark mark-progress">
                            Task 분석 시작
                          </span>

                          <span className="status-mark mark-completed">
                            Task 분석 완료
                          </span>

                          {/* 산출물이 있는 경우 */}
                          <Button
                            className="report-file"
                            size="sm"
                            variant="outline"
                          >
                            <FileText /> Task 분석 파일 산출물.docx
                          </Button>
                          <Button className="report-file active-file" size="sm">
                            <FileText /> Task 분석 파일 산출물 선택.xlsx
                          </Button>

                          <span className="status-mark mark-error">
                            Task 분석 실패
                          </span>

                          <p>
                            요구 사항을 바탕으로 데이터 베이스와 저장소 설계를
                            완료하였습니다. 설계를 바탕으로 테이블 정의서를
                            작성하겠습니다.
                          </p>

                          <Button
                            variant="link"
                            className="report-file file-link"
                          >
                            <i>
                              <Link className="size-5" />
                            </i>
                            자동차 운반선 차량 할당 처리 서비스
                          </Button>

                          <p>테이블 정의서 작성을 완료하였습니다.</p>
                          <p>
                            다음으로 정의된 테이블을 바탕으로 테이블 간 연결을
                            확인 할 수 있는 ERD를 작성하겠습니다.
                          </p>

                          <span className="status-mark mark-error">
                            실패 Task 명(예: 분석 실패)
                          </span>

                          {/* Task Loading */}
                          {/* <TaskLoading /> */}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="chat-row">
                    {/* DBA */}
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="item-1"
                      className="chat-accordion"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="agent-title">
                            <DBAIcon variant="active" /> DBA
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>DBA</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="chat-row">
                    {/* Backend */}
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="item-1"
                      className="chat-accordion"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="agent-title">
                            <BackendIcon variant="active" /> Backend
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>Backend</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="chat-row">
                    {/* Frontend */}
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="item-1"
                      className="chat-accordion"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="agent-title">
                            <FrontendIcon variant="active" /> Frontend
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>Frontend</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </ScrollArea>

              <div className="absolute bottom-4 w-full">
                <CalsAgentPrompt />
              </div>
            </div>
            <div className="relative m-4 border border-border rounded-lg bg-background">
              <div className="h-12 flex justify-between items-center px-4">
                <h3 className="text-lg font-semibold tracking-tight">Report</h3>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon">
                    <Download />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Expand />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <X />
                  </Button>
                </div>
              </div>

              {/* Report Panel 내용 */}
              <div className="flex-1">
                <ScrollArea className="p-4 h-[calc(100svh-8rem)]">
                  산출물
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </main>
    </div>
  )
}