// 컴포넌트 라이브러리의 순서를 정의 (사용자 요청 순서)
export const componentOrder = [
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
  // 추가 컴포넌트들 (요청 목록에 없지만 존재하는 컴포넌트들)
  'alert',
  'card',
  'copy-button',
  'label',
  'separator',
  'sidebar',
  'sonner',
  'chart',
] as const;

// 컴포넌트 순서를 기반으로 정렬하는 함수
export function sortComponentsByOrder<T extends { slug: string }>(components: T[]): T[] {
  return components.sort((a, b) => {
    const aIndex = componentOrder.indexOf(a.slug as any);
    const bIndex = componentOrder.indexOf(b.slug as any);

    // 순서에 정의되지 않은 컴포넌트는 맨 뒤로
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });
}
