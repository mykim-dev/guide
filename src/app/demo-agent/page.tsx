'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Dialog, DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalsAgentHeader from '@/components/agent/header';
import CalsAgentPrompt from '@/components/agent/prompt';
import HeroSection from '@/components/agent/hero-section';

// 타입 정의
interface WorkflowStep {
  title: string;
  description: string;
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default function CalsAgentPage() {
  const workflowSteps: WorkflowStep[] = [
    {
      "title": "아이디어 한 줄이면 시작할 수 있어요.",
      "description": "생각 중인 아이디어를 프롬프트로 입력하면, CALS가 자동으로 프로젝트를 시작합니다. 복잡한 설정이나 학습 없이 누구나 바로 시도할 수 있어요."
    },
    {
      "title": "자동으로 기획 문서를 만들어드립니다.",
      "description": "입력된 아이디어를 바탕으로, 서비스 목적과 핵심 기능을 분석하여 PRD(기획 문서)를 자동 구성해드려요. 아이디어가 구체적이지 않아도 괜찮습니다. CALS의 인터뷰 기능을 통해 자연스럽게 아이디어를 확장할 수 있어요."
    },
    {
      "title": "전문가 역할의 에이전트들이 함께 만듭니다.",
      "description": "CALS는 Multi-Agent 시스템을 기반으로 작동합니다. 기획자, 디자이너, 개발자처럼 각 전문 역할을 수행하는 AI 에이전트들이 분업과 협업을 통해 완성형 앱을 자동으로 만들어줍니다."
    },
    {
      "title": "생성 후 운영까지, 코딩 없이 가능합니다.",
      "description": "완성된 앱은 로우코드 솔루션 CALS를 통해 UI 수정, 기능 추가, 데이터 관리까지 쉽게 운영할 수 있어요. 개발 지식 없이도 앱을 직접 운영해보세요."
    }
  ];

  const featureCards: FeatureCard[] = [
    {
      "icon": "/guide/images/demo-agent/img-section4-1.svg",
      "title": "막연한 아이디어를 정리하고 싶을 때",
      "description": "에이전트가 생각을 끌어내고 PRD를 자동으로 만들어드립니다. 아이디어가 구체적이지 않아도 시작할 수 있어요."
    },
    {
      "icon": "/guide/images/demo-agent/img-section4-2.svg",
      "title": "개발 없이 아이디어를 검증하고 싶을 때",
      "description": "프롬프트만 입력하면 기획부터 앱 생성까지 자동으로 진행됩니다. 개발자 없이도 아이디어를 바로 테스트할 수 있어요."
    },
    {
      "icon": "/guide/images/demo-agent/img-section4-3.svg",
      "title": "빠르게 MVP를 테스트하고 싶을 때",
      "description": "실행 가능한 앱을 즉시 만들고, 사용자 피드백을 통해 빠르게 개선하세요. 기획과 개발을 기다리지 않아도 됩니다."
    }
  ];

  const faqItems: FaqItem[] = [
    {
      "question": "CALS는 어떤 서비스 인가요?",
      "answer": "Multi Agent 기반 AI 앱 생성 플랫폼입니다. 프롬프트 한 줄만 입력하면, 여러 AI 에이전트가 협력하여 기획, 설계, 개발까지 자동으로 처리해드려요. 개발 지식 없이도 완성형 앱을 손쉽게 만들 수 있습니다."
    },
    {
      "question": "회원가입 없이도 사용해볼 수 있나요?",
      "answer": "아니요, CALS는 회원가입 후에만 사용 가능합니다. 생성된 앱의 저장 및 수정 기능, Studio 연동 등 대부분의 주요 기능은 계정 기반으로 제공됩니다."
    },
    {
      "question": "서비스는 무료인가요?",
      "answer": "베타 기간 동안은 모든 기능을 무료로 제공합니다. 정식 출시 이후에는 일부 기능이 유료화될 수 있으며, 자세한 이용 정책은 추후 안내드릴 예정입니다."
    },
    {
      "question": "정말 코딩 지식 없이도 앱을 만들고 운영할 수 있나요?",
      "answer": "네, 가능합니다. 프롬프트에 아이디어만 입력하면, AI 에이전트가 앱 구조를 자동으로 설계하고 구현해줍니다. 별도의 개발 지식 없이도 앱 생성부터 운영까지 이어지는 흐름을 경험하실 수 있어요."
    },
    {
      "question": "생성된 앱은 수정할 수 있나요?",
      "answer": "네, 수정 가능합니다. 앱 생성 후 배포 전에는 프롬프트 기반으로, 배포 후에는 CALS Studio를 통해 화면, 텍스트, 기능 흐름 등을 자유롭게 편집할 수 있습니다. CALS의 로우코드 환경 덕분에, 코딩 없이도 손쉽게 운영할 수 있어요."
    },
    {
      "question": "생성된 앱은 상업적으로 사용할 수 있나요?",
      "answer": "베타 기간에는 자유롭게 테스트 및 개인/팀 프로젝트에 활용하실 수 있습니다. 상업적 이용은 정식 출시 후 라이선스 정책 공개에 따라 가능하며, 세부 내용은 추후 안내드를 예정입니다."
    }
  ];

  return (
    <div className="page-rendering">
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

        <section className="h-screen flex flex-col items-center justify-center">
          <div className="container h-[60svh] mx-auto text-center">
            <div className="size-full bg-muted-foreground/10 rounded-2xl">
              앱 생성 화면 이미지 or 영상 (Agent 단계)
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center">
          <div className="container mx-auto my-32">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold leading-snug tracking-tight">아이디어만으로 앱 생성, 운영까지 아이디어 한 줄이면 충분해요.</h2>
              <div className="text-lg">
                <p>CALS의 에이전트들이 앱을 생성하고, 로우코드 솔루션 &apos;CALS&apos;에서 운영까지 이어집니다.</p>
                <p>개발 지식 없이도, 지금 바로 시작해보세요.</p>
              </div>
            </div>

            {workflowSteps.map((item: WorkflowStep, index: number) => (
              <dl key={index} className="grid grid-cols-1 lg:grid-cols-2 my-24 gap-12">
                <dt className="h-80 border border-border bg-muted-foreground/10 rounded-2xl"></dt>
                <dd className="flex-1 text-left space-y-4">
                  <h3 className="text-2xl font-medium">{item.title}</h3>
                  <p className="text-lg text-muted-foreground">{item.description}</p>
                </dd>
              </dl>
            ))}

          </div>
        </section>

        <section className="h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto space-y-32">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold leading-snug tracking-tight">누구를 위한 서비스인가요?</h2>
              <div className="text-lg">
                <p>다양한 상황에서 CALS를 활용할 수 있습니다.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {featureCards.map((item: FeatureCard, index: number) => {

                return (
                  <Card key={index} className="bg-gradient-to-b from-[#b1befd] to-[#edf7fe] border-0 rounded-8 p-10 flex flex-col gap-5">
                    <div className="size-[64px] flex items-center justify-center">
                      <img src={item.icon} className="size-[64px]" alt="Feature icon" />
                    </div>
                    <CardTitle className="text-[30px] font-bold text-[#3b4a96] leading-normal">
                      {item.title}
                    </CardTitle>
                    <CardContent className="text-[18px] text-[#4a5565] leading-normal p-0">
                      {item.description}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto space-y-32">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold leading-snug tracking-tight">자주 묻는 질문</h2>
              <div className="text-xl font-medium">
                <p>CALS에 대해 궁금한 점들을 확인해보세요.</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="border-y">
              {faqItems.map((item: FaqItem, index: number) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                >
                  <AccordionTrigger className="[&>svg]:size-5 [&>svg]:mr-4">
                    <div className="px-4 text-lg">{item.question}</div>
                  </AccordionTrigger>
                  <AccordionContent className="p-5 bg-muted/50">
                    <div className="text-muted-foreground">{item.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto space-y-32">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold leading-snug tracking-tight">지금 바로 시작해보세요</h2>
              <div>
                <p>아이디어만 있으면 누구나 앱을 만들 수 있습니다.</p>
                <p>복잡한 설정 없이 바로 시작하세요.</p>
                <p>무료로 체험해보실 수 있습니다.</p>
              </div>
              <Button variant="customer" size="lg" className="rounded-full cursor-pointer mt-12 border border-cyan-100 scale-125">
                무료로 시작하기
              </Button>
            </div>
          </div>
        </section>

        <footer className="border-t">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
              <div className="flex items-center gap-4">
                <div>CALS</div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="cursor-pointer">
                      개인정보처리방침 및 이용약관
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        개인정보처리방침 및 이용약관
                      </DialogTitle>
                      <DialogDescription>
                        서비스 개인정보처리방침 및 이용약관을 확인하세요.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      여기에 CALS의 개인정보처리방침 및 이용약관 내용이 표시됩니다.
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center gap-4">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="언어 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="테마 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">다크</SelectItem>
                    <SelectItem value="light">라이트</SelectItem>
                    <SelectItem value="system">시스템</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="py-4 text-xs text-muted-foreground text-center">
              COPYRIGHT © QuintetSystems Inc. All Rights Reserved
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}