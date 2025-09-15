'use client';

import Form from '@/components/cals-app/form';
import { DataTableDemo as List } from '@/components/cals-app/list';

export default function HorizontalPage() {
  return (
    <div className="screen-wrap grid grid-cols-2 gap-5 p-5">
      <div className="screen-item">
        <List />
      </div>
      <div className="screen-item">
        <Form />
      </div>
    </div>
  );
}