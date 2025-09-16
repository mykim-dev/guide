'use client';

import React from 'react';

import { ArrowUp, X, Expand, Download, Loader, CircleCheckIcon, CircleAlert, FileText, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { SupervisorIcon } from '@/components/agent-studio/icon/SupervisorIcon';
import { BAIcon } from '@/components/agent-studio/icon/BAIcon';
import { PlannerIcon } from '@/components/agent-studio/icon/PlannerIcon';
import { DBAIcon } from '@/components/agent-studio/icon/DBAIcon';
import { BackendIcon } from '@/components/agent-studio/icon/BackendIcon';
import { FrontendIcon } from '@/components/agent-studio/icon/FrontendIcon';

export default function AgentStudioPage() {
  return (
    <div className="contents-wrap grid grid-cols-2 h-[calc(100svh-3rem)]">
      <div className="contents-left chat-wrap relative p-5">
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
                      <Loader
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
                      <CircleCheckIcon
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
                      <CircleAlert
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
      
        {/* prompt */}
        <div className="prompt-wrap flex bg-background rounded-xl shadow-md absolute bottom-4 left-1/10 right-1/10">
          <Textarea
            className="resize-none focus-visible:outline-0 w-full h-full border-none shadow-none relative z-10"
            placeholder=""
          />
          <div className="prompt-options flex justify-end items-end m-2">
            <Button variant="default" size="icon" className="btn-prompt-action rounded-full relative z-20 cursor-pointer">
              <ArrowUp />
            </Button>
          </div>
        </div>
      </div>
      <div className="contents-right report-wrap relative m-4 border rounded-lg">
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
  )
}
