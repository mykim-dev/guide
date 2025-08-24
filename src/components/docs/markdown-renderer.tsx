'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/ui/copy-button';
import { Button } from '@/components/ui/button';
import { Plus, Download, Settings, Loader2, Search, Mail, Lock, CheckCircle, Clock, AlertCircle, Bold, Italic, Underline, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Calendar } from '@/components/ui/calendar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// 동적 컴포넌트 예제 생성 함수
const createComponentExample = (componentName: string) => {
  const buttonVariants = {
    'Default': { variant: 'default' as const },
    'Secondary': { variant: 'secondary' as const },
    'Destructive': { variant: 'destructive' as const },
    'Outline': { variant: 'outline' as const },
    'Ghost': { variant: 'ghost' as const },
    'Link': { variant: 'link' as const },
  };

  const buttonSizes = {
    'Default': {},
    'Small': { size: 'sm' as const },
    'Large': { size: 'lg' as const },
    'Icon': { size: 'icon' as const },
  };

  const buttonStates = {
    'Disabled': { disabled: true },
    'Loading': { disabled: true },
  };



  // 버튼 variant 예제
  for (const [variant, props] of Object.entries(buttonVariants)) {
    if (componentName.includes(variant) && componentName.includes('Button')) {
      return () => (
        <Button {...props}>
          {variant === 'Destructive' ? 'Delete' : `${variant} Button`}
        </Button>
      );
    }
  }

  // 버튼 size 예제
  for (const [size, props] of Object.entries(buttonSizes)) {
    if (componentName.includes(size) && componentName.includes('Size')) {
      return () => (
        <Button {...props}>
          {size === 'Icon' ? <Plus className="h-4 w-4" /> : `${size} Button`}
        </Button>
      );
    }
  }

  // 버튼 상태 예제
  for (const [state, props] of Object.entries(buttonStates)) {
    if (componentName.includes(state)) {
      if (state === 'Loading') {
        return () => (
          <Button {...props}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </Button>
        );
      }
      return () => (
        <Button {...props}>Disabled Button</Button>
      );
    }
  }

  // 특별한 예제들
  const specialExamples: Record<string, React.ComponentType<any>> = {
    // Button Examples
    'DefaultButtonExample': () => (
      <Button>Default Button</Button>
    ),
    'SecondaryButtonExample': () => (
      <Button variant="secondary">Secondary Button</Button>
    ),
    'DestructiveButtonExample': () => (
      <Button variant="destructive">Delete</Button>
    ),
    'OutlineButtonExample': () => (
      <Button variant="outline">Outline Button</Button>
    ),
    'GhostButtonExample': () => (
      <Button variant="ghost">Ghost Button</Button>
    ),
    'SmallButtonExample': () => (
      <div className="flex gap-4 items-center">
        <Button size="sm">Small Button</Button>
        <Button size="sm" variant="secondary">Small Secondary</Button>
        <Button size="sm" variant="outline">Small Outline</Button>
        <Button size="sm" variant="ghost">Small Ghost</Button>
      </div>
    ),
    'LargeButtonExample': () => (
      <div className="flex gap-4 items-center">
        <Button size="lg">Large Button</Button>
        <Button size="lg" variant="secondary">Large Secondary</Button>
        <Button size="lg" variant="outline">Large Outline</Button>
        <Button size="lg" variant="ghost">Large Ghost</Button>
      </div>
    ),
    'IconButtonExample': () => (
      <div className="flex gap-4 items-center">
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary">
          <Download className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline">
          <Settings className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    ),
    'IconButtonExamples': () => (
      <div className="flex gap-4 items-center">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    ),
    'LinkButtonExample': () => (
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    ),

    // Badge Examples
    'DefaultBadgeExample': () => (
      <div className="flex gap-2">
        <Badge>Default Badge</Badge>
        <Badge variant="secondary">Secondary Badge</Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge variant="outline">Outline Badge</Badge>
      </div>
    ),
    'StatusBadgeExample': () => (
      <div className="flex gap-2">
        <Badge>Active</Badge>
        <Badge variant="secondary">Pending</Badge>
        <Badge variant="destructive">Failed</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
    ),

    // Input Examples
    'TextInputExample': () => (
      <div className="space-y-4">
        <Input type="text" placeholder="Enter your name" />
        <Input type="email" placeholder="Enter your email" />
        <Input type="password" placeholder="Enter your password" />
      </div>
    ),
    'IconInputExample': () => (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="email" placeholder="Email" className="pl-10" />
        </div>
      </div>
    ),

    // Input OTP Examples
    'BasicOTPExample': () => (
      <div className="flex gap-2">
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
      </div>
    ),

    // Checkbox Examples
    'BasicCheckboxExample': () => (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms">Accept terms and conditions</label>
      </div>
    ),
    'CheckboxGroupExample': () => (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="react" />
          <label htmlFor="react">React</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="vue" />
          <label htmlFor="vue">Vue</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="angular" />
          <label htmlFor="angular">Angular</label>
        </div>
      </div>
    ),

    // Radio Group Examples
    'BasicRadioExample': () => (
      <RadioGroup defaultValue="option-one">
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

    // Switch Examples
    'BasicSwitchExample': () => (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    ),

    // Select Examples
    'BasicSelectExample': () => (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    ),
    'SmallSelectExample': () => (
      <Select>
        <SelectTrigger size="sm" className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    ),

    // Dropdown Menu Examples
    'BasicDropdownExample': () => (
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

    // Command Examples
    'BasicCommandExample': () => (
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

    // Toggle Examples
    'BasicToggleExample': () => (
      <div className="flex gap-2">
        <Toggle aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
      </div>
    ),

    // Toggle Group Examples
    'BasicToggleGroupExample': () => (
      <ToggleGroup type="single">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    ),

    // Slider Examples
    'BasicSliderExample': () => (
      <div className="w-full max-w-sm space-y-4">
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="text-sm text-muted-foreground">Value: 50</div>
      </div>
    ),

    // Progress Examples
    'BasicProgressExample': () => (
      <div className="w-full max-w-sm space-y-2">
        <Progress value={33} />
        <div className="text-sm text-muted-foreground">33% Complete</div>
      </div>
    ),

    // Textarea Examples
    'BasicTextareaExample': () => (
      <Textarea placeholder="Type your message here." />
    ),

    // Dialog Examples
    'BasicDialogExample': () => (
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
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    'DialogWithoutCloseExample': () => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Custom Dialog</DialogTitle>
            <DialogDescription>
              This dialog has no close button.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),

    // Alert Dialog Examples
    'BasicAlertDialogExample': () => (
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

    // Sheet Examples
    'BasicSheetExample': () => (
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
          <div className="py-4">
            <p>Sheet content goes here...</p>
          </div>
        </SheetContent>
      </Sheet>
    ),

    // Drawer Examples
    'BasicDrawerExample': () => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>Drawer description.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <p>Drawer content goes here...</p>
          </div>
        </DrawerContent>
      </Drawer>
    ),

    // Popover Examples
    'BasicPopoverExample': () => (
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

    // Hover Card Examples
    'BasicHoverCardExample': () => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">
                The React Framework for Production
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),

    // Tooltip Examples
    'BasicTooltipExample': () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tooltip content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),

    // Collapsible Examples
    'BasicCollapsibleExample': () => (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Click to expand
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4">
            <p>This is the collapsible content.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    ),

    // Tabs Examples
    'BasicTabsExample': () => (
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p>Account settings content.</p>
        </TabsContent>
        <TabsContent value="password">
          <p>Password settings content.</p>
        </TabsContent>
      </Tabs>
    ),

    // Accordion Examples
    'BasicAccordionExample': () => (
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

    // Table Examples
    'BasicTableExample': () => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),

    // Pagination Examples
    'BasicPaginationExample': () => (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),

    // Calendar Examples
    'BasicCalendarExample': () => (
      <Calendar
        mode="single"
        selected={new Date()}
        className="rounded-md border"
      />
    ),

    // Carousel Examples
    'BasicCarouselExample': () => (
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

    // Resizable Examples
    'BasicResizableExample': () => (
      <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
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

    // Scroll Area Examples
    'BasicScrollAreaExample': () => (
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-sm">
              Item {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    ),

    // Context Menu Examples
    'BasicContextMenuExample': () => (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Settings</ContextMenuItem>
          <ContextMenuItem>Logout</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),

    // Breadcrumb Examples
    'BasicBreadcrumbExample': () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),

    // Avatar Examples
    'BasicAvatarExample': () => (
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    ),

    // Menubar Examples
    'BasicMenubarExample': () => (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New File</MenubarItem>
            <MenubarItem>Open</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Exit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),

    // Navigation Menu Examples
    'BasicNavigationMenuExample': () => (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <a
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href="/"
                >
                  <div className="text-sm font-medium leading-none">Introduction</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Build high-quality, accessible design systems and web apps.
                  </p>
                </a>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),

    // Skeleton Examples
    'BasicSkeletonExample': () => (
      <div className="space-y-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    ),

    // Aspect Ratio Examples
    'BasicAspectRatioExample': () => (
      <div className="w-[200px]">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <div className="flex items-center justify-center">
            <span className="text-sm text-muted-foreground">16:9</span>
          </div>
        </AspectRatio>
      </div>
    ),

    // Alert Examples
    'BasicAlertExample': () => (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    ),

    // Separator Examples
    'BasicSeparatorExample': () => (
      <div className="space-y-4">
        <div>Content above</div>
        <Separator />
        <div>Content below</div>
      </div>
    ),

    // Card Examples
    'SimpleCardExample': () => (
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
      </Card>
    ),
    'CardWithStatsExample': () => (
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">$1,234</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
    ),
    'CardWithActionExample': () => (
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
          <CardAction>
            <Button size="sm">Action</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </CardFooter>
      </Card>
    ),

    // Label Examples
    'BasicLabelExample': () => (
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    ),
  };

  return specialExamples[componentName] || (() => <div>Component not found: {componentName}</div>);
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // 컴포넌트 예제 블록을 처리하는 함수
  const processComponentExamples = (content: string): string => {
    const componentBlockRegex = /:::component-example\s+(\w+)\s*\n([\s\S]*?):::/g;

    return content.replace(componentBlockRegex, (match, componentName, blockContent) => {
      // 코드 블록과 컴포넌트를 분리
      const codeMatch = blockContent.match(/```tsx\s*\n([\s\S]*?)\n```/);
      const codeText = codeMatch ? codeMatch[1].trim() : '';

      // 코드 블록 이후의 내용을 컴포넌트로 추출
      const componentMatch = blockContent.replace(/```tsx\s*\n[\s\S]*?\n```\s*\n/, '');
      const componentText = componentMatch.trim();

      return `\n<div class="component-example" data-code="${encodeURIComponent(codeText)}" data-component="${componentName}">\n${componentText}\n</div>\n`;
    });
  };

  const processedContent = processComponentExamples(content);

  return (
    <div className={cn('prose prose-gray dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkEmoji, remarkBreaks]}
        rehypePlugins={[
          rehypeHighlight,
          rehypeRaw,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold mb-4 mt-8 first:mt-0" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-bold mb-3 mt-6" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-bold mb-2 mt-6" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-lg font-bold mb-2 mt-4" {...props}>
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p className="border border-blue-500" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside mb-8 space-y-1 border border-red-500" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside mb-8 space-y-1  border border-red-500" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="ml-4" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props}>
              {children}
            </blockquote>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => {
            // Check if this is a code block with tsx language
            const codeElement = children as React.ReactElement;
            const isTsxCode = codeElement?.props?.className?.includes('language-tsx');

            // Extract the actual text content from the code block
            const extractTextContent = (element: React.ReactElement): string => {
              if (typeof element.props?.children === 'string') {
                return element.props.children;
              }
              if (Array.isArray(element.props?.children)) {
                return element.props.children
                  .map((child: React.ReactNode) => {
                    if (typeof child === 'string') {
                      return child;
                    }
                    if (typeof child === 'object' && child.props) {
                      return extractTextContent(child);
                    }
                    return '';
                  })
                  .join('');
              }
              return '';
            };

            const codeContent = isTsxCode ? extractTextContent(codeElement) : '';

            return (
              <div className="relative group">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props}>
                  {children}
                </pre>
                {isTsxCode && codeContent && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton
                      text={codeContent}
                      className="bg-background/80 backdrop-blur-sm hover:bg-background"
                    />
                  </div>
                )}
              </div>
            );
          },
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-8  border border-red-500">
              <table className="w-full border-collapse border border-border" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border px-4 py-2 bg-muted font-semibold" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-4 py-2" {...props}>
              {children}
            </td>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-primary hover:underline"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-lg my-4"
              {...props}
            />
          ),
          div: ({ children, className, ...props }: any) => {
            // 컴포넌트 예제 블록 처리
            if (className === 'component-example') {
              const codeText = decodeURIComponent(props['data-code'] || '');
              const componentName = props['data-component'];
              const ComponentExample = createComponentExample(componentName);

              return (
                <Tabs defaultValue="preview" className="p-0 mb-8 gap-0 border rounded-md bg-muted overflow-hidden border-red-500">
                  <TabsList className="">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="p-8 bg-background">
                    <div className="component-preview">
                      <ComponentExample />
                    </div>
                  </TabsContent>
                  <TabsContent value="code" className="p-0 bg-background relative">
                    <pre className="p-8 overflow-x-auto text-sm">
                      <code className="language-tsx">{codeText}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <CopyButton
                        text={codeText}
                        className="bg-background/80 backdrop-blur-sm hover:bg-background"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              );
            }

            return (
              <div className={className} {...props}>
                {children}
              </div>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
