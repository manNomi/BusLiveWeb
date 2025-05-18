import React from "react";

const BusIcon = ({ color = "black", width = 24, height = 24 }) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 500 500"
    preserveAspectRatio="xMidYMid meet">
    <g
      transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
      fill={color}
      stroke="none">
      <path d="M1362 4184 c-151 -40 -263 -146 -317 -299 ... 56666:11" />
      <path d="M1949 3916 c-2 -2 -3 -90 -1 -195 ... 37567:20" />
    </g>
  </svg>
);

export default BusIcon;
