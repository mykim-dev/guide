'use client';

import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function TypographyPage() {
  return (
    <div className="screen-wrap grid grid-cols-1 gap-5 p-5">
      <div className="screen-item">
        <Collapsible defaultOpen={true} className="component-wrap">
          <div className="component-header">
            <h3 className="component-title">Form</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="component-content">
            <form>
              <div className="form-wrap">
                <div className="form-item">
                  <div className="form-item-title">Checkbox</div>
                  <div className="form-item-content">
                    <ScrollArea className="h-9 w-full pr-2">
                      <div className="control-group">
                        <div className="control-item"><Checkbox id="chk1" checked={false} /><Label htmlFor="chk1">Default</Label></div>
                        <div className="control-item"><Checkbox id="chk2" checked={true} /><Label htmlFor="chk2">Checked</Label></div>
                        <div className="control-item"><Checkbox id="chk3" checked={false} disabled={true} /><Label htmlFor="chk3">Disabled</Label></div>
                        <div className="control-item"><Checkbox id="chk4" checked={true} disabled={true} /><Label htmlFor="chk4">Checked Disabled</Label></div>
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </div>

                <div className="form-item">
                  <div className="form-item-title">RadioGroup</div>
                  <div className="form-item-content">
                    <ScrollArea className="h-9 w-full pr-2">
                      <RadioGroup defaultValue="rdo2">
                        <div className="control-group">
                          <div className="control-item"><RadioGroupItem value="rdo1" id="rdo1" /><Label htmlFor="rdo1">Default</Label></div>
                          <div className="control-item"><RadioGroupItem value="rdo2" id="rdo2" /><Label htmlFor="rdo2">Checked</Label></div>
                          <div className="control-item"><RadioGroupItem value="rdo3" id="rdo3" disabled={true} /><Label htmlFor="rdo3">Disabled</Label></div>
                        </div>
                      </RadioGroup>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </div>

                <div className="form-item">
                  <div className="form-item-title">Switch</div>
                  <div className="form-item-content">
                    <div className="control-group">
                      <div className="control-item">
                        <Switch id="switch" checked={true} />
                      </div>
                      <div className="control-item">
                        <Switch id="switch2" checked={true} disabled={true} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-item">
                  <div className="form-item-title">Select</div>
                  <div className="form-item-content">
                    <Select defaultValue="apple">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="pear">Pear</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="form-item">
                  <div className="form-item-title">Email</div>
                  <div className="form-item-content">
                    <Input type="email" id="email" placeholder="Enter your email" />
                  </div>
                </div>

                <div className="form-item">
                  <div className="form-item-title">Message</div>
                  <div className="form-item-content">
                    <Textarea
                      id="message"
                      placeholder="Type your message here."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </form>
          </CollapsibleContent>
        </Collapsible>
      </div>      
    </div>
  );
}