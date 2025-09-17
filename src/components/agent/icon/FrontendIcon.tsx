import React from 'react'
import { useTheme } from '@/hooks/useTheme'

interface FrontendIconProps {
  className?: string
  size?: number
  variant?: 'default' | 'active'
}

export const FrontendIcon: React.FC<FrontendIconProps> = ({ 
  className = '', 
  size = 24,
  variant = 'default'
}) => {
  const { isDark } = useTheme()
  
  if (variant === 'active') {
    // Dark mode active variant
    if (isDark) {
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <g clipPath="url(#clip0_1258_626)">
          <path d="M10.3636 22H7C6.44772 22 6 22.4477 6 23C6 23.5523 6.44772 24 7 24H17C17.5523 24 18 23.5523 18 23C18 22.4477 17.5523 22 17 22H13.6364V20H10.3636V22Z" fill="#B1BEFD"/>
          <rect x="1" y="5" width="22" height="15" rx="1.2" stroke="#B1BEFD" strokeWidth="1.5"/>
          <path d="M6.5 7H12.5" stroke="black" strokeWidth="1.5"/>
          <rect x="4" y="1" width="16" height="15" rx="1" fill="#09090B" stroke="#B1BEFD" strokeWidth="1.5"/>
          <path d="M7 7H14" stroke="#637CFA" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7 10H10" stroke="#637CFA" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3.5 2.5C3.5 1.67157 4.17157 1 5 1H19C19.8284 1 20.5 1.67157 20.5 2.5V4.5H3.5V2.5Z" fill="#B1BEFD"/>
          <path d="M5.79997 3.59995C6.24179 3.59995 6.59995 3.24179 6.59995 2.79997C6.59995 2.35816 6.24179 2 5.79997 2C5.35816 2 5 2.35816 5 2.79997C5 3.24179 5.35816 3.59995 5.79997 3.59995Z" fill="#0C1B24"/>
          <path d="M8.19988 3.59995C8.64169 3.59995 8.99985 3.24179 8.99985 2.79997C8.99985 2.35816 8.64169 2 8.19988 2C7.75806 2 7.3999 2.35816 7.3999 2.79997C7.3999 3.24179 7.75806 3.59995 8.19988 3.59995Z" fill="#0C1B24"/>
          <path d="M10.5998 3.59995C11.0416 3.59995 11.3998 3.24179 11.3998 2.79997C11.3998 2.35816 11.0416 2 10.5998 2C10.158 2 9.7998 2.35816 9.7998 2.79997C9.7998 3.24179 10.158 3.59995 10.5998 3.59995Z" fill="#0C1B24"/>
          <rect x="13" y="9.20001" width="5" height="5" rx="1" fill="#637CFA"/>
          </g>
          <defs>
          <clipPath id="clip0_1258_626">
          <rect width="24" height="24" fill="white"/>
          </clipPath>
          </defs>
        </svg>
      )
    }
    
    // Light mode active variant (existing)
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <g clipPath="url(#clip0_801_10231)">
          <path d="M10.3636 22H7C6.44772 22 6 22.4477 6 23C6 23.5523 6.44772 24 7 24H17C17.5523 24 18 23.5523 18 23C18 22.4477 17.5523 22 17 22H13.6364V20H10.3636V22Z" fill="#3B4A96"/>
          <rect x="1" y="5" width="22" height="15" rx="1.2" stroke="#3B4A96" strokeWidth="1.5"/>
          <path d="M6.5 7H12.5" stroke="black" strokeWidth="1.5"/>
          <rect x="4" y="1" width="16" height="15" rx="1" fill="white" stroke="#3B4A96" strokeWidth="1.5"/>
          <path d="M7 7H14" stroke="#92A3FC" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7 10H10" stroke="#92A3FC" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3.5 2.5C3.5 1.67157 4.17157 1 5 1H19C19.8284 1 20.5 1.67157 20.5 2.5V4.5H3.5V2.5Z" fill="#3B4A96"/>
          <path d="M5.79997 3.59995C6.24179 3.59995 6.59995 3.24179 6.59995 2.79997C6.59995 2.35816 6.24179 2 5.79997 2C5.35816 2 5 2.35816 5 2.79997C5 3.24179 5.35816 3.59995 5.79997 3.59995Z" fill="#EDF7FE"/>
          <path d="M8.19988 3.59995C8.64169 3.59995 8.99985 3.24179 8.99985 2.79997C8.99985 2.35816 8.64169 2 8.19988 2C7.75806 2 7.3999 2.35816 7.3999 2.79997C7.3999 3.24179 7.75806 3.59995 8.19988 3.59995Z" fill="#EDF7FE"/>
          <path d="M10.5998 3.59995C11.0416 3.59995 11.3998 3.24179 11.3998 2.79997C11.3998 2.35816 11.0416 2 10.5998 2C10.158 2 9.7998 2.35816 9.7998 2.79997C9.7998 3.24179 10.158 3.59995 10.5998 3.59995Z" fill="#EDF7FE"/>
          <rect x="13" y="9.20001" width="5" height="5" rx="1" fill="#92A3FC"/>
        </g>
        <defs>
          <clipPath id="clip0_801_10231">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
          </defs>
      </svg>
    )
  }

  // default variant
  if (isDark) {
    // Dark mode default variant
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <g clipPath="url(#clip0_1258_152)">
        <path d="M10.3636 22H7C6.44772 22 6 22.4477 6 23C6 23.5523 6.44772 24 7 24H17C17.5523 24 18 23.5523 18 23C18 22.4477 17.5523 22 17 22H13.6364V20H10.3636V22Z" fill="#62748E"/>
        <rect x="1" y="5" width="22" height="15" rx="1.2" stroke="#62748E" strokeWidth="1.5"/>
        <path d="M6.5 7H12.5" stroke="black" strokeWidth="1.5"/>
        <rect x="4" y="1" width="16" height="15" rx="1" fill="#09090B" stroke="#62748E" strokeWidth="1.5"/>
        <path d="M7 7H14" stroke="#45556C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 10H10" stroke="#45556C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3.5 2.5C3.5 1.67157 4.17157 1 5 1H19C19.8284 1 20.5 1.67157 20.5 2.5V4.5H3.5V2.5Z" fill="#62748E"/>
        <path d="M5.79997 3.59995C6.24179 3.59995 6.59995 3.24179 6.59995 2.79997C6.59995 2.35816 6.24179 2 5.79997 2C5.35816 2 5 2.35816 5 2.79997C5 3.24179 5.35816 3.59995 5.79997 3.59995Z" fill="#09090B"/>
        <path d="M8.19988 3.59995C8.64169 3.59995 8.99985 3.24179 8.99985 2.79997C8.99985 2.35816 8.64169 2 8.19988 2C7.75806 2 7.3999 2.35816 7.3999 2.79997C7.3999 3.24179 7.75806 3.59995 8.19988 3.59995Z" fill="#09090B"/>
        <path d="M10.5998 3.59995C11.0416 3.59995 11.3998 3.24179 11.3998 2.79997C11.3998 2.35816 11.0416 2 10.5998 2C10.158 2 9.7998 2.35816 9.7998 2.79997C9.7998 3.24179 10.158 3.59995 10.5998 3.59995Z" fill="#09090B"/>
        <rect x="13" y="9.20001" width="5" height="5" rx="1" fill="#45556C"/>
        </g>
        <defs>
        <clipPath id="clip0_1258_152">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
      </svg>
    )
  }

  // Light mode default variant (existing)
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_801_10227)">
        <path d="M10.3636 22H7C6.44772 22 6 22.4477 6 23C6 23.5523 6.44772 24 7 24H17C17.5523 24 18 23.5523 18 23C18 22.4477 17.5523 22 17 22H13.6364V20H10.3636V22Z" fill="#90A1B9"/>
        <rect x="1" y="5" width="22" height="15" rx="1.2" stroke="#90A1B9" strokeWidth="1.5"/>
        <path d="M6.5 7H12.5" stroke="black" strokeWidth="1.5"/>
        <rect x="4" y="1" width="16" height="15" rx="1" fill="white" stroke="#90A1B9" strokeWidth="1.5"/>
        <path d="M7 7H14" stroke="#CAD5E2" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 10H10" stroke="#CAD5E2" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3.5 2.5C3.5 1.67157 4.17157 1 5 1H19C19.8284 1 20.5 1.67157 20.5 2.5V4.5H3.5V2.5Z" fill="#90A1B9"/>
        <path d="M5.79997 3.59995C6.24179 3.59995 6.59995 3.24179 6.59995 2.79997C6.59995 2.35816 6.24179 2 5.79997 2C5.35816 2 5 2.35816 5 2.79997C5 3.24179 5.35816 3.59995 5.79997 3.59995Z" fill="white"/>
        <path d="M8.19988 3.59995C8.64169 3.59995 8.99985 3.24179 8.99985 2.79997C8.99985 2.35816 8.64169 2 8.19988 2C7.75806 2 7.3999 2.35816 7.3999 2.79997C7.3999 3.24179 7.75806 3.59995 8.19988 3.59995Z" fill="white"/>
        <path d="M10.5998 3.59995C11.0416 3.59995 11.3998 3.24179 11.3998 2.79997C11.3998 2.35816 11.0416 2 10.5998 2C10.158 2 9.7998 2.35816 9.7998 2.79997C9.7998 3.24179 10.158 3.59995 10.5998 3.59995Z" fill="white"/>
        <rect x="13" y="9.20001" width="5" height="5" rx="1" fill="#CAD5E2"/>
      </g>
      <defs>
        <clipPath id="clip0_801_10227">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}
