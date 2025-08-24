---
title: "Date Picker"
description: "Date Picker는 Calendar 컴포넌트를 기반으로 한 날짜 선택 컴포넌트입니다. 사용자가 쉽게 날짜를 선택할 수 있는 인터페이스를 제공합니다."
---

## 기본 사용법

```tsx
import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function BasicDatePicker() {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ko }) : "날짜를 선택하세요"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
```

## 날짜 범위 선택

```tsx
import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function DateRangePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: new Date(2024, 0, 30),
  })

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: ko })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: ko })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: ko })
              )
            ) : (
              "날짜 범위를 선택하세요"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
```

## 예약 시스템 Date Picker

```tsx
import { useState } from "react"
import { format, addDays, isBefore, isAfter } from "date-fns"
import { ko } from "date-fns/locale"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00"
]

export default function ReservationDatePicker() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  
  const today = new Date()
  const maxDate = addDays(today, 30) // 30일 후까지만 예약 가능

  const isDateDisabled = (date: Date) => {
    return isBefore(date, today) || isAfter(date, maxDate)
  }

  const handleReservation = () => {
    if (date && time) {
      console.log("예약 정보:", {
        date: format(date, "yyyy-MM-dd"),
        time: time,
        datetime: format(date, "PPP", { locale: ko }) + " " + time
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>예약 날짜</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: ko }) : "날짜를 선택하세요"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={isDateDisabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label>예약 시간</Label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="w-[280px]">
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="시간을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={handleReservation} 
        disabled={!date || !time}
        className="w-[280px]"
      >
        예약하기
      </Button>
      
      {date && time && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm">
            <strong>선택된 예약:</strong><br />
            {format(date, "PPP", { locale: ko })} {time}
          </p>
        </div>
      )}
    </div>
  )
}
```

## 생일 선택 Date Picker

```tsx
import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Calendar as CalendarIcon, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function BirthdayPicker() {
  const [birthDate, setBirthDate] = useState<Date>()
  
  const today = new Date()
  const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate()) // 13세 이상
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()) // 100세 이하

  const calculateAge = (birthDate: Date) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">생년월일</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !birthDate && "text-muted-foreground"
              )}
            >
              <Gift className="mr-2 h-4 w-4" />
              {birthDate ? format(birthDate, "PPP", { locale: ko }) : "생년월일을 선택하세요"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={birthDate}
              onSelect={setBirthDate}
              disabled={(date) => 
                date > maxDate || date < minDate
              }
              initialFocus
              defaultMonth={new Date(2000, 0)}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {birthDate && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm">
            <strong>나이:</strong> {calculateAge(birthDate)}세
          </p>
        </div>
      )}
    </div>
  )
}
```

## 컴포넌트 API

Date Picker는 Calendar와 Popover 컴포넌트를 조합하여 만들어집니다:

### Calendar
날짜 선택 캘린더를 제공합니다.

**Props:**
- `mode`: 선택 모드 ("single" | "range" | "multiple")
- `selected`: 선택된 날짜
- `onSelect`: 날짜 선택 핸들러
- `disabled`: 비활성화할 날짜들
- `defaultMonth`: 기본 표시 월
- `numberOfMonths`: 표시할 월 수

### Popover
드롭다운 컨테이너를 제공합니다.

## 접근성

Date Picker는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 지원
- ARIA 라벨 및 역할 설정
- 포커스 관리
- 날짜 형식 안내

## 국제화

```tsx
import { useState } from "react"
import { format } from "date-fns"
import { ko, en, ja } from "date-fns/locale"
import { Calendar as CalendarIcon, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const locales = {
  ko: { locale: ko, label: "한국어" },
  en: { locale: en, label: "English" },
  ja: { locale: ja, label: "日本語" }
}

export default function InternationalDatePicker() {
  const [date, setDate] = useState<Date>()
  const [selectedLocale, setSelectedLocale] = useState<keyof typeof locales>("ko")

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Globe className="h-4 w-4" />
        <Select value={selectedLocale} onValueChange={(value: keyof typeof locales) => setSelectedLocale(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(locales).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: locales[selectedLocale].locale }) : "날짜를 선택하세요"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            locale={locales[selectedLocale].locale}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
```
