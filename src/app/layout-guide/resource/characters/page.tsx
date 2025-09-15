'use client';

import { Button } from "@/components/ui/button";
import AIBot from "@/components/docs/aibot";
import { DownloadIcon } from "lucide-react";
import html2canvas from 'html2canvas';
import { useRef } from 'react';

export default function ResourceCharactersPage() {
  const componentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // lab() 색상을 rgb()로 변환하는 함수
  const convertLabToRgb = (labValue: string): string => {
    // 간단한 lab() 색상 변환 (대략적인 변환)
    if (labValue.includes('lab(')) {
      // lab() 색상을 기본 색상으로 대체
      if (labValue.includes('0%')) return 'rgb(0, 0, 0)'; // 검은색
      if (labValue.includes('100%')) return 'rgb(255, 255, 255)'; // 흰색
      return 'rgb(128, 128, 128)'; // 회색 (기본값)
    }
    return labValue;
  };

  // CSS 스타일을 안전하게 변환하는 함수
  const createSafeStyles = (): string => {
    return `
      * {
        animation-play-state: running !important;
      }
      .ai-bot {
        background-color: transparent !important;
      }
      .ai-bot svg {
        background-color: transparent !important;
      }
      /* lab() 색상을 rgb()로 강제 변환 */
      [style*="lab("] {
        color: rgb(0, 0, 0) !important;
        background-color: rgb(255, 255, 255) !important;
        border-color: rgb(0, 0, 0) !important;
        fill: rgb(0, 0, 0) !important;
        stroke: rgb(0, 0, 0) !important;
      }
    `;
  };

  // SVG를 직접 다운로드하는 함수 (대안 방법)
  const downloadSVGAsImage = (index: number, fileName: string) => {
    const element = componentRefs.current[index];
    if (!element) {
      console.error('Element not found for index:', index);
      return;
    }

    const svgElement = element.querySelector('svg');
    if (!svgElement) {
      console.error('SVG element not found');
      return;
    }

    try {
      // SVG를 문자열로 변환
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      // SVG를 PNG로 변환하기 위한 Canvas 생성
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = 200;
        canvas.height = 200;
        ctx?.drawImage(img, 0, 0, 200, 200);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            URL.revokeObjectURL(svgUrl);
            console.log('SVG download completed for:', fileName);
          }
        }, 'image/png');
      };

      img.src = svgUrl;
    } catch (error) {
      console.error('SVG download failed:', error);
      alert('SVG 다운로드에 실패했습니다.');
    }
  };

  // 컴포넌트를 이미지로 변환하고 다운로드하는 함수
  const downloadComponentAsImage = async (index: number, fileName: string) => {
    const element = componentRefs.current[index];
    if (!element) {
      console.error('Element not found for index:', index);
      return;
    }

    try {
      console.log('Starting image generation for:', fileName);
      
      // 안전한 스타일을 임시로 추가
      const tempStyle = document.createElement('style');
      tempStyle.id = 'temp-safe-styles';
      tempStyle.textContent = createSafeStyles();
      document.head.appendChild(tempStyle);

      // 잠시 대기하여 스타일이 적용되도록 함
      await new Promise(resolve => setTimeout(resolve, 100));

      // html2canvas로 시도 (애니메이션과 lab() 색상 문제 해결)
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 200,
        height: 200,
        onclone: (clonedDoc) => {
          // 복제된 문서에서 lab() 색상을 rgb()로 변환
          const style = clonedDoc.createElement('style');
          style.textContent = createSafeStyles();
          clonedDoc.head.appendChild(style);
          
          // 모든 요소의 스타일을 안전하게 변환
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = window.getComputedStyle(htmlEl);
            
            // lab() 색상이 포함된 스타일 속성들을 변환
            ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke'].forEach(prop => {
              const value = computedStyle.getPropertyValue(prop);
              if (value && value.includes('lab(')) {
                htmlEl.style.setProperty(prop, convertLabToRgb(value), 'important');
              }
            });
          });
        }
      });

      console.log('Canvas created successfully');

      // 임시 스타일 제거
      document.head.removeChild(tempStyle);

      // Canvas를 Blob으로 변환
      canvas.toBlob((blob) => {
        if (blob) {
          console.log('Blob created, size:', blob.size);
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          console.log('Download completed for:', fileName);
        } else {
          console.error('Failed to create blob');
          // html2canvas 실패 시 SVG 방법으로 대체
          console.log('Falling back to SVG method');
          downloadSVGAsImage(index, fileName);
        }
      }, 'image/png', 0.95);
      
    } catch (error) {
      console.error('html2canvas failed:', error);
      // 임시 스타일이 남아있다면 제거
      const tempStyle = document.getElementById('temp-safe-styles');
      if (tempStyle) {
        document.head.removeChild(tempStyle);
      }
      console.log('Falling back to SVG method');
      // html2canvas 실패 시 SVG 방법으로 대체
      downloadSVGAsImage(index, fileName);
    }
  };
  // 캐릭터 데이터
  const characters = [
    { variant: 'default', title: 'Default', description: '기본 상태', fileName: 'aibot-default.png' },
    { variant: 'loading', title: 'Loading', description: '로딩 중', fileName: 'aibot-loading.png' },
    { variant: 'success', title: 'Success', description: '성공', fileName: 'aibot-success.png' },
    { variant: 'fail', title: 'Fail', description: '실패', fileName: 'aibot-fail.png' },
    { variant: 'retry', title: 'Retry', description: '재시도', fileName: 'aibot-retry.png' },
  ];

  return (
    <div className="flex flex-col gap-24">
      <div>
        <h2 className="text-2xl font-bold mb-2">CALS AIBot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {characters.map((character, index) => (
            <div key={character.variant} className="flex flex-col items-center space-y-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div 
                  ref={(el) => { componentRefs.current[index] = el; }}
                  className="inline-block"
                >
                  <AIBot variant={character.variant as 'default' | 'loading' | 'success' | 'fail' | 'retry'} />
                </div>
              </div>
              <div className="text-sm space-x-2">
                <strong>{character.title}</strong>
                <span className="text-muted-foreground">({character.description})</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => downloadComponentAsImage(index, character.fileName)}
                className="cursor-pointer"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                다운로드
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}