const fs = require('fs');
const path = require('path');

// 모든 컴포넌트에 대한 완전한 가이드 템플릿
const componentTemplates = {
  button: {
    title: 'Button',
    description: '버튼은 사용자의 주요 액션을 트리거하는 핵심 UI 요소입니다.',
    sections: [
      {
        title: 'Variants',
        description: '버튼은 다양한 스타일 변형을 지원합니다:',
        examples: [
          {
            name: 'Default',
            title: 'Default',
            componentName: 'DefaultButtonExample',
            code: '<Button>Default Button</Button>',
          },
          {
            name: 'Secondary',
            title: 'Secondary',
            componentName: 'SecondaryButtonExample',
            code: '<Button variant="secondary">Secondary Button</Button>',
          },
          {
            name: 'Destructive',
            title: 'Destructive',
            componentName: 'DestructiveButtonExample',
            code: '<Button variant="destructive">Delete</Button>',
          },
          {
            name: 'Outline',
            title: 'Outline',
            componentName: 'OutlineButtonExample',
            code: '<Button variant="outline">Outline Button</Button>',
          },
          {
            name: 'Ghost',
            title: 'Ghost',
            componentName: 'GhostButtonExample',
            code: '<Button variant="ghost">Ghost Button</Button>',
          },
          {
            name: 'Link',
            title: 'Link',
            componentName: 'LinkButtonExample',
            code: '<Button variant="link">Link Button</Button>',
          },
        ],
      },
      {
        title: 'Sizes',
        description: '버튼은 다양한 크기를 지원합니다:',
        examples: [
          {
            name: 'Small',
            title: 'Small',
            componentName: 'SmallButtonExample',
            code: '<Button size="sm">Small Button</Button>',
          },
          {
            name: 'Large',
            title: 'Large',
            componentName: 'LargeButtonExample',
            code: '<Button size="lg">Large Button</Button>',
          },
          {
            name: 'Icon',
            title: 'Icon',
            componentName: 'IconButtonExample',
            code: '<Button size="icon">\n  <Plus className="h-4 w-4" />\n</Button>',
          },
        ],
      },
      {
        title: 'Advanced',
        description: '고급 기능들:',
        examples: [
          {
            name: 'As Child',
            title: 'As Child',
            componentName: 'LinkButtonExample',
            code: '<Button asChild>\n  <Link href="/dashboard">Go to Dashboard</Link>\n</Button>',
          },
        ],
      },
    ],
  },

  badge: {
    title: 'Badge',
    description: '배지는 상태, 카테고리, 알림 등을 표시하는 작은 UI 요소입니다.',
    sections: [
      {
        title: 'Variants',
        description: '다양한 스타일 변형을 지원합니다:',
        examples: [
          {
            name: 'Default',
            title: 'Default',
            componentName: 'DefaultBadgeExample',
            code: '<Badge>Default Badge</Badge>',
          },
          {
            name: 'Status',
            title: 'Status',
            componentName: 'StatusBadgeExample',
            code: '<div className="flex gap-2">\n  <Badge>Active</Badge>\n  <Badge variant="secondary">Pending</Badge>\n  <Badge variant="destructive">Failed</Badge>\n</div>',
          },
        ],
      },
    ],
  },

  input: {
    title: 'Input',
    description: '입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다.',
    sections: [
      {
        title: '기본 타입',
        description: '다양한 입력 타입을 지원합니다:',
        examples: [
          {
            name: 'Text',
            title: 'Text',
            componentName: 'TextInputExample',
            code: '<Input type="text" placeholder="Enter your name" />',
          },
          {
            name: 'Icon Input',
            title: 'Icon Input',
            componentName: 'IconInputExample',
            code: '<div className="relative">\n  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />\n  <Input placeholder="Search..." className="pl-10" />\n</div>',
          },
        ],
      },
    ],
  },

  'input-otp': {
    title: 'Input OTP',
    description: '일회용 비밀번호(OTP) 입력을 위한 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic OTP',
            title: 'Basic OTP',
            componentName: 'BasicOTPExample',
            code: '<InputOTP maxLength={6}>\n  <InputOTPGroup>\n    <InputOTPSlot index={0} />\n    <InputOTPSlot index={1} />\n    <InputOTPSlot index={2} />\n    <InputOTPSlot index={3} />\n    <InputOTPSlot index={4} />\n    <InputOTPSlot index={5} />\n  </InputOTPGroup>\n</InputOTP>',
          },
        ],
      },
    ],
  },

  checkbox: {
    title: 'Checkbox',
    description: '체크박스 컴포넌트 사용 가이드',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Checkbox',
            title: 'Basic Checkbox',
            componentName: 'BasicCheckboxExample',
            code: '<div className="flex items-center space-x-2">\n  <Checkbox id="terms" />\n  <label htmlFor="terms">Accept terms and conditions</label>\n</div>',
          },
          {
            name: 'Checkbox Group',
            title: 'Checkbox Group',
            componentName: 'CheckboxGroupExample',
            code: '<div className="space-y-2">\n  <div className="flex items-center space-x-2">\n    <Checkbox id="react" />\n    <label htmlFor="react">React</label>\n  </div>\n  <div className="flex items-center space-x-2">\n    <Checkbox id="vue" />\n    <label htmlFor="vue">Vue</label>\n  </div>\n</div>',
          },
        ],
      },
    ],
  },

  'radio-group': {
    title: 'Radio Group',
    description: '라디오 그룹 컴포넌트 사용 가이드',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Radio',
            title: 'Basic Radio',
            componentName: 'BasicRadioExample',
            code: '<RadioGroup defaultValue="option-one">\n  <div className="flex items-center space-x-2">\n    <RadioGroupItem value="option-one" id="option-one" />\n    <Label htmlFor="option-one">Option One</Label>\n  </div>\n  <div className="flex items-center space-x-2">\n    <RadioGroupItem value="option-two" id="option-two" />\n    <Label htmlFor="option-two">Option Two</Label>\n  </div>\n</RadioGroup>',
          },
        ],
      },
    ],
  },

  switch: {
    title: 'Switch',
    description: '스위치 컴포넌트 사용 가이드',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Switch',
            title: 'Basic Switch',
            componentName: 'BasicSwitchExample',
            code: '<div className="flex items-center space-x-2">\n  <Switch id="airplane-mode" />\n  <Label htmlFor="airplane-mode">Airplane Mode</Label>\n</div>',
          },
        ],
      },
    ],
  },

  select: {
    title: 'Select',
    description: '셀렉트는 드롭다운 목록에서 옵션을 선택할 수 있는 컴포넌트입니다.',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Select',
            title: 'Basic Select',
            componentName: 'BasicSelectExample',
            code: '<Select>\n  <SelectTrigger className="w-[180px]">\n    <SelectValue placeholder="Select a fruit" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="apple">Apple</SelectItem>\n    <SelectItem value="banana">Banana</SelectItem>\n    <SelectItem value="orange">Orange</SelectItem>\n  </SelectContent>\n</Select>',
          },
          {
            name: 'Small Select',
            title: 'Small Select',
            componentName: 'SmallSelectExample',
            code: '<Select>\n  <SelectTrigger size="sm" className="w-[180px]">\n    <SelectValue placeholder="Select a fruit" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="apple">Apple</SelectItem>\n    <SelectItem value="banana">Banana</SelectItem>\n    <SelectItem value="orange">Orange</SelectItem>\n  </SelectContent>\n</Select>',
          },
        ],
      },
    ],
  },

  'dropdown-menu': {
    title: 'Dropdown Menu',
    description: '드롭다운 메뉴 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Dropdown',
            title: 'Basic Dropdown',
            componentName: 'BasicDropdownExample',
            code: '<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">Open Menu</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Profile</DropdownMenuItem>\n    <DropdownMenuItem>Settings</DropdownMenuItem>\n    <DropdownMenuItem>Logout</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>',
          },
        ],
      },
    ],
  },

  command: {
    title: 'Command',
    description: '명령어 팔레트 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Command',
            title: 'Basic Command',
            componentName: 'BasicCommandExample',
            code: '<Command className="rounded-lg border shadow-md">\n  <CommandInput placeholder="Type a command or search..." />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading="Suggestions">\n      <CommandItem>Calendar</CommandItem>\n      <CommandItem>Search</CommandItem>\n      <CommandItem>Settings</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>',
          },
        ],
      },
    ],
  },

  toggle: {
    title: 'Toggle',
    description: '토글 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Toggle',
            title: 'Basic Toggle',
            componentName: 'BasicToggleExample',
            code: '<div className="flex gap-2">\n  <Toggle aria-label="Toggle bold">\n    <Bold className="h-4 w-4" />\n  </Toggle>\n  <Toggle aria-label="Toggle italic">\n    <Italic className="h-4 w-4" />\n  </Toggle>\n</div>',
          },
        ],
      },
    ],
  },

  'toggle-group': {
    title: 'Toggle Group',
    description: '토글 그룹 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Toggle Group',
            title: 'Basic Toggle Group',
            componentName: 'BasicToggleGroupExample',
            code: '<ToggleGroup type="single">\n  <ToggleGroupItem value="bold" aria-label="Toggle bold">\n    <Bold className="h-4 w-4" />\n  </ToggleGroupItem>\n  <ToggleGroupItem value="italic" aria-label="Toggle italic">\n    <Italic className="h-4 w-4" />\n  </ToggleGroupItem>\n</ToggleGroup>',
          },
        ],
      },
    ],
  },

  slider: {
    title: 'Slider',
    description: '슬라이더 컴포넌트 사용 가이드',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Slider',
            title: 'Basic Slider',
            componentName: 'BasicSliderExample',
            code: '<div className="w-full max-w-sm space-y-4">\n  <Slider defaultValue={[50]} max={100} step={1} />\n  <div className="text-sm text-muted-foreground">Value: 50</div>\n</div>',
          },
        ],
      },
    ],
  },

  progress: {
    title: 'Progress',
    description: '진행률 컴포넌트 사용 가이드',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Progress',
            title: 'Basic Progress',
            componentName: 'BasicProgressExample',
            code: '<div className="w-full max-w-sm space-y-2">\n  <Progress value={33} />\n  <div className="text-sm text-muted-foreground">33% Complete</div>\n</div>',
          },
        ],
      },
    ],
  },

  textarea: {
    title: 'Textarea',
    description: '텍스트 영역 컴포넌트 사용 가이드',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Textarea',
            title: 'Basic Textarea',
            componentName: 'BasicTextareaExample',
            code: '<Textarea placeholder="Type your message here." />',
          },
        ],
      },
    ],
  },

  dialog: {
    title: 'Dialog',
    description: '다이얼로그 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Dialog',
            title: 'Basic Dialog',
            componentName: 'BasicDialogExample',
            code: '<Dialog>\n  <DialogTrigger asChild>\n    <Button variant="outline">Open Dialog</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Are you sure?</DialogTitle>\n      <DialogDescription>\n        This action cannot be undone.\n      </DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <Button variant="outline">Cancel</Button>\n      <Button>Continue</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>',
          },
          {
            name: 'Dialog without Close Button',
            title: 'Dialog without Close Button',
            componentName: 'DialogWithoutCloseExample',
            code: '<Dialog>\n  <DialogTrigger asChild>\n    <Button variant="outline">Open Dialog</Button>\n  </DialogTrigger>\n  <DialogContent showCloseButton={false}>\n    <DialogHeader>\n      <DialogTitle>Custom Dialog</DialogTitle>\n      <DialogDescription>\n        This dialog has no close button.\n      </DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <Button>OK</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>',
          },
        ],
      },
    ],
  },

  'alert-dialog': {
    title: 'Alert Dialog',
    description: '알림 다이얼로그 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Alert Dialog',
            title: 'Basic Alert Dialog',
            componentName: 'BasicAlertDialogExample',
            code: '<AlertDialog>\n  <AlertDialogTrigger asChild>\n    <Button variant="outline">Delete Account</Button>\n  </AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>\n      <AlertDialogDescription>\n        This action cannot be undone.\n      </AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Continue</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>',
          },
        ],
      },
    ],
  },

  sheet: {
    title: 'Sheet',
    description: '시트 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Sheet',
            title: 'Basic Sheet',
            componentName: 'BasicSheetExample',
            code: '<Sheet>\n  <SheetTrigger asChild>\n    <Button variant="outline">Open Sheet</Button>\n  </SheetTrigger>\n  <SheetContent>\n    <SheetHeader>\n      <SheetTitle>Edit profile</SheetTitle>\n      <SheetDescription>\n        Make changes to your profile here.\n      </SheetDescription>\n    </SheetHeader>\n    <div className="py-4">\n      <p>Sheet content goes here...</p>\n    </div>\n  </SheetContent>\n</Sheet>',
          },
        ],
      },
    ],
  },

  drawer: {
    title: 'Drawer',
    description: '화면 가장자리에서 슬라이드되는 패널 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Drawer',
            title: 'Basic Drawer',
            componentName: 'BasicDrawerExample',
            code: '<Drawer>\n  <DrawerTrigger asChild>\n    <Button variant="outline">Open Drawer</Button>\n  </DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Drawer Title</DrawerTitle>\n      <DrawerDescription>Drawer description.</DrawerDescription>\n    </DrawerHeader>\n    <div className="p-4">\n      <p>Drawer content goes here...</p>\n    </div>\n  </DrawerContent>\n</Drawer>',
          },
        ],
      },
    ],
  },

  popover: {
    title: 'Popover',
    description: '팝오버 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Popover',
            title: 'Basic Popover',
            componentName: 'BasicPopoverExample',
            code: '<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Open Popover</Button>\n  </PopoverTrigger>\n  <PopoverContent className="w-80">\n    <div className="grid gap-4">\n      <div className="space-y-2">\n        <h4 className="font-medium leading-none">Dimensions</h4>\n        <p className="text-sm text-muted-foreground">\n          Set the dimensions for the layer.\n        </p>\n      </div>\n    </div>\n  </PopoverContent>\n</Popover>',
          },
        ],
      },
    ],
  },

  'hover-card': {
    title: 'Hover Card',
    description: '호버 카드 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Hover Card',
            title: 'Basic Hover Card',
            componentName: 'BasicHoverCardExample',
            code: '<HoverCard>\n  <HoverCardTrigger asChild>\n    <Button variant="link">@nextjs</Button>\n  </HoverCardTrigger>\n  <HoverCardContent className="w-80">\n    <div className="flex justify-between space-x-4">\n      <div className="space-y-1">\n        <h4 className="text-sm font-semibold">@nextjs</h4>\n        <p className="text-sm">\n          The React Framework for Production\n        </p>\n      </div>\n    </div>\n  </HoverCardContent>\n</HoverCard>',
          },
        ],
      },
    ],
  },

  tooltip: {
    title: 'Tooltip',
    description: '툴팁 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Tooltip',
            title: 'Basic Tooltip',
            componentName: 'BasicTooltipExample',
            code: '<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger asChild>\n      <Button variant="outline">Hover me</Button>\n    </TooltipTrigger>\n    <TooltipContent>\n      <p>Tooltip content</p>\n    </TooltipContent>\n  </Tooltip>\n</TooltipProvider>',
          },
        ],
      },
    ],
  },

  collapsible: {
    title: 'Collapsible',
    description: '접을 수 있는 요소 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Collapsible',
            title: 'Basic Collapsible',
            componentName: 'BasicCollapsibleExample',
            code: '<Collapsible>\n  <CollapsibleTrigger asChild>\n    <Button variant="outline" className="w-full justify-between">\n      Click to expand\n      <ChevronDown className="h-4 w-4" />\n    </Button>\n  </CollapsibleTrigger>\n  <CollapsibleContent>\n    <div className="p-4">\n      <p>This is the collapsible content.</p>\n    </div>\n  </CollapsibleContent>\n</Collapsible>',
          },
        ],
      },
    ],
  },

  tabs: {
    title: 'Tabs',
    description: '탭 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Tabs',
            title: 'Basic Tabs',
            componentName: 'BasicTabsExample',
            code: '<Tabs defaultValue="account" className="w-[400px]">\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="password">Password</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">\n    <p>Account settings content.</p>\n  </TabsContent>\n  <TabsContent value="password">\n    <p>Password settings content.</p>\n  </TabsContent>\n</Tabs>',
          },
        ],
      },
    ],
  },

  accordion: {
    title: 'Accordion',
    description: '아코디언 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Accordion',
            title: 'Basic Accordion',
            componentName: 'BasicAccordionExample',
            code: '<Accordion type="single" collapsible className="w-full">\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It adheres to the WAI-ARIA design pattern.\n    </AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-2">\n    <AccordionTrigger>Is it styled?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It comes with default styles that matches the other components&apos; aesthetic.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>',
          },
        ],
      },
    ],
  },

  table: {
    title: 'Table',
    description: '테이블 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Table',
            title: 'Basic Table',
            componentName: 'BasicTableExample',
            code: '<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Name</TableHead>\n      <TableHead>Email</TableHead>\n      <TableHead>Role</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>John Doe</TableCell>\n      <TableCell>john@example.com</TableCell>\n      <TableCell>Admin</TableCell>\n    </TableRow>\n    <TableRow>\n      <TableCell>Jane Smith</TableCell>\n      <TableCell>jane@example.com</TableCell>\n      <TableCell>User</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>',
          },
        ],
      },
    ],
  },

  pagination: {
    title: 'Pagination',
    description: '페이지네이션 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Pagination',
            title: 'Basic Pagination',
            componentName: 'BasicPaginationExample',
            code: '<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious href="#" />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink href="#">1</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink href="#">2</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationNext href="#" />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>',
          },
        ],
      },
    ],
  },

  calendar: {
    title: 'Calendar',
    description: '캘린더 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Calendar',
            title: 'Basic Calendar',
            componentName: 'BasicCalendarExample',
            code: '<Calendar\n  mode="single"\n  selected={new Date()}\n  className="rounded-md border"\n/>',
          },
        ],
      },
    ],
  },

  carousel: {
    title: 'Carousel',
    description: '이미지나 콘텐츠를 슬라이드 형태로 표시하는 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Carousel',
            title: 'Basic Carousel',
            componentName: 'BasicCarouselExample',
            code: '<Carousel className="w-full max-w-xs">\n  <CarouselContent>\n    {Array.from({ length: 5 }).map((_, index) => (\n      <CarouselItem key={index}>\n        <div className="p-1">\n          <Card>\n            <CardContent className="flex aspect-square items-center justify-center p-6">\n              <span className="text-4xl font-semibold">{index + 1}</span>\n            </CardContent>\n          </Card>\n        </div>\n      </CarouselItem>\n    ))}\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>',
          },
        ],
      },
    ],
  },

  resizable: {
    title: 'Resizable',
    description: '사용자가 크기를 조절할 수 있는 패널 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Resizable',
            title: 'Basic Resizable',
            componentName: 'BasicResizableExample',
            code: '<ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">\n  <ResizablePanel defaultSize={50}>\n    <div className="flex h-full items-center justify-center p-6">\n      <span className="font-semibold">Panel 1</span>\n    </div>\n  </ResizablePanel>\n  <ResizableHandle />\n  <ResizablePanel defaultSize={50}>\n    <div className="flex h-full items-center justify-center p-6">\n      <span className="font-semibold">Panel 2</span>\n    </div>\n  </ResizablePanel>\n</ResizablePanelGroup>',
          },
        ],
      },
    ],
  },

  'scroll-area': {
    title: 'Scroll Area',
    description: '커스텀 스크롤바를 가진 스크롤 가능한 영역 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Scroll Area',
            title: 'Basic Scroll Area',
            componentName: 'BasicScrollAreaExample',
            code: '<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">\n  <div className="space-y-4">\n    {Array.from({ length: 20 }).map((_, i) => (\n      <div key={i} className="text-sm">\n        Item {i + 1}\n      </div>\n    ))}\n  </div>\n</ScrollArea>',
          },
        ],
      },
    ],
  },

  'context-menu': {
    title: 'Context Menu',
    description: '우클릭으로 나타나는 컨텍스트 메뉴 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Context Menu',
            title: 'Basic Context Menu',
            componentName: 'BasicContextMenuExample',
            code: '<ContextMenu>\n  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">\n    Right click here\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Profile</ContextMenuItem>\n    <ContextMenuItem>Settings</ContextMenuItem>\n    <ContextMenuItem>Logout</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>',
          },
        ],
      },
    ],
  },

  breadcrumb: {
    title: 'Breadcrumb',
    description: '네비게이션 계층 구조를 표시하는 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Breadcrumb',
            title: 'Basic Breadcrumb',
            componentName: 'BasicBreadcrumbExample',
            code: '<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="#">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbLink href="#">Components</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>',
          },
        ],
      },
    ],
  },

  avatar: {
    title: 'Avatar',
    description: '아바타 컴포넌트 사용 가이드',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Avatar',
            title: 'Basic Avatar',
            componentName: 'BasicAvatarExample',
            code: '<div className="flex gap-4">\n  <Avatar>\n    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />\n    <AvatarFallback>CN</AvatarFallback>\n  </Avatar>\n  <Avatar>\n    <AvatarFallback>JD</AvatarFallback>\n  </Avatar>\n</div>',
          },
        ],
      },
    ],
  },

  menubar: {
    title: 'Menubar',
    description: '메뉴바 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Menubar',
            title: 'Basic Menubar',
            componentName: 'BasicMenubarExample',
            code: '<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>New File</MenubarItem>\n      <MenubarItem>Open</MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem>Exit</MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>',
          },
        ],
      },
    ],
  },

  'navigation-menu': {
    title: 'Navigation Menu',
    description: '복잡한 네비게이션 구조를 위한 드롭다운 메뉴 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Navigation Menu',
            title: 'Basic Navigation Menu',
            componentName: 'BasicNavigationMenuExample',
            code: '<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink asChild>\n          <a\n            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"\n            href="/"\n          >\n            <div className="text-sm font-medium leading-none">Introduction</div>\n            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">\n              Build high-quality, accessible design systems and web apps.\n            </p>\n          </a>\n        </NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>',
          },
        ],
      },
    ],
  },

  skeleton: {
    title: 'Skeleton',
    description: '스켈레톤 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Skeleton',
            title: 'Basic Skeleton',
            componentName: 'BasicSkeletonExample',
            code: '<div className="space-y-3">\n  <Skeleton className="h-4 w-[250px]" />\n  <Skeleton className="h-4 w-[200px]" />\n  <Skeleton className="h-4 w-[150px]" />\n</div>',
          },
        ],
      },
    ],
  },

  'aspect-ratio': {
    title: 'Aspect Ratio',
    description: '종횡비 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Aspect Ratio',
            title: 'Basic Aspect Ratio',
            componentName: 'BasicAspectRatioExample',
            code: '<div className="w-[200px]">\n  <AspectRatio ratio={16 / 9} className="bg-muted">\n    <div className="flex items-center justify-center">\n      <span className="text-sm text-muted-foreground">16:9</span>\n    </div>\n  </AspectRatio>\n</div>',
          },
        ],
      },
    ],
  },

  alert: {
    title: 'Alert',
    description: '알림 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Alert',
            title: 'Basic Alert',
            componentName: 'BasicAlertExample',
            code: '<Alert>\n  <AlertCircle className="h-4 w-4" />\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>\n    You can add components to your app using the cli.\n  </AlertDescription>\n</Alert>',
          },
        ],
      },
    ],
  },

  separator: {
    title: 'Separator',
    description: '구분선 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Separator',
            title: 'Basic Separator',
            componentName: 'BasicSeparatorExample',
            code: '<div className="space-y-4">\n  <div>Content above</div>\n  <Separator />\n  <div>Content below</div>\n</div>',
          },
        ],
      },
    ],
  },

  card: {
    title: 'Card',
    description: '카드 컴포넌트는 콘텐츠를 그룹화하고 구조화하는 컨테이너입니다.',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Simple Card',
            title: 'Simple Card',
            componentName: 'SimpleCardExample',
            code: '<Card className="w-[300px]">\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card content goes here.</p>\n  </CardContent>\n</Card>',
          },
          {
            name: 'Card with Stats',
            title: 'Card with Stats',
            componentName: 'CardWithStatsExample',
            code: '<Card>\n  <CardContent className="pt-6">\n    <div className="text-2xl font-bold">$1,234</div>\n    <p className="text-xs text-muted-foreground">\n      +20.1% from last month\n    </p>\n  </CardContent>\n</Card>',
          },
          {
            name: 'Card with Action',
            title: 'Card with Action',
            componentName: 'CardWithActionExample',
            code: '<Card className="w-[300px]">\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card description</CardDescription>\n    <CardAction>\n      <Button size="sm">Action</Button>\n    </CardAction>\n  </CardHeader>\n  <CardContent>\n    <p>Card content goes here.</p>\n  </CardContent>\n  <CardFooter>\n    <Button variant="outline" size="sm">Cancel</Button>\n    <Button size="sm">Save</Button>\n  </CardFooter>\n</Card>',
          },
        ],
      },
    ],
  },

  label: {
    title: 'Label',
    description: '라벨 컴포넌트',
    sections: [
      {
        title: '기본 사용법',
        examples: [
          {
            name: 'Basic Label',
            title: 'Basic Label',
            componentName: 'BasicLabelExample',
            code: '<div className="space-y-2">\n  <Label htmlFor="email">Email</Label>\n  <Input id="email" type="email" placeholder="Enter your email" />\n</div>',
          },
        ],
      },
    ],
  },
};

// Props 테이블 생성 함수
function generatePropsTable(componentName) {
  const propsMap = {
    'Button': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'\` | \`'default'\` | 버튼의 스타일 변형 |
| \`size\` | \`'default' | 'sm' | 'lg' | 'icon'\` | \`'default'\` | 버튼의 크기 |
| \`asChild\` | \`boolean\` | \`false\` | 자식 요소를 버튼으로 렌더링 |
| \`disabled\` | \`boolean\` | \`false\` | 버튼 비활성화 |`,

    'Badge': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`'default' | 'secondary' | 'destructive' | 'outline'\` | \`'default'\` | 배지의 스타일 변형 |
| \`asChild\` | \`boolean\` | \`false\` | 자식 요소를 배지로 렌더링 |`,

    'Input': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`type\` | \`string\` | \`'text'\` | 입력 필드 타입 |
| \`placeholder\` | \`string\` | \`undefined\` | 플레이스홀더 텍스트 |
| \`disabled\` | \`boolean\` | \`false\` | 입력 필드 비활성화 |
| \`value\` | \`string\` | \`undefined\` | 입력 값 |
| \`onChange\` | \`(event: ChangeEvent<HTMLInputElement>) => void\` | \`undefined\` | 값 변경 핸들러 |`,

    'Input OTP': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`maxLength\` | \`number\` | \`6\` | 최대 입력 길이 |
| \`value\` | \`string\` | \`undefined\` | OTP 값 |
| \`onChange\` | \`(value: string) => void\` | \`undefined\` | 값 변경 핸들러 |`,

    'Checkbox': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`checked\` | \`boolean\` | \`undefined\` | 체크 상태 |
| \`onCheckedChange\` | \`(checked: boolean) => void\` | \`undefined\` | 체크 상태 변경 핸들러 |
| \`disabled\` | \`boolean\` | \`false\` | 체크박스 비활성화 |
| \`id\` | \`string\` | \`undefined\` | HTML id 속성 |`,

    'Radio Group': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | \`undefined\` | 선택된 값 |
| \`onValueChange\` | \`(value: string) => void\` | \`undefined\` | 값 변경 핸들러 |
| \`defaultValue\` | \`string\` | \`undefined\` | 기본값 |
| \`disabled\` | \`boolean\` | \`false\` | 라디오 그룹 비활성화 |

### RadioGroupItem Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | \`required\` | 라디오 아이템 값 |
| \`disabled\` | \`boolean\` | \`false\` | 라디오 아이템 비활성화 |
| \`id\` | \`string\` | \`undefined\` | HTML id 속성 |`,

    'Switch': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`checked\` | \`boolean\` | \`undefined\` | 스위치 상태 |
| \`onCheckedChange\` | \`(checked: boolean) => void\` | \`undefined\` | 상태 변경 핸들러 |
| \`disabled\` | \`boolean\` | \`false\` | 스위치 비활성화 |
| \`id\` | \`string\` | \`undefined\` | HTML id 속성 |`,

    'Select': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | \`undefined\` | 선택된 값 |
| \`onValueChange\` | \`(value: string) => void\` | \`undefined\` | 값 변경 핸들러 |
| \`defaultValue\` | \`string\` | \`undefined\` | 기본값 |
| \`disabled\` | \`boolean\` | \`false\` | 셀렉트 비활성화 |

### SelectTrigger Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`'sm' | 'default'\` | \`'default'\` | 트리거 크기 |

### SelectContent Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`position\` | \`'popper' | 'item'\` | \`'popper'\` | 위치 설정 |`,

    'Slider': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`number[]\` | \`undefined\` | 슬라이더 값 배열 |
| \`defaultValue\` | \`number[]\` | \`undefined\` | 기본값 배열 |
| \`onValueChange\` | \`(value: number[]) => void\` | \`undefined\` | 값 변경 핸들러 |
| \`min\` | \`number\` | \`0\` | 최솟값 |
| \`max\` | \`number\` | \`100\` | 최댓값 |
| \`step\` | \`number\` | \`1\` | 단계값 |
| \`disabled\` | \`boolean\` | \`false\` | 슬라이더 비활성화 |`,

    'Progress': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`number\` | \`undefined\` | 진행률 값 (0-100) |
| \`max\` | \`number\` | \`100\` | 최댓값 |`,

    'Textarea': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`placeholder\` | \`string\` | \`undefined\` | 플레이스홀더 텍스트 |
| \`disabled\` | \`boolean\` | \`false\` | 텍스트 영역 비활성화 |
| \`value\` | \`string\` | \`undefined\` | 텍스트 값 |
| \`onChange\` | \`(event: ChangeEvent<HTMLTextAreaElement>) => void\` | \`undefined\` | 값 변경 핸들러 |
| \`rows\` | \`number\` | \`undefined\` | 행 수 |`,

    'Dialog': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`open\` | \`boolean\` | \`undefined\` | 다이얼로그 열림 상태 |
| \`onOpenChange\` | \`(open: boolean) => void\` | \`undefined\` | 열림 상태 변경 핸들러 |
| \`defaultOpen\` | \`boolean\` | \`undefined\` | 기본 열림 상태 |

### DialogContent Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`showCloseButton\` | \`boolean\` | \`true\` | 닫기 버튼 표시 여부 |`,

    'Tabs': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | \`undefined\` | 활성 탭 값 |
| \`onValueChange\` | \`(value: string) => void\` | \`undefined\` | 탭 변경 핸들러 |
| \`defaultValue\` | \`string\` | \`undefined\` | 기본 활성 탭 |
| \`orientation\` | \`'horizontal' | 'vertical'\` | \`'horizontal'\` | 탭 방향 |

### TabsTrigger Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | \`required\` | 탭 값 |
| \`disabled\` | \`boolean\` | \`false\` | 탭 비활성화 |`,

    'Accordion': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`type\` | \`'single' | 'multiple'\` | \`required\` | 아코디언 타입 |
| \`value\` | \`string | string[]\` | \`undefined\` | 열린 아이템 값 |
| \`onValueChange\` | \`(value: string | string[]) => void\` | \`undefined\` | 값 변경 핸들러 |
| \`defaultValue\` | \`string | string[]\` | \`undefined\` | 기본값 |
| \`collapsible\` | \`boolean\` | \`false\` | 모든 아이템 닫기 허용 (single 타입만) |

### AccordionItem Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | \`required\` | 아이템 값 |
| \`disabled\` | \`boolean\` | \`false\` | 아이템 비활성화 |`,

    'Calendar': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`mode\` | \`'single' | 'multiple' | 'range'\` | \`'single'\` | 선택 모드 |
| \`selected\` | \`Date | Date[] | DateRange\` | \`undefined\` | 선택된 날짜 |
| \`onSelect\` | \`(date: Date | Date[] | DateRange) => void\` | \`undefined\` | 날짜 선택 핸들러 |
| \`defaultSelected\` | \`Date | Date[] | DateRange\` | \`undefined\` | 기본 선택 날짜 |
| \`disabled\` | \`boolean | Date[] | (date: Date) => boolean\` | \`false\` | 비활성화된 날짜 |
| \`showOutsideDays\` | \`boolean\` | \`true\` | 다른 월의 날짜 표시 |
| \`captionLayout\` | \`'label' | 'dropdown'\` | \`'label'\` | 캡션 레이아웃 |
| \`buttonVariant\` | \`ButtonVariant\` | \`'ghost'\` | 버튼 스타일 |`,

    'Alert': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`'default' | 'destructive'\` | \`'default'\` | 알림의 스타일 변형 |`,

    'Avatar': `| Prop | Type | Default | Description |
|------|------|---------|-------------|

### AvatarImage Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`src\` | \`string\` | \`undefined\` | 이미지 URL |
| \`alt\` | \`string\` | \`undefined\` | 대체 텍스트 |

### AvatarFallback Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`ReactNode\` | \`undefined\` | 폴백 내용 (보통 이니셜) |`,

    'Card': `모든 Card 컴포넌트들은 표준 HTML div props를 상속받습니다.`,

    'default': `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`ReactNode\` | \`undefined\` | 컴포넌트 내용 |`
  };

  return propsMap[componentName] || propsMap['default'];
}

// 마크다운 생성 함수
function generateComponentGuideMarkdown(template) {
  let markdown = `---
title: "${template.title}"
description: "${template.description}"
---

# ${template.title} 컴포넌트

${template.description}

## 기본 사용법

\`\`\`tsx
import { ${template.title} } from '@/components/ui/${template.title.toLowerCase()}';

export function MyComponent() {
  return (
    <${template.title}>기본 ${template.title}</${template.title}>
  );
}
\`\`\`

`;

  // 각 섹션 생성
  template.sections.forEach((section) => {
    markdown += `## ${section.title}\n\n`;

    if (section.description) {
      markdown += `${section.description}\n\n`;
    }

    section.examples.forEach((example) => {
      markdown += `### ${example.title}\n\n`;

      if (example.description) {
        markdown += `${example.description}\n\n`;
      }

      markdown += `:::component-example ${example.componentName}\n`;
      markdown += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`;
      markdown += `<div>\n${example.code}\n</div>\n`;
      markdown += `:::\n\n`;
    });
  });

  // API Reference 섹션 추가
  markdown += `## API Reference

### Props

${generatePropsTable(template.title)}

## 접근성

${template.title} 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
`;

  return markdown;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'component-guide');

// 디렉토리가 없으면 생성
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// 컴포넌트 순서 정의 (사용자 요청 순서)
const componentOrder = [
  'button',
  'badge',
  'input',
  'input-otp',
  'checkbox',
  'radio-group',
  'switch',
  'select',
  'dropdown-menu',
  'command',
  'toggle',
  'toggle-group',
  'slider',
  'progress',
  'textarea',
  'dialog',
  'alert-dialog',
  'sheet',
  'drawer',
  'popover',
  'hover-card',
  'tooltip',
  'collapsible',
  'tabs',
  'accordion',
  'table',
  'pagination',
  'calendar',
  'carousel',
  'resizable',
  'scroll-area',
  'context-menu',
  'breadcrumb',
  'avatar',
  'menubar',
  'navigation-menu',
  'skeleton',
  'aspect-ratio',
  'card',
  'alert',
  'separator',
  'label',
];

// 순서대로 컴포넌트 가이드 생성
componentOrder.forEach((componentName) => {
  if (componentTemplates[componentName]) {
    const template = componentTemplates[componentName];
    const markdown = generateComponentGuideMarkdown(template);
    const filePath = path.join(CONTENT_DIR, `${componentName}.md`);

    fs.writeFileSync(filePath, markdown);
    console.log(`✅ Generated: ${componentName}.md`);
  }
});

console.log('\n🎉 All component guides generated successfully!');
