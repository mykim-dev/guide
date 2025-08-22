---
title: Input OTP
description: 일회용 비밀번호(OTP) 입력을 위한 컴포넌트
---

# Input OTP

Input OTP 컴포넌트는 일회용 비밀번호, 인증 코드, 또는 PIN 번호 입력을 위한 특화된 입력 필드입니다.

## 기본 사용법

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function BasicOTP() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

## 4자리 PIN 입력

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function PINInput() {
  return (
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

## 값 변경 감지

```tsx
import { useState } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function OTPWithValue() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-4">
      <InputOTP 
        maxLength={6} 
        value={value} 
        onChange={(val) => setValue(val)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      
      <div className="text-sm text-muted-foreground">
        입력된 값: {value}
      </div>
    </div>
  )
}
```

## 완료 상태 표시

```tsx
import { useState } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { CheckCircle, XCircle } from "lucide-react"

export default function OTPWithCompletion() {
  const [value, setValue] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const handleChange = (val: string) => {
    setValue(val)
    setIsComplete(val.length === 6)
    
    if (val.length === 6) {
      // 예시: 123456이 올바른 코드라고 가정
      setIsValid(val === "123456")
    } else {
      setIsValid(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <InputOTP 
          maxLength={6} 
          value={value} 
          onChange={handleChange}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        
        {isComplete && (
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
            {isValid ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </div>
      
      {isComplete && (
        <div className={`text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
          {isValid ? "인증 코드가 올바릅니다!" : "인증 코드가 올바르지 않습니다."}
        </div>
      )}
    </div>
  )
}
```

## 자동 포커스 및 자동 제출

```tsx
import { useState, useRef } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"

export default function AutoSubmitOTP() {
  const [value, setValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const otpRef = useRef<any>(null)

  const handleChange = async (val: string) => {
    setValue(val)
    
    if (val.length === 6) {
      setIsSubmitting(true)
      
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("OTP 제출:", val)
      setIsSubmitting(false)
      
      // 성공 시 입력 필드 초기화
      setValue("")
      otpRef.current?.focus()
    }
  }

  const handleSubmit = () => {
    if (value.length === 6) {
      handleChange(value)
    }
  }

  return (
    <div className="space-y-4">
      <InputOTP 
        ref={otpRef}
        maxLength={6} 
        value={value} 
        onChange={handleChange}
        disabled={isSubmitting}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      
      <Button 
        onClick={handleSubmit} 
        disabled={value.length !== 6 || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "확인 중..." : "인증 코드 확인"}
      </Button>
    </div>
  )
}
```

## 커스텀 스타일링

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function CustomStyledOTP() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup className="gap-2">
        <InputOTPSlot 
          index={0} 
          className="w-12 h-12 text-lg font-bold border-2 rounded-lg"
        />
        <InputOTPSlot 
          index={1} 
          className="w-12 h-12 text-lg font-bold border-2 rounded-lg"
        />
        <InputOTPSlot 
          index={2} 
          className="w-12 h-12 text-lg font-bold border-2 rounded-lg"
        />
        <InputOTPSlot 
          index={3} 
          className="w-12 h-12 text-lg font-bold border-2 rounded-lg"
        />
        <InputOTPSlot 
          index={4} 
          className="w-12 h-12 text-lg font-bold border-2 rounded-lg"
        />
        <InputOTPSlot 
          index={5} 
          className="w-12 h-12 text-lg font-bold border-2 rounded-lg"
        />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

## 숫자만 입력 제한

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function NumericOnlyOTP() {
  return (
    <InputOTP 
      maxLength={6}
      pattern="[0-9]*"
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

## 컴포넌트 API

### InputOTP
메인 OTP 입력 컨테이너입니다.

**Props:**
- `maxLength`: 최대 입력 길이
- `value`: 현재 입력 값
- `onChange`: 값 변경 핸들러
- `pattern`: 입력 패턴 (예: "[0-9]*" for 숫자만)
- `disabled`: 비활성화 여부
- `className`: 추가 CSS 클래스

### InputOTPGroup
OTP 슬롯들을 감싸는 그룹 컨테이너입니다.

**Props:**
- `className`: 추가 CSS 클래스

### InputOTPSlot
개별 OTP 입력 슬롯입니다.

**Props:**
- `index`: 슬롯 인덱스 (0부터 시작)
- `className`: 추가 CSS 클래스

## 키보드 네비게이션

Input OTP 컴포넌트는 다음과 같은 키보드 네비게이션을 지원합니다:

- **숫자 키**: 해당 슬롯에 숫자 입력
- **Backspace**: 이전 슬롯으로 이동하며 삭제
- **Delete**: 현재 슬롯 삭제
- **화살표 키**: 슬롯 간 이동
- **Tab**: 다음 슬롯으로 이동

## 접근성

Input OTP 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 스크린 리더 지원
- 키보드 네비게이션
- ARIA 라벨 및 역할 설정
- 포커스 관리
- 입력 패턴 안내

## 사용 사례

### 이메일 인증

```tsx
import { useState } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function EmailVerification() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"email" | "otp">("email")

  const sendOTP = () => {
    console.log("OTP 전송:", email)
    setStep("otp")
  }

  const verifyOTP = () => {
    console.log("OTP 확인:", otp)
    // 인증 로직
  }

  if (step === "email") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4" />
          <input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md"
          />
        </div>
        <Button onClick={sendOTP} className="w-full">
          인증 코드 전송
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {email}로 전송된 6자리 인증 코드를 입력하세요.
      </p>
      
      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      
      <Button onClick={verifyOTP} className="w-full">
        인증 확인
      </Button>
    </div>
  )
}
```
