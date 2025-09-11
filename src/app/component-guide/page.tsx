import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Calendar } from '@/components/ui/calendar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { BadgeCheckIcon, GitBranch, Loader2Icon } from 'lucide-react';

const components = [
  {
    title: 'Button',
    description: '다양한 스타일과 크기의 버튼 컴포넌트',
    component: (
      <div className="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="customer">Customer</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline" size="icon">
          <GitBranch />
        </Button>
        <Button disabled>
          <Loader2Icon className="animate-spin" />
          Please wait
        </Button>
      </div>
    ),
    link: '/component-guide/button',
  },
  {
    title: 'Badge',
    description: '상태나 카테고리를 표시하는 배지',
    component: (
      <div className="flex flex-wrap gap-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="customer">Customer</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="secondary">
          <BadgeCheckIcon />
          Verified
        </Badge>
        <Badge className="rounded-full">
          8
        </Badge>
        <Badge
          className="rounded-full"
          variant="outline"
        >
          20+
        </Badge>
      </div>
    ),
    link: '/component-guide/badge',
  },
  {
    title: 'Input',
    description: '텍스트 입력 필드',
    component: (
      <div className="space-y-2">
        <Input placeholder="Enter your text here" />
      </div>
    ),
    link: '/component-guide/input',
  },
  {
    title: 'Input OTP',
    description: 'OTP 입력 컴포넌트',
    component: (
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
    ),
    link: '/component-guide/input-otp',
  },
  {
    title: 'Checkbox',
    description: '체크박스 컴포넌트',
    component: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    ),
    link: '/component-guide/checkbox',
  },
  {
    title: 'Radio Group',
    description: '라디오 버튼 그룹 컴포넌트',
    component: (
      <RadioGroup defaultValue="option-one" className="flex gap-6">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>
    ),
    link: '/component-guide/radio-group',
  },
  {
    title: 'Switch',
    description: '토글 스위치 컴포넌트',
    component: (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    ),
    link: '/component-guide/switch',
  },
  {
    title: 'Select',
    description: '드롭다운 선택 컴포넌트',
    component: (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    ),
    link: '/component-guide/select',
  },
  {
    title: 'Dropdown Menu',
    description: '드롭다운 메뉴 컴포넌트',
    component: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    link: '/component-guide/dropdown-menu',
  },
  {
    title: 'Textarea',
    description: '여러 줄 텍스트 입력 필드',
    component: (
      <Textarea placeholder="Enter your message here" />
    ),
    link: '/component-guide/textarea',
  },
  {
    title: 'Toggle',
    description: '토글 버튼 컴포넌트',
    component: (
      <Toggle aria-label="Toggle italic">
        <span className="text-sm">Bold</span>
      </Toggle>
    ),
    link: '/component-guide/toggle',
  },
  {
    title: 'Toggle Group',
    description: '토글 그룹 컴포넌트',
    component: (
      <ToggleGroup type="single">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          I
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          U
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    link: '/component-guide/toggle-group',
  },
  {
    title: 'Command',
    description: '명령어 팔레트 컴포넌트',
    component: (
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
    link: '/component-guide/command',
  },
  {
    title: 'Slider',
    description: '슬라이더 컴포넌트',
    component: (
      <div className="w-[200px]">
        <Slider defaultValue={[33]} max={100} step={1} />
      </div>
    ),
    link: '/component-guide/slider',
  },
  {
    title: 'Progress',
    description: '진행률 표시 컴포넌트',
    component: (
      <div className="w-[200px]">
        <Progress value={33} />
      </div>
    ),
    link: '/component-guide/progress',
  },
  {
    title: 'Dialog',
    description: '모달 다이얼로그 컴포넌트',
    component: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
    link: '/component-guide/dialog',
  },
  {
    title: 'Alert Dialog',
    description: '확인 다이얼로그 컴포넌트',
    component: (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    link: '/component-guide/alert-dialog',
  },
  {
    title: 'Sheet',
    description: '사이드 시트 컴포넌트',
    component: (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ),
    link: '/component-guide/sheet',
  },
  {
    title: 'Drawer',
    description: '드로어 컴포넌트',
    component: (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <p>Drawer content goes here.</p>
          </div>
          <DrawerFooter>
            <Button>Save changes</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    link: '/component-guide/drawer',
  },
  {
    title: 'Popover',
    description: '팝오버 컴포넌트',
    component: (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
    link: '/component-guide/popover',
  },
  {
    title: 'Hover Card',
    description: '호버 카드 컴포넌트',
    component: (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div>
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">
                The React Framework for Production.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
    link: '/component-guide/hover-card',
  },
  {
    title: 'Tooltip',
    description: '툴팁 컴포넌트',
    component: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    link: '/component-guide/tooltip',
  },
  {
    title: 'Collapsible',
    description: '접을 수 있는 컨텐츠 컴포넌트',
    component: (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline">Toggle Content</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4">
            This content can be collapsed and expanded.
          </div>
        </CollapsibleContent>
      </Collapsible>
    ),
    link: '/component-guide/collapsible',
  },
  {
    title: 'Tabs',
    description: '탭 컴포넌트',
    component: (
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Account settings content
        </TabsContent>
        <TabsContent value="password">
          Password settings content
        </TabsContent>
      </Tabs>
    ),
    link: '/component-guide/tabs',
  },
  {
    title: 'Accordion',
    description: '아코디언 컴포넌트',
    component: (
      <Accordion type="single" collapsible className="w-full">
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
      </Accordion>
    ),
    link: '/component-guide/accordion',
  },
  {
    title: 'Table',
    description: '테이블 컴포넌트',
    component: (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    link: '/component-guide/table',
  },
  {
    title: 'Pagination',
    description: '페이지네이션 컴포넌트',
    component: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious size="default" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="default">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="default">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext size="default" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    link: '/component-guide/pagination',
  },
  {
    title: 'Calendar',
    description: '달력 컴포넌트',
    component: (
      <Calendar
        mode="single"
        selected={new Date()}
        className="rounded-md border"
      />
    ),
    link: '/component-guide/calendar',
  },
  {
    title: 'Carousel',
    description: '캐러셀 컴포넌트',
    component: (
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
    link: '/component-guide/carousel',
  },
  {
    title: 'Resizable',
    description: '크기 조절 가능한 패널 컴포넌트',
    component: (
      <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-md rounded-lg border mx-auto">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Panel 1</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Panel 2</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
    link: '/component-guide/resizable',
  },
  {
    title: 'Scroll Area',
    description: '스크롤 영역 컴포넌트',
    component: (
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-sm">
              Scrollable content {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
    link: '/component-guide/scroll-area',
  },
  {
    title: 'Context Menu',
    description: '컨텍스트 메뉴 컴포넌트',
    component: (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
    link: '/component-guide/context-menu',
  },
  {
    title: 'Breadcrumb',
    description: '브레드크럼 네비게이션 컴포넌트',
    component: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    link: '/component-guide/breadcrumb',
  },
  {
    title: 'Avatar',
    description: '사용자 아바타 컴포넌트',
    component: (
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    ),
    link: '/component-guide/avatar',
  },
  {
    title: 'Menubar',
    description: '메뉴바 컴포넌트',
    component: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    link: '/component-guide/menubar',
  },
  {
    title: 'Navigation Menu',
    description: '네비게이션 메뉴 컴포넌트',
    component: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px]">
                <div>
                  <h4 className="text-sm font-medium">Introduction</h4>
                  <p className="text-sm text-muted-foreground">
                    Build high-quality, accessible design systems.
                  </p>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
    link: '/component-guide/navigation-menu',
  },
  {
    title: 'Skeleton',
    description: '로딩 스켈레톤 컴포넌트',
    component: (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ),
    link: '/component-guide/skeleton',
  },
  {
    title: 'Aspect Ratio',
    description: '종횡비 유지 컴포넌트',
    component: (
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <div className="flex items-center justify-center">
          <span className="text-sm text-muted-foreground">16:9</span>
        </div>
      </AspectRatio>
    ),
    link: '/component-guide/aspect-ratio',
  },
];

export default function ComponentsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">컴포넌트 가이드</h1>
        <p className="text-muted-foreground">
          shadcn/ui 기반의 재사용 가능한 <strong>{components.length}개</strong>의 컴포넌트들을 확인하세요.
        </p>
      </div>

      {/* <div className="grid grid-cols-[1fr_7fr]"> */}
      {/* 목차 */}
      {/* <nav className="bg-background border border-border rounded-xl">
          <h3 className="text-sm font-semibold p-4 text-muted-foreground">컴포넌트({components.length})</h3>
          <ScrollArea className="h-[calc(100svh-20rem)]">
            <ul className="space-y-2 p-4 pt-0">
              {components.map((component, index) => (
                <li key={component.title}>
                  <a
                    href={`#${component.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {index + 1}. {component.title}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </nav> */}

      {/* <ScrollArea className="h-[calc(100svh-16rem)]"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
        {components.map((component) => (
          <Card
            key={component.title}
            id={component.title.toLowerCase().replace(/\s+/g, '-')}
            className="flex flex-col justify-between"
          >
            <CardHeader>
              <CardTitle>{component.title}</CardTitle>
              <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {component.component}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href={component.link}>
                자세히 보기 →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* </ScrollArea> */}
      {/* </div> */}
    </>
  );
}
