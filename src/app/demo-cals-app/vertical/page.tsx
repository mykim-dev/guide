'use client';

import Form from '@/components/cals-app/form';
import { DataTableDemo as List } from '@/components/cals-app/list';

export default function VerticalPage() {
  return (
    <div className="screen-wrap grid grid-cols-1 grid-rows-2 gap-5 p-5 min-w-[calc(100svw-16rem)] min-h-[calc(100svh-8rem)]">
      <div className="screen-item">
        <List />
      </div>
      <div className="screen-item">
        <Form />
      </div>
    </div>
  );
}