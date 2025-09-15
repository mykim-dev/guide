"use client";

import React from 'react';

interface DcCalsAIBotProps {
  variant?: 'default' | 'loading' | 'success' | 'fail' | 'retry';
}

export default function DcCalsAIBot({ variant = 'default' }: DcCalsAIBotProps) {
  return (
    <div className="ai-bot" data-type={variant}>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g className="bot">
          {/* 실패 */}
          {variant === 'fail' && (
            <g className={`bot-${variant}`}>
              <ellipse cx="104" cy="155" rx="40" ry="5" fill="#CCCCCC" />
              <path
                d="M117.715 83.0593C109.851 77.8284 100.151 75.4113 90.1475 76.9806C80.1442 78.5499 71.6031 83.7808 65.6474 91.1583C61.9207 84.2859 56.0721 83.0954 53.0408 82.9691C52.2205 82.9331 51.7213 83.8349 52.167 84.5384C54.6099 88.3444 58.408 95.4333 58.3723 105.39C56.6248 112.226 56.0542 119.947 56.2504 124.149C57.1419 144.099 71.2999 156.762 102.201 156.491C102.201 156.491 129.59 156.527 142.215 156.762C143.445 156.78 143.891 155.157 142.839 154.507C137.739 151.387 133.085 146.102 133.798 139.085C134.743 129.741 137.008 122.598 135.207 110.675C134.333 104.921 132.301 99.6361 129.394 95.0364C126.434 85.6568 127.379 77.2331 128.574 72.8138C128.806 71.9661 128.003 71.1904 127.201 71.4971C124.33 72.5793 119.23 75.5195 117.715 83.0774V83.0593Z"
                fill="url(#paint0_linear_24_78)"
              />
              <path
                d="M63.0262 131.689C61.5818 123.175 64.3635 114.499 72.2806 111.252C76.7027 109.43 82.6049 107.608 90.308 106.273C98.011 104.938 104.181 104.668 108.942 104.902C117.465 105.317 122.939 112.55 124.383 121.064C125.828 129.578 118.767 137.533 110.118 137.93C105.714 138.128 100.846 138.579 95.9248 139.427C91.0034 140.275 86.2603 141.501 82.0521 142.782C73.7606 145.307 64.5062 140.311 63.044 131.671L63.0262 131.689Z"
                fill="url(#paint1_linear_24_78)"
              />
              <path
                d="M113.168 120.722L100.722 126.873L114.077 129.777"
                stroke="#383838"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M71.4066 126.946L84.994 129.561L72.8866 135.929"
                stroke="#383838"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M93.6424 145.362C93.8385 146.715 94.0882 148.356 94.3021 149.601C94.4626 150.647 95.4255 151.35 96.4597 151.206L103.592 150.232C105.215 150.015 105.857 147.995 104.662 146.859L100.329 142.728C99.7585 142.187 98.9739 141.953 98.2072 142.079L95.6751 142.53C94.3556 142.764 93.4641 144.009 93.6602 145.344L93.6424 145.362Z"
                fill="white"
              />
              <rect
                x="94.6667"
                y="47.0474"
                width="3.04762"
                height="24.381"
                rx="1.52381"
                fill="#A4A4A4"
                className="vline"
              />
              <rect
                x="103.81"
                y="47.0474"
                width="3.04762"
                height="24.381"
                rx="1.52381"
                fill="#A4A4A4"
                className="vline"
              />
              <rect
                x="112.952"
                y="50.0952"
                width="3.04762"
                height="24.381"
                rx="1.52381"
                fill="#A4A4A4"
                className="vline"
              />
              <rect
                x="122.095"
                y="44"
                width="3.04762"
                height="24.381"
                rx="1.52381"
                fill="#A4A4A4"
                className="vline"
              />

              <defs>
                <linearGradient
                  id="paint0_linear_24_78"
                  x1="97.7326"
                  y1="72.2119"
                  x2="97.7326"
                  y2="159.31"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4198D8" />
                  <stop offset="1" stopColor="#80C6E5" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_24_78"
                  x1="92.5777"
                  y1="119.719"
                  x2="96.6927"
                  y2="143.493"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#C4C4C4" />
                </linearGradient>
              </defs>
            </g>
          )}

          {/* 기본 */}
          {variant !== 'fail' && (
            <g className={`bot-${variant}`}>
              {/* 얼굴 */}
              <path
                d="M128.008 50.773C120.576 44.0738 110.761 40 100 40C89.2393 40 79.4239 44.0738 71.9924 50.773C69.1747 43.0725 63.236 40.8763 60.0777 40.2499C59.1673 40.0694 58.5673 41.0202 58.944 41.8684C60.8988 46.2703 63.2248 54.8761 61.6177 65.0883C59.2925 70.3411 58 76.1593 58 82.2813C58 105.633 76.804 124.563 100 124.563L100.02 124.563C108.376 124.563 111.628 131.57 113.316 135.208C113.382 135.349 113.445 135.485 113.506 135.615C113.772 136.184 114.783 136.104 114.942 135.495C117.635 125.163 123.602 117.665 126.256 115.284C133.6 108.696 142 94.9657 142 82.2813C142 76.1593 140.708 70.3411 138.382 65.0883C136.775 54.8761 139.101 46.2703 141.056 41.8684C141.433 41.0202 140.833 40.0694 139.922 40.2499C136.764 40.8763 130.825 43.0725 128.008 50.773Z"
                fill="url(#paint0_linear_face)"
              />
              {/* 고글 */}
              <path
                d="M63.9995 80.1238C63.9995 70.2441 68.8411 61.0174 78.4895 58.892C83.8802 57.7045 90.9536 56.8013 99.9995 56.8013C109.045 56.8013 116.119 57.7045 121.509 58.892C131.158 61.0174 135.999 70.2441 135.999 80.1238C135.999 90.1371 126.411 97.5857 116.475 96.3506C111.42 95.7223 105.768 95.267 99.9995 95.267C94.2313 95.267 88.5785 95.7223 83.5243 96.3506C73.5875 97.5857 63.9995 90.1371 63.9995 80.1238Z"
                fill="url(#paint1_linear_goggles)"
              />

              {/* 눈, 입(성공) */}
              {variant === 'success' ? (
                <g>
                  <path
                    d="M77.0487 72.5L90 78.4867L77 84.5"
                    stroke="#383838"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M119.951 72.5L107 78.4867L120 84.5"
                    stroke="#383838"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M96.0468 106.5H100.947C104.167 106.5 106.888 104.54 107.899 101.81C108.312 100.69 107.401 99.5 106.19 99.5H90.8045C89.6079 99.5 88.6962 100.676 89.095 101.81C90.0922 104.54 92.8273 106.5 96.0468 106.5Z"
                    fill="white"
                  />
                </g>
              ) : (
                <g>
                  <path
                    d="M83.2007 67.1011C79.887 67.1011 77.2007 69.9217 77.2007 73.4011V77.6011C77.2007 81.0805 79.887 83.9011 83.2007 83.9011C86.5144 83.9011 89.2007 81.0805 89.2007 77.6011V73.4011C89.2007 69.9217 86.5144 67.1011 83.2007 67.1011Z"
                    fill="#232323"
                  />
                  <path
                    d="M114.201 67.1011C110.887 67.1011 108.201 69.9217 108.201 73.4011V77.6011C108.201 81.0805 110.887 83.9011 114.201 83.9011C117.514 83.9011 120.201 81.0805 120.201 77.6011V73.4011C120.201 69.9217 117.514 67.1011 114.201 67.1011Z"
                    fill="#232323"
                  />

                  <path
                    d="M81 75.5L75.75 78.0981L75.75 72.9019L81 75.5Z"
                    fill="white"
                    className={variant === 'loading' ? 'eye' : ''}
                  />
                  <path
                    d="M112 75.5L106.75 78.0981L106.75 72.9019L112 75.5Z"
                    fill="white"
                    className={variant === 'loading' ? 'eye' : ''}
                  />

                  {variant === 'retry' ? (
                    <rect
                      x="87.7054"
                      y="103.066"
                      width="19.2"
                      height="4.8"
                      rx="2.4"
                      transform="rotate(-15 87.7054 103.066)"
                      fill="white"
                    />
                  ) : (
                    <rect x="87.9995" y="100" width="19.2" height="4.8" rx="2.4" fill="white" />
                  )}
                </g>
              )}

              {/* 악세사리(성공) */}
              {variant === 'success' && (
                <>
                  <g className="boom boom-left">
                    <path
                      d="M40.5 63C41.3284 63 42 63.6716 42 64.5V66H43.5C44.3284 66 45 66.6716 45 67.5C45 68.3284 44.3284 69 43.5 69H42V70.5C42 71.3284 41.3284 72 40.5 72C39.6716 72 39 71.3284 39 70.5V69H37.5C36.6716 69 36 68.3284 36 67.5C36 66.6716 36.6716 66 37.5 66H39V64.5C39 63.6716 39.6716 63 40.5 63Z"
                      fill="#FBC83B"
                    />
                    <path
                      d="M23.5 49C24.1443 49 24.667 49.5227 24.667 50.167V51.333H25.833C26.4773 51.333 27 51.8557 27 52.5C27 53.1443 26.4773 53.667 25.833 53.667H24.667V54.833C24.667 55.4773 24.1443 56 23.5 56C22.8557 56 22.333 55.4773 22.333 54.833V53.667H21.167C20.5227 53.667 20 53.1443 20 52.5C20 51.8557 20.5227 51.333 21.167 51.333H22.333V50.167C22.333 49.5227 22.8557 49 23.5 49Z"
                      fill="#FF7948"
                    />
                    <path
                      d="M22.5 75C22.9601 75 23.3328 75.3729 23.333 75.833V76.667H24.167C24.6271 76.6672 25 77.0399 25 77.5C24.9999 77.9601 24.627 78.3328 24.167 78.333H23.333V79.167C23.3328 79.6271 22.9601 80 22.5 80C22.0399 80 21.6672 79.6271 21.667 79.167V78.333H20.833C20.373 78.3328 20.0001 77.9601 20 77.5C20 77.0399 20.3729 76.6672 20.833 76.667H21.667V75.833C21.6672 75.3729 22.0399 75 22.5 75Z"
                      fill="#62C8DA"
                    />
                    <rect x="43" y="44" width="6" height="6" rx="3" stroke="#62C8DA" strokeWidth="2" />
                    <rect x="30" y="39" width="3" height="3" rx="1.5" fill="#FF7948" />
                  </g>
                  <g className="boom boom-right">
                    <rect x="151" y="58" width="6" height="6" rx="3" stroke="#FBC83B" strokeWidth="2" />
                    <path
                      d="M154.5 35C155.144 35 155.667 35.5227 155.667 36.167V37.333H156.833C157.477 37.333 158 37.8557 158 38.5C158 39.1443 157.477 39.667 156.833 39.667H155.667V40.833C155.667 41.4773 155.144 42 154.5 42C153.856 42 153.333 41.4773 153.333 40.833V39.667H152.167C151.523 39.667 151 39.1443 151 38.5C151 37.8557 151.523 37.333 152.167 37.333H153.333V36.167C153.333 35.5227 153.856 35 154.5 35Z"
                      fill="#62C8DA"
                    />
                    <path
                      d="M173.5 53C173.96 53 174.333 53.3729 174.333 53.833V54.667H175.167C175.627 54.6672 176 55.0399 176 55.5C176 55.9601 175.627 56.3328 175.167 56.333H174.333V57.167C174.333 57.6271 173.96 58 173.5 58C173.04 58 172.667 57.6271 172.667 57.167V56.333H171.833C171.373 56.3328 171 55.9601 171 55.5C171 55.0399 171.373 54.6672 171.833 54.667H172.667V53.833C172.667 53.3729 173.04 53 173.5 53Z"
                      fill="#FBC83B"
                    />
                    <rect x="167" y="69" width="3" height="3" rx="1.5" fill="#FF7948" />
                    <rect x="162" y="43" width="2" height="2" rx="1" fill="#FF7948" />
                  </g>
                </>
              )}

              {/* 악세사리(로딩) */}
              {variant === 'loading' && (
                <g>
                  <rect x="73" y="8" width="10" height="10" rx="5" fill="#17CE9A" className="dot" />
                  <rect x="117" y="8" width="10" height="10" rx="5" fill="#17CE9A" className="dot" />
                  <rect x="95" y="8" width="10" height="10" rx="5" fill="#17CE9A" className="dot" />
                </g>
              )}

              {/* 악세사리(재시도) */}
              {variant === 'retry' && (
                <g className="glasses">
                  <circle
                    cx="115.609"
                    cy="77.1087"
                    r="20.6087"
                    fill="url(#paint2_linear_glasses)"
                    stroke="#3A3B3D"
                    strokeWidth="4"
                  />
                  <path
                    d="M131.435 92.9346L145 106.5"
                    stroke="#3A3B3D"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </g>
          )}

          <defs>
            <linearGradient
              id="paint0_linear_face"
              x1="100.017"
              y1="40.8811"
              x2="100.017"
              y2="138.866"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#80C6E5" />
              <stop offset="1" stopColor="#4198D8" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_goggles"
              x1="99.9995"
              y1="72.4013"
              x2="99.9995"
              y2="100.001"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="#E7E7E7" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_glasses"
              x1="101.478"
              y1="61.2826"
              x2="130.87"
              y2="92.9348"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.6" />
              <stop offset="1" stopColor="white" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </g>
      </svg>

      <style jsx>{`
        .ai-bot {
          position: relative;
          will-change: transform;
        }

        .ai-bot[data-type='default'] .bot,
        .ai-bot[data-type='loading'] .bot,
        .ai-bot[data-type='success'] .bot,
        .ai-bot[data-type='retry'] .bot {
          animation: float-bot 2s ease-in-out infinite;
          will-change: transform;
        }

        .ai-bot[data-type='default']::before,
        .ai-bot[data-type='success']::before,
        .ai-bot[data-type='retry']::before {
          content: '';
          display: block;
          width: 48px;
          height: 12px;
          position: absolute;
          left: 78px;
          bottom: 30px;
          background-image: radial-gradient(closest-side, rgba(0, 0, 0, 0.2) 80%, transparent);
          animation: float-shadow 2s ease infinite;
          will-change: transform;
        }

        @keyframes float-bot {
          0%, 100% {
            transform: translate3d(0, 16px, 0);
          }
          50% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes float-shadow {
          0%, 100% {
            transform: scale3d(0.6, 0.6, 1);
          }
          50% {
            transform: scale3d(1, 1, 1);
          }
        }

        .ai-bot[data-type='loading'] .bot {
          animation: initial;
        }

        .ai-bot[data-type='loading']::before {
          bottom: 40px;
          animation: initial;
        }

        .dot {
          animation: wave-dot 1.2s ease infinite;
          will-change: transform, opacity;
        }

        .dot:nth-of-type(2) {
          animation-delay: 0.4s;
        }

        .dot:nth-of-type(3) {
          animation-delay: 0.8s;
        }

        @keyframes wave-dot {
          0%, 100% {
            transform: translate3d(0, 16px, 0);
            opacity: 0.4;
          }
          50% {
            transform: translate3d(0, 10px, 0);
            opacity: 0.8;
          }
        }

        .eye {
          animation: move-eye 1.2s ease infinite;
          will-change: transform, opacity;
        }

        @keyframes move-eye {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translate(1.6px, -4px);
          }
        }

        .boom-left {
          opacity: 0;
          transform: scale(1) translate(50px, 25px);
          animation: move-boom-left 1.6s ease infinite;
          will-change: transform, opacity;
        }

        .boom-right {
          opacity: 0;
          transform: scale(1) translate(-50px, 25px);
          animation: move-boom-right 1.6s ease infinite;
          will-change: transform, opacity;
        }

        @keyframes move-boom-left {
          25% {
            opacity: 1;
            transform: scale(0.8) translate(10px, -10px);
          }
          50%, 70% {
            transform: scale(1.3) translate(0, -25px);
          }
          100% {
            opacity: 0;
            transform: scale(1.3) translate(0, -25px);
          }
        }

        @keyframes move-boom-right {
          25% {
            opacity: 1;
            transform: scale(0.8) translate(40px, -10px);
          }
          50%, 70% {
            transform: scale(1.3) translate(-50px, -20px);
          }
          100% {
            opacity: 0;
            transform: scale(1.3) translate(-50px, -20px);
          }
        }

        .vline {
          animation: wave-vline 2s ease infinite alternate-reverse;
          will-change: transform, opacity;
        }

        @keyframes wave-vline {
          0% {
            opacity: 0;
            transform: scale(1, 0.6);
          }
          50% {
            opacity: 1;
            transform: scale(1, 1);
          }
        }

        .glasses {
          animation: move-glasses 3s ease infinite;
          will-change: transform, opacity;
        }

        @keyframes move-glasses {
          0%, 60% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-10px, -10px);
          }
          40% {
            transform: translate(10px, -10px);
          }
        }
      `}</style>
    </div>
  );
}
