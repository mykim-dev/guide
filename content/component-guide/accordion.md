# Accordion

접을 수 있는 콘텐츠 섹션을 표시하는 컴포넌트입니다. FAQ, 설정 패널, 탐색 메뉴 등에 유용합니다.

## 기본 사용법

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## 여러 개 열기

`type="multiple"`을 사용하여 여러 섹션을 동시에 열 수 있습니다.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionMultiple() {
  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes! Set the type prop to &quot;multiple&quot; to allow multiple items to be open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## 기본값 설정

`defaultValue`를 사용하여 특정 섹션을 기본적으로 열 수 있습니다.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDefaultOpen() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>This item is open by default</AccordionTrigger>
        <AccordionContent>
          This accordion item is open by default because we set the defaultValue prop.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>This item is closed by default</AccordionTrigger>
        <AccordionContent>
          This accordion item is closed by default.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## 제어된 컴포넌트

`value`와 `onValueChange`를 사용하여 아코디언을 제어할 수 있습니다.

```tsx
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionControlled() {
  const [value, setValue] = useState<string>("")

  return (
    <Accordion type="single" collapsible value={value} onValueChange={setValue}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Controlled Accordion</AccordionTrigger>
        <AccordionContent>
          This accordion is controlled by React state.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Current value: {value || "none"}</AccordionTrigger>
        <AccordionContent>
          You can see the current value displayed in the trigger.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## 커스텀 트리거

트리거에 아이콘이나 추가 콘텐츠를 포함할 수 있습니다.

```tsx
import { ChevronDown, Info } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionCustomTrigger() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span>Important Information</span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionTrigger>
        <AccordionContent>
          This accordion has a custom trigger with an icon and custom styling.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## FAQ 예제

실제 FAQ 섹션을 구현한 예제입니다.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    question: "How do I reset my password?",
    answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time from your account settings."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for all new users."
  }
]

export function FAQAccordion() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Enter, Space, Arrow keys 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **포커스 관리**: 포커스가 트리거에 올바르게 유지됨

## 모범 사례

1. **명확한 라벨링**: 트리거 텍스트가 콘텐츠를 정확히 설명하도록 하세요
2. **적절한 사용**: 긴 콘텐츠나 선택적 정보에 사용하세요
3. **일관성**: 같은 페이지에서 동일한 스타일과 동작을 유지하세요
4. **성능**: 많은 항목이 있는 경우 가상화를 고려하세요

## API 참조

### Accordion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | `"single"` | 아코디언 타입 |
| `collapsible` | `boolean` | `false` | 모든 항목을 닫을 수 있는지 여부 |
| `value` | `string \| string[]` | - | 현재 열린 항목 (제어된 컴포넌트) |
| `defaultValue` | `string \| string[]` | - | 기본 열린 항목 |
| `onValueChange` | `(value: string \| string[]) => void` | - | 값 변경 핸들러 |

### AccordionItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 항목의 고유 값 |
| `disabled` | `boolean` | `false` | 항목 비활성화 |

### AccordionTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 트리거로 렌더링 |
| `disabled` | `boolean` | `false` | 트리거 비활성화 |

### AccordionContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |
