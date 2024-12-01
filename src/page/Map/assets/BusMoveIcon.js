import React from "react";

const BusIcon = ({ width = 512, height = 512, color = 1 }) => {
  // Define colors based on props
  const fillColor =
    color === 1 ? "#FF5A5A" : 2 === "yellow" ? "#FFD700" : "#54CE8E";
  const panelColor = "#205131"; // Color for details like the base panel and windows outline

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      xmlSpace="preserve">
      {/* Main Bus Body */}
      <path
        style={{ fill: fillColor }}
        d="M62.629,339.797H45.114c-19.535,0-35.371-15.836-35.371-35.371V146.203
          c0-7.557,6.127-13.684,13.684-13.684h443.587c12.858,0,23.625,9.737,24.915,22.529l14.35,142.371
          c2.042,22.766-15.89,42.377-38.747,42.377h-42.786"
      />
      {/* Bus Windows */}
      <g>
        <rect
          x="194.6"
          y="132.519"
          style={{ fill: "#D3EFFD" }}
          width="103.661"
          height="207.282"
        />
        <path
          style={{ fill: "#D3EFFD" }}
          d="M448.302,234.505H346.339c-9.579,0-17.344-7.765-17.344-17.344l0.884-46.498
              c0.076-3.98,3.324-7.166,7.304-7.166h114.95c6.304,0,11.584,4.775,12.217,11.047l2.952,39.18
              C468.303,224.888,459.511,234.505,448.302,234.505z"
        />
        <path
          style={{ fill: "#D3EFFD" }}
          d="M147.011,234.505H46.318c-3.755,0-6.799-3.044-6.799-6.799v-59.556c0-3.755,3.044-6.799,6.799-6.799
              h100.693c3.755,0,6.799,3.044,6.799,6.799v59.556C153.809,231.461,150.766,234.505,147.011,234.505z"
        />
      </g>
      {/* Bus Bottom and Panels */}
      <path
        style={{ fill: panelColor }}
        d="M506.012,295.304H9.743v9.648c0,19.535,15.836,35.371,35.371,35.371h17.515h362.117h42.786
          c22.857,0,40.789-19.612,38.747-42.377L506.012,295.304z"
      />
      <path
        style={{ fill: "#FFD578" }}
        d="M467.38,295.304h38.685l-4.74-47.023h-26.251c-4.249,0-7.694,3.444-7.694,7.694V295.304z"
      />
      {/* Wheels */}
      <circle
        style={{ fill: "#3E3B43" }}
        cx="104.141"
        cy="339.801"
        r="41.511"
      />
      <circle
        style={{ fill: "#D3EFFD" }}
        cx="104.141"
        cy="339.801"
        r="16.358"
      />
      <circle
        style={{ fill: "#3E3B43" }}
        cx="383.237"
        cy="339.801"
        r="41.511"
      />
      <circle
        style={{ fill: "#D3EFFD" }}
        cx="383.237"
        cy="339.801"
        r="16.358"
      />
      {/* Door and Panels */}
      <g>
        <rect
          x="194.6"
          y="295.098"
          style={{ fill: panelColor }}
          width="103.661"
          height="45.234"
        />
        <rect
          x="194.6"
          y="132.519"
          style={{ fill: panelColor }}
          width="103.661"
          height="24.779"
        />
      </g>
    </svg>
  );
};

export default BusIcon;
