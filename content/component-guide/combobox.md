---
title: Combobox
description: 검색 가능한 드롭다운 선택 컴포넌트 (Command 기반)
---

# Combobox

Combobox는 Command 컴포넌트를 기반으로 한 검색 가능한 드롭다운 선택 컴포넌트입니다. 사용자가 옵션을 검색하고 선택할 수 있습니다.

## 기본 사용법

```tsx
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export default function BasicCombobox() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "프레임워크 선택..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="프레임워크 검색..." />
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

## 다중 선택 Combobox

```tsx
import { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const skills = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
]

export default function MultiSelectCombobox() {
  const [open, setOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleSelect = (value: string) => {
    setSelectedValues(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const handleRemove = (value: string) => {
    setSelectedValues(prev => prev.filter(item => item !== value))
  }

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            {selectedValues.length > 0
              ? `${selectedValues.length}개 선택됨`
              : "기술 스택 선택..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="기술 스택 검색..." />
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {skills.map((skill) => (
                <CommandItem
                  key={skill.value}
                  value={skill.value}
                  onSelect={() => handleSelect(skill.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(skill.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {skill.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value) => {
            const skill = skills.find(s => s.value === value)
            return (
              <Badge key={value} variant="secondary" className="text-sm">
                {skill?.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => handleRemove(value)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

## 비동기 데이터 Combobox

```tsx
import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface User {
  id: number
  name: string
  email: string
}

export default function AsyncCombobox() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchUsers = async (search: string = "") => {
    setLoading(true)
    
    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockUsers: User[] = [
      { id: 1, name: "김철수", email: "kim@example.com" },
      { id: 2, name: "이영희", email: "lee@example.com" },
      { id: 3, name: "박민수", email: "park@example.com" },
      { id: 4, name: "정수진", email: "jung@example.com" },
      { id: 5, name: "최동현", email: "choi@example.com" },
    ]
    
    const filteredUsers = search
      ? mockUsers.filter(user => 
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        )
      : mockUsers
    
    setUsers(filteredUsers)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers(searchTerm)
  }, [searchTerm])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? users.find((user) => user.id.toString() === value)?.name
            : "사용자 선택..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput 
            placeholder="사용자 검색..." 
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="ml-2 text-sm">검색 중...</span>
            </div>
          ) : (
            <>
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.id.toString()}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.id.toString() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

## 그룹화된 Combobox

```tsx
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const options = [
  {
    group: "프론트엔드",
    items: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ]
  },
  {
    group: "백엔드",
    items: [
      { value: "nodejs", label: "Node.js" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
      { value: "csharp", label: "C#" },
    ]
  },
  {
    group: "데이터베이스",
    items: [
      { value: "mysql", label: "MySQL" },
      { value: "postgresql", label: "PostgreSQL" },
      { value: "mongodb", label: "MongoDB" },
      { value: "redis", label: "Redis" },
    ]
  }
]

export default function GroupedCombobox() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const allItems = options.flatMap(group => group.items)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? allItems.find((item) => item.value === value)?.label
            : "기술 선택..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="기술 검색..." />
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          {options.map((group) => (
            <CommandGroup key={group.group} heading={group.group}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

## 컴포넌트 API

Combobox는 여러 컴포넌트를 조합하여 만들어집니다:

### Popover
드롭다운 컨테이너를 제공합니다.

### Command
검색 및 선택 기능을 제공합니다.

### CommandInput
검색 입력 필드입니다.

### CommandEmpty
검색 결과가 없을 때 표시되는 메시지입니다.

### CommandGroup
옵션들을 그룹화합니다.

### CommandItem
개별 선택 옵션입니다.

## 접근성

Combobox는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 지원
- ARIA 라벨 및 역할 설정
- 포커스 관리
- 검색 기능

## 커스텀 렌더링

```tsx
import { useState } from "react"
import { Check, ChevronsUpDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const users = [
  { value: "1", name: "김철수", email: "kim@example.com", avatar: "/avatars/01.png" },
  { value: "2", name: "이영희", email: "lee@example.com", avatar: "/avatars/02.png" },
  { value: "3", name: "박민수", email: "park@example.com", avatar: "/avatars/03.png" },
  { value: "4", name: "정수진", email: "jung@example.com", avatar: "/avatars/04.png" },
]

export default function CustomCombobox() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const selectedUser = users.find(user => user.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedUser ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={selectedUser.avatar} />
                <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
              </Avatar>
              <span>{selectedUser.name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>사용자 선택...</span>
            </div>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="사용자 검색..." />
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup>
            {users.map((user) => (
              <CommandItem
                key={user.value}
                value={user.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === user.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```
