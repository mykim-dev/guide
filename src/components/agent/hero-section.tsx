'use client';

import React, { useState, useEffect } from 'react';

interface HeroSectionProps {
  title: string | string[];
  subtitle: string | string[];
  children?: React.ReactNode;
  className?: string;
}

export default function HeroSection({ 
  title, 
  subtitle, 
  children, 
  className = "" 
}: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 페이지 로드 후 애니메이션 시작
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);  

  // 배열을 처리하는 헬퍼 함수
  const renderTitle = () => {
    if (Array.isArray(title)) {
      return title.map((line, index) => (
        <React.Fragment key={index}>
          <span className={index === 0 ? "text-gradient" : ""}>
            {line}
          </span>
          {index < title.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return <span className="text-gradient">{title}</span>;
  };

  const renderSubtitle = () => {
    if (Array.isArray(subtitle)) {
      return subtitle.map((line, index) => (
        <span key={index} className="flex items-center">
          {line}
          {index < subtitle.length - 1 && (
            <span className="flex w-8 h-[1px] mx-2 bg-muted-foreground" />
          )}
        </span>
      ));
    }
    return <span className="flex">{subtitle}</span>;
  };

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center ${className}`}>
      <div className="container mx-auto space-y-24">
        {/* 조건부 스타일링 */}
        <h2 className={`typography-7xl text-center transition-all duration-600 ease-out ${
          isLoaded 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-95 opacity-0 translate-y-4"
        }`}>
          {renderTitle()}
        </h2>

        <div className={`flex items-center justify-center typography-xl text-muted-foreground transition-all duration-600 ease-out delay-200 ${
          isLoaded 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-4"
        }`}>
          {renderSubtitle()}
        </div>

        <div className={`transition-all duration-600 ease-out delay-400 ${
          isLoaded 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-4"
        }`}>
          {children}
        </div>
      </div>
    </section>
  );
}
