---
title: React Hook Form
description: 폼 관리를 위한 React Hook Form 통합 가이드
---

# React Hook Form

React Hook Form은 성능이 뛰어나고 유연한 폼 라이브러리입니다. shadcn/ui 컴포넌트와 함께 사용하여 강력한 폼을 만들 수 있습니다.

## 기본 사용법

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  name: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다"),
  email: z.string().email("올바른 이메일 주소를 입력하세요"),
  age: z.number().min(18, "18세 이상이어야 합니다")
})

type FormData = z.infer<typeof formSchema>

export default function BasicForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("폼 데이터:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="이름을 입력하세요"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="이메일을 입력하세요"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">나이</Label>
        <Input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          placeholder="나이를 입력하세요"
        />
        {errors.age && (
          <p className="text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "제출 중..." : "제출"}
      </Button>
    </form>
  )
}
```

## 복잡한 폼 예시

```tsx
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const profileSchema = z.object({
  firstName: z.string().min(1, "이름을 입력하세요"),
  lastName: z.string().min(1, "성을 입력하세요"),
  email: z.string().email("올바른 이메일을 입력하세요"),
  phone: z.string().min(10, "올바른 전화번호를 입력하세요"),
  country: z.string().min(1, "국가를 선택하세요"),
  bio: z.string().max(500, "자기소개는 500자 이내로 작성하세요"),
  gender: z.enum(["male", "female", "other"]),
  newsletter: z.boolean(),
  terms: z.boolean().refine(val => val === true, "약관에 동의해야 합니다")
})

type ProfileData = z.infer<typeof profileSchema>

export default function ComplexForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      newsletter: false,
      terms: false
    }
  })

  const onSubmit = async (data: ProfileData) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("프로필 데이터:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">이름</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="이름"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">성</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="성"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="이메일 주소"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">전화번호</Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder="010-1234-5678"
        />
        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>국가</Label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="국가를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kr">대한민국</SelectItem>
                <SelectItem value="us">미국</SelectItem>
                <SelectItem value="jp">일본</SelectItem>
                <SelectItem value="cn">중국</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.country && (
          <p className="text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>성별</Label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">남성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">여성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">기타</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.gender && (
          <p className="text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">자기소개</Label>
        <Textarea
          id="bio"
          {...register("bio")}
          placeholder="자기소개를 작성하세요"
          rows={4}
        />
        {errors.bio && (
          <p className="text-sm text-red-600">{errors.bio.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <Controller
          name="newsletter"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="newsletter">뉴스레터 구독</Label>
            </div>
          )}
        />

        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="terms">이용약관에 동의합니다 *</Label>
            </div>
          )}
        />
        {errors.terms && (
          <p className="text-sm text-red-600">{errors.terms.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "저장 중..." : "프로필 저장"}
      </Button>
    </form>
  )
}
```

## 주요 기능

### 폼 검증
- Zod 스키마를 사용한 타입 안전한 검증
- 실시간 검증
- 커스텀 에러 메시지

### 성능 최적화
- 불필요한 리렌더링 방지
- 언컨트롤드 컴포넌트 사용
- 효율적인 상태 관리

### 통합성
- shadcn/ui 컴포넌트와 완벽 통합
- Controller를 통한 커스텀 컴포넌트 연결
- TypeScript 지원

## 접근성

React Hook Form은 다음과 같은 접근성 기능을 제공합니다:

- 폼 필드 라벨링
- 에러 메시지 연결
- 키보드 네비게이션
- 스크린 리더 지원
