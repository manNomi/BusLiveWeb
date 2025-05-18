import React from "react";

const BusStopIcon = (props) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width={`${props.width}px`}
    height={`${props.height}px`}
    viewBox="0 0 500 500"
    preserveAspectRatio="xMidYMid meet">
    <g
      transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
      fill={
        props.color === 1 ? "red" : props.color === 2 ? "#E6C767" : "#31511E"
      }
      stroke="none">
      <path d="M1362 4184 c-151 -40 -263 -146 -317 -299" />
      <path d="M1949 3916 c-2 -2 -3 -90 -1 -195" />
      <path d="M1320 1672 c0 -100 2 -110 23 -129 29 -27 58 -41 115 -58 56 -17 294 -56 301 -50 10 10 -22 87 -52 127 -43 57 -117 105 -258 167 -64 28 -119 51 -122 51 -4 0 -7 -49 -7 -108z" />
      <path d="M3536 1720 c-136 -63 -205 -109 -241 -162 -27 -40 -51 -105 -42 -114 8 -9 186 13 262 32 69 18 140 56 155 84 11 21 14 220 3 219 -5 0 -66 -27 -137 -59z" />
      <path d="M1261 982 c7 -136 78 -238 185 -262 66 -16 294 -12 345 5 108 37 161 118 164 252 l2 83 -350 0 -349 0 3 -78z" />
      <path d="M3051 968 c6 -102 20 -136 71 -184 68 -64 86 -69 273 -69 155 0 173 2 210 22 88 47 130 120 141 246 l7 77 -354 0 -354 0 6 -92z" />
    </g>
  </svg>
);

export default BusStopIcon;
