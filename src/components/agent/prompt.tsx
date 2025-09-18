'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CalsAgentPrompt() {
    return (
        <div className="w-3/5 h-32 mx-auto flex items-end shadow-sm border bg-background rounded-xl">
            <Textarea className="h-full resize-none focus-visible:outline-none border-none shadow-none" />
            <Button disabled className="size-10 rounded-full m-4">
                <ArrowUp className="size-6" />
            </Button>
        </div>
    );
}