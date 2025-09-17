/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Home, Inbox, Calendar, Search, Settings, PanelLeft } from 'lucide-react';

const components = {
  button: {
    name: 'Button',
    component: Button,
    props: {
      variant: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      size: ['default', 'sm', 'lg', 'icon'],
      disabled: [false, true],
    },
  },
  input: {
    name: 'Input',
    component: Input,
    props: {
      type: ['text', 'email', 'password', 'number'],
      placeholder: ['Enter text...', 'Enter email...', 'Enter password...'],
      disabled: [false, true],
    },
  },
  textarea: {
    name: 'Textarea',
    component: Textarea,
    props: {
      placeholder: ['Enter your message...', 'Type here...'],
      disabled: [false, true],
    },
  },
  select: {
    name: 'Select',
    component: Select,
    props: {
      disabled: [false, true],
    },
  },
  checkbox: {
    name: 'Checkbox',
    component: Checkbox,
    props: {
      disabled: [false, true],
    },
  },
  radioGroup: {
    name: 'Radio Group',
    component: RadioGroup,
    props: {
      disabled: [false, true],
    },
  },
  switch: {
    name: 'Switch',
    component: Switch,
    props: {
      disabled: [false, true],
    },
  },
  slider: {
    name: 'Slider',
    component: Slider,
    props: {
      max: [50, 100, 200],
      step: [1, 5, 10],
      disabled: [false, true],
    },
  },
  badge: {
    name: 'Badge',
    component: Badge,
    props: {
      variant: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
  avatar: {
    name: 'Avatar',
    component: Avatar,
    props: {
      src: ['https://github.com/shadcn.png', 'https://avatars.githubusercontent.com/u/1?v=4'],
    },
  },
  progress: {
    name: 'Progress',
    component: Progress,
    props: {
      value: [0, 25, 50, 75, 100],
    },
  },
  alert: {
    name: 'Alert',
    component: Alert,
    props: {
      variant: ['default', 'destructive'],
    },
  },
  skeleton: {
    name: 'Skeleton',
    component: Skeleton,
    props: {
      // Skeleton은 기본 스타일로 고정
    },
  },
  toggle: {
    name: 'Toggle',
    component: Toggle,
    props: {
      disabled: [false, true],
      pressed: [true, false],
    },
  },
  toggleGroup: {
    name: 'Toggle Group',
    component: ToggleGroup,
    props: {
      type: ['single', 'multiple'],
      variant: ['default', 'outline'],
      size: ['default', 'sm', 'lg'],
      disabled: [false, true],
    },
  },
  collapsible: {
    name: 'Collapsible',
    component: Collapsible,
    props: {
      defaultOpen: [false, true],
    },
  },
  aspectRatio: {
    name: 'Aspect Ratio',
    component: AspectRatio,
    props: {
      ratio: [16 / 9, 4 / 3, 1 / 1, 21 / 9],
    },
  },
  inputOTP: {
    name: 'Input OTP',
    component: InputOTP,
    props: {
      maxLength: [4, 6, 8],
      disabled: [false, true],
    },
  },
  calendar: {
    name: 'Calendar',
    component: CalendarComponent,
    props: {
      showOutsideDays: [false, true],
      captionLayout: ['label', 'dropdown'],
    },
  },
  pagination: {
    name: 'Pagination',
    component: Pagination,
    props: {
      // Pagination은 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  breadcrumb: {
    name: 'Breadcrumb',
    component: Breadcrumb,
    props: {
      // Breadcrumb은 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  carousel: {
    name: 'Carousel',
    component: Carousel,
    props: {
      // Carousel은 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  navigationMenu: {
    name: 'Navigation Menu',
    component: NavigationMenu,
    props: {
      // NavigationMenu는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  resizable: {
    name: 'Resizable',
    component: ResizablePanelGroup,
    props: {
      direction: ['horizontal', 'vertical'],
    },
  },
  scrollArea: {
    name: 'Scroll Area',
    component: ScrollArea,
    props: {
      scrollBarOrientation: ['vertical', 'horizontal', 'both'],
    },
  },
  drawer: {
    name: 'Drawer',
    component: Drawer,
    props: {
      // Drawer는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  contextMenu: {
    name: 'Context Menu',
    component: ContextMenu,
    props: {
      // ContextMenu는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  menubar: {
    name: 'Menubar',
    component: Menubar,
    props: {
      // Menubar는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  dialog: {
    name: 'Dialog',
    component: Dialog,
    props: {
      // Dialog는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  alertDialog: {
    name: 'Alert Dialog',
    component: AlertDialog,
    props: {
      // AlertDialog는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  sheet: {
    name: 'Sheet',
    component: Sheet,
    props: {
      // Sheet는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  dropdownMenu: {
    name: 'Dropdown Menu',
    component: DropdownMenu,
    props: {
      // DropdownMenu는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  popover: {
    name: 'Popover',
    component: Popover,
    props: {
      // Popover는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  tooltip: {
    name: 'Tooltip',
    component: Tooltip,
    props: {
      // Tooltip은 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  hoverCard: {
    name: 'Hover Card',
    component: HoverCard,
    props: {
      // HoverCard는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  tabs: {
    name: 'Tabs',
    component: Tabs,
    props: {
      // Tabs props 대신 기본 렌더링
    },
  },
  accordion: {
    name: 'Accordion',
    component: Accordion,
    props: {
      type: ['single', 'multiple'],
    },
  },
  table: {
    name: 'Table',
    component: Table,
    props: {
      // Table은 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  command: {
    name: 'Command',
    component: Command,
    props: {
      // Command는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
  sidebar: {
    name: 'Sidebar',
    component: Sidebar,
    props: {
      // Sidebar는 내부 구조가 복잡하여 props 대신 기본 렌더링
    },
  },
};

export default function PlaygroundPage() {
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentComponent = components[selectedComponent as keyof typeof components];

  // 컴포넌트가 변경될 때마다 props 초기화
  useEffect(() => {
    setComponentProps({});
  }, [selectedComponent]);

  const updateProp = (prop: string, value: unknown) => {
    setComponentProps(prev => ({
      ...prev,
      [prop]: value,
    }));
  };

  const renderComponent = () => {
    const Component = currentComponent.component;
    const props = { ...componentProps };

    // 특별한 처리
    if (selectedComponent === 'button') {
      if (props.size === 'icon') {
        return (
          <Component {...(props as any)}>
            <span className="h-4 w-4">+</span>
          </Component>
        );
      }
      return <Component {...(props as any)}>Button</Component>;
    }

    if (selectedComponent === 'input') {
      return <Component {...(props as any)} />;
    }

    if (selectedComponent === 'textarea') {
      return <Component {...(props as any)} />;
    }

    if (selectedComponent === 'select') {
      return (
        <Component {...(props as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Component>
      );
    }

    if (selectedComponent === 'checkbox') {
      return (
        <div className="flex items-center space-x-2">
          <Component {...(props as any)} id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      );
    }

    if (selectedComponent === 'radioGroup') {
      return (
        <Component {...props as any} defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </Component>
      );
    }

    if (selectedComponent === 'switch') {
      return (
        <div className="flex items-center space-x-2">
          <Component {...props as any} id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      );
    }

    if (selectedComponent === 'slider') {
      return (
        <div className="w-[200px]">
          <Component {...props as any} defaultValue={[33]} />
        </div>
      );
    }

    if (selectedComponent === 'badge') {
      return <Component {...props as any}>Badge</Component>;
    }

    if (selectedComponent === 'avatar') {
      return (
        <Component {...(props as any)}>
          <AvatarImage src={props.src === 'https://avatars.githubusercontent.com/u/1?v=4' ? undefined : (props.src as string)} />
          <AvatarFallback>CN</AvatarFallback>
        </Component>
      );
    }

    if (selectedComponent === 'progress') {
      return <Component {...(props as any)} />;
    }

    if (selectedComponent === 'alert') {
      return (
        <Component {...(props as any)}>
          <AlertDescription>
            This is an alert message for important information.
          </AlertDescription>
        </Component>
      );
    }

    if (selectedComponent === 'skeleton') {
      return <Component {...props as any} className="h-4 w-[250px]" />;
    }

    if (selectedComponent === 'toggle') {
      return (
        <Component {...props as any} aria-label="Toggle italic">
          <span className="text-sm">Bold</span>
        </Component>
      );
    }

    if (selectedComponent === 'toggleGroup') {
      return (
        <Component {...props as any} type={props.type || 'single'}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            B
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            I
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            U
          </ToggleGroupItem>
        </Component>
      );
    }

    if (selectedComponent === 'collapsible') {
      return (
        <Component {...(props as any)}>
          <CollapsibleTrigger asChild>
            <Button variant="outline">Toggle Content</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4">
              This content can be collapsed and expanded.
            </div>
          </CollapsibleContent>
        </Component>
      );
    }

    if (selectedComponent === 'aspectRatio') {
      return (
        <Component {...props as any} className="bg-muted">
          <div className="flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Aspect Ratio</span>
          </div>
        </Component>
      );
    }

    if (selectedComponent === 'inputOTP') {
      return (
        <Component {...(props as any)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </Component>
      );
    }

    if (selectedComponent === 'calendar') {
      return (
        <Component
          {...props as any}
          className="rounded-md border min-w-[300px]"
        />
      );
    }

    if (selectedComponent === 'pagination') {
      return (
        <Component {...(props as any)}>
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
        </Component>
      );
    }

    if (selectedComponent === 'breadcrumb') {
      return (
        <Component {...(props as any)}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Component>
      );
    }

    if (selectedComponent === 'carousel') {
      return (
        <Component {...props as any} className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent>
                      <div className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Component>
      );
    }

    if (selectedComponent === 'navigationMenu') {
      return (
        <Component {...(props as any)}>
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
        </Component>
      );
    }

    if (selectedComponent === 'resizable') {
      const direction = (props.direction as 'horizontal' | 'vertical') || 'horizontal';
      return (
        <ResizablePanelGroup
          direction={direction}
          className="min-h-[200px] max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6 bg-muted/50">
              <span className="font-semibold">Panel 1</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-border" />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6 bg-muted/30">
              <span className="font-semibold">Panel 2</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      );
    }

    if (selectedComponent === 'scrollArea') {
      const { scrollBarOrientation } = props;
      return (
        <Component className="h-[200px] w-[150px] rounded-md border p-4">
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                Scrollable content {i + 1}
              </div>
            ))}
          </div>
          {scrollBarOrientation === 'horizontal' && (
            <ScrollBar orientation="horizontal" />
          )}
          {scrollBarOrientation === 'both' && (
            <>
              <ScrollBar orientation="vertical" />
              <ScrollBar orientation="horizontal" />
            </>
          )}
        </Component>
      );
    }

    if (selectedComponent === 'drawer') {
      return (
        <Component>
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
        </Component>
      );
    }

    if (selectedComponent === 'contextMenu') {
      return (
        <Component>
          <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuContent>
        </Component>
      );
    }

    if (selectedComponent === 'menubar') {
      return (
        <Component>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab</MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Component>
      );
    }

    if (selectedComponent === 'dialog') {
      return (
        <Component>
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
        </Component>
      );
    }

    if (selectedComponent === 'alertDialog') {
      return (
        <Component>
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
        </Component>
      );
    }

    if (selectedComponent === 'sheet') {
      return (
        <Component>
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
        </Component>
      );
    }

    if (selectedComponent === 'dropdownMenu') {
      return (
        <Component>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </Component>
      );
    }

    if (selectedComponent === 'popover') {
      return (
        <Component>
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
        </Component>
      );
    }

    if (selectedComponent === 'tooltip') {
      return (
        <TooltipProvider>
          <Component>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Component>
        </TooltipProvider>
      );
    }

    if (selectedComponent === 'hoverCard') {
      return (
        <Component>
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
        </Component>
      );
    }

    if (selectedComponent === 'tabs') {
      return (
        <Component {...props as any} className="w-[400px]" defaultValue="account">
          <TabsList className="w-full">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Account settings content
          </TabsContent>
          <TabsContent value="password">
            Password settings content
          </TabsContent>
        </Component>
      );
    }

    if (selectedComponent === 'accordion') {
      return (
        <Component {...props as any} className="w-full">
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
        </Component>
      );
    }

    if (selectedComponent === 'table') {
      return (
        <Component {...(props as any)}>
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
        </Component>
      );
    }

    if (selectedComponent === 'command') {
      return (
        <Component {...props as any} className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Component>
      );
    }

    if (selectedComponent === 'sidebar') {
      return (
        <div className="h-[200px] w-full border rounded-lg relative overflow-hidden">
          <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <Component {...props as any} className={`h-full absolute top-0 left-0 bottom-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-60'}`}>
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Inbox className="h-4 w-4" />
                        <span>Inbox</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Calendar className="h-4 w-4" />
                        <span>Calendar</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Search className="h-4 w-4" />
                        <span>Search</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
            </Component>
          </SidebarProvider>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-sm absolute top-1 transition-all duration-300 ${sidebarOpen ? 'left-65' : 'left-1'}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <PanelLeft />
          </Button>
        </div>
      );
    }

    return <Component {...props as any} />;
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 컴포넌트 선택 및 설정 */}
        <Card>
          <CardHeader>
            <CardTitle>컴포넌트 설정</CardTitle>
            <CardDescription>
              컴포넌트와 속성을 선택하여 미리보기를 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 컴포넌트 선택 */}
            <div className="space-y-2">
              <Label>컴포넌트</Label>
              <Select value={selectedComponent} onValueChange={setSelectedComponent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(components).map(([key, comp]) => (
                    <SelectItem key={key} value={key}>
                      {comp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 속성 설정 */}
            {currentComponent && currentComponent.props && Object.keys(currentComponent.props).length > 0 && (
              <div className="space-y-4">
                {Object.entries(currentComponent.props).map(([prop, values]) => (
                  <div key={prop} className="space-y-2">
                    <Label className="capitalize">{prop}</Label>
                    {Array.isArray(values) && values.every(v => typeof v === 'boolean') ? (
                      <Switch
                        checked={componentProps[prop] !== undefined ? componentProps[prop] : values[0]}
                        onCheckedChange={(checked) => updateProp(prop, checked)}
                      />
                    ) : Array.isArray(values) ? (
                      <Select
                        value={componentProps[prop] !== undefined ? componentProps[prop] : values[0]}
                        onValueChange={(value) => updateProp(prop, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {values.map((value) => (
                            <SelectItem key={value} value={value.toString()}>
                              {value.toString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : typeof values === 'boolean' ? (
                      <Switch
                        checked={componentProps[prop] !== undefined ? componentProps[prop] : values}
                        onCheckedChange={(checked) => updateProp(prop, checked)}
                      />
                    ) : (
                      <Input
                        value={componentProps[prop] || ''}
                        onChange={(e) => updateProp(prop, e.target.value)}
                        placeholder={`Enter ${prop}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 복잡한 컴포넌트 안내 */}
            {currentComponent && (!currentComponent.props || Object.keys(currentComponent.props).length === 0) && (
              <div className="text-sm text-muted-foreground">
                이 컴포넌트는 복잡한 구조로 인해 기본 설정으로만 표시됩니다.
              </div>
            )}
          </CardContent>
        </Card>

        {/* 미리보기 */}
        <Card>
          <CardHeader>
            <CardTitle>미리보기</CardTitle>
            <CardDescription>
              선택한 설정으로 컴포넌트가 어떻게 보이는지 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
              {renderComponent()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 코드 출력 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>생성된 코드</CardTitle>
          <CardDescription>
            현재 설정에 따른 컴포넌트 코드입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>
              {`import { ${currentComponent?.name} } from '@/components/ui/${selectedComponent}';
                <${currentComponent?.name}${Object.entries(componentProps)
                  .filter(([, value]) => value !== undefined && value !== '')
                  .map(([key, value]) => {
                    if (typeof value === 'boolean') {
                      return value ? ` ${key}` : '';
                    }
                    return ` ${key}="${value}"`;
                  })
                  .join('')} />`}
            </code>
          </pre>
        </CardContent>
      </Card>
    </>
  );
}
