'use client';

import React, { useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SupervisorIcon } from '@/components/agent-studio/icon/SupervisorIcon';
import { BAIcon } from '@/components/agent-studio/icon/BAIcon';
import { PlannerIcon } from '@/components/agent-studio/icon/PlannerIcon';
import { DBAIcon } from '@/components/agent-studio/icon/DBAIcon';
import { BackendIcon } from '@/components/agent-studio/icon/BackendIcon';
import { FrontendIcon } from '@/components/agent-studio/icon/FrontendIcon';
import { QAIcon } from '@/components/agent-studio/icon/QAIcon';

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

export function AgentStudioSidebar() {
  const agentItems = useMemo(() => 
    AGENTS.map((agent) => {
      const isActive = agent.id === "supervisor";
      
      return (
        <Tooltip key={agent.id}>
          <TooltipTrigger asChild>
            <button 
              className={`menu-item flex justify-center items-center size-11 rounded-md cursor-pointer [&>svg]:z-10 ${isActive ? "active-agent" : ""}`}
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
    }), 
    []
  );

  return (
    <aside className={`layout-aside row-span-2 border-r transition-all duration-300 w-12`}>
      <ScrollArea className="h-[calc(100svh-3rem)]">
        <nav className="flex flex-col gap-4 py-2">
          {agentItems}
        </nav>
      </ScrollArea>
    </aside>
  );
}
