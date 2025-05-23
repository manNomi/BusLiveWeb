const BusStopIconLast = (props) => (
  <svg
    width={`${props.width}px`}
    height={`${props.height}px`}
    xmlns="http://www.w3.org/2000/svg"
    xmlnssvg="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500" // 이 값이 SVG의 실제 크기에 맞아야 합니다
    preserveAspectRatio="xMidYMid meet"
    version="1.0">
    <g class="layer">
      <title>Layer 1</title>
      <g
        fill={
          props.color === 1 ? "red" : props.color === 2 ? "#E6C767" : "green"
        }
        id="svg_1"
        transform="matrix(1 0 0 1 0 0) translate(1 64) translate(0 500) matrix(0.1 0 0 -0.1 0 0)">
        <path
          d="m1362,4184c-151,-40 -263,-146 -317,-299c-23,-65 -25,-83 -25,-271l0,-201l-62,-6c-91,-9 -130,-23 -167,-59c-48,-47 -64,-85 -69,-165l-5,-73l-36,0c-21,0 -46,-6 -56,-14c-18,-13 -19,-28 -16,-282c1,-148 6,-272 9,-276c6,-6 155,-11 280,-9l52,1l0,285l0,285l-29,0c-53,0 -59,6 -50,58c4,26 10,55 14,64c7,19 62,38 107,38l28,0l2,-962l3,-963l26,-55c32,-68 68,-104 122,-125c38,-14 179,-15 1349,-13l1306,3l43,30c23,17 56,53 73,80l31,50l5,975c5,942 6,975 24,978c10,2 38,1 63,-3c39,-6 47,-11 59,-40c8,-19 14,-53 14,-75l0,-40l-45,0l-45,0l0,-279c0,-154 4,-282 8,-285c4,-2 76,-6 158,-8c117,-2 155,0 167,11c15,12 17,44 17,277l0,264l-25,16c-17,11 -35,14 -60,10l-35,-7l0,71c0,114 -34,173 -125,216c-36,17 -68,24 -112,24l-63,0l0,210c0,186 -2,218 -21,272c-46,137 -154,243 -297,290c-52,17 -118,18 -1151,17c-913,0 -1105,-3 -1149,-15zm1749,-204c18,-10 19,-24 19,-248c0,-190 -3,-242 -14,-258c-14,-18 -34,-19 -614,-22c-527,-2 -601,-1 -612,13c-9,11 -14,78 -17,231c-5,236 -1,280 25,287c38,10 1194,7 1213,-3zm-1523,-390c41,-25 56,-58 48,-104c-15,-78 -115,-114 -169,-60c-52,52 -39,134 26,167c43,21 56,21 95,-3zm1942,-9c50,-36 51,-111 2,-156c-62,-58 -172,-8 -172,78c0,50 78,113 125,101c11,-3 31,-14 45,-23zm-1109,-748c1,-214 2,-433 3,-488l1,-100l-580,0l-580,0l-3,488l-2,487l580,0l580,0l1,-387zm1317,-100l-3,-488l-577,-3l-578,-2l0,490l0,490l580,0l580,0l-2,-487zm-848,-868c6,-8 9,-23 5,-34c-6,-19 -17,-20 -373,-23c-202,-2 -375,-1 -384,1c-26,5 -34,42 -12,58c28,20 747,19 764,-2zm-1437,-64c229,-109 300,-162 344,-259c18,-38 25,-70 25,-118c0,-36 -2,-68 -6,-71c-8,-8 -344,53 -403,73c-26,9 -63,27 -82,40c-62,41 -69,62 -71,224c-3,190 -4,180 24,180c13,0 89,-31 169,-69zm2295,-71c4,-172 0,-192 -47,-239c-48,-48 -116,-74 -246,-95c-55,-9 -135,-23 -178,-33c-95,-20 -101,-16 -92,72c9,85 49,168 104,217c66,58 394,221 436,215c19,-2 20,-11 23,-137zm-914,-233c11,-8 17,-23 14,-38l-3,-24l-340,0l-340,0l0,25c0,46 25,50 351,50c231,0 304,-3 318,-13z"
          id="svg_2"
        />
        <path
          d="m1949,3916c-2,-2 -3,-90 -1,-195l3,-191l554,0l555,0l0,195l0,195l-553,0c-305,0 -556,-2 -558,-4zm441,-86c0,-17 -7,-20 -44,-20c-41,0 -44,-2 -48,-30c-4,-28 -3,-30 29,-30c46,0 73,-30 73,-80c0,-62 -33,-90 -105,-90c-54,0 -55,0 -55,30c0,28 2,29 26,19c33,-12 61,-4 75,24c17,30 -23,61 -68,54l-33,-6l0,59c0,88 1,90 81,90c62,0 69,-2 69,-20zm170,-115l0,-135l-25,0c-25,0 -25,0 -25,100l0,100l-30,-6c-27,-6 -30,-4 -30,17c0,26 45,55 88,58c22,1 22,0 22,-134zm210,0l0,-135l-25,0c-25,0 -25,0 -25,100l0,100l-30,-6c-27,-6 -30,-4 -30,17c0,26 45,55 88,58c22,1 22,0 22,-134z"
          id="svg_3"
        />
        <path
          d="m1320,1672c0,-100 2,-110 23,-129c29,-27 58,-41 115,-58c56,-17 294,-56 301,-50c10,10 -22,87 -52,127c-43,57 -117,105 -258,167c-64,28 -119,51 -122,51c-4,0 -7,-49 -7,-108z"
          id="svg_4"
        />
        <path
          d="m3536,1720c-136,-63 -205,-109 -241,-162c-27,-40 -51,-105 -42,-114c8,-9 186,13 262,32c69,18 140,56 155,84c11,21 14,220 3,219c-5,0 -66,-27 -137,-59z"
          id="svg_5"
        />
        <path
          d="m1261,982c7,-136 78,-238 185,-262c66,-16 294,-12 345,5c108,37 161,118 164,252l2,83l-350,0l-349,0l3,-78z"
          id="svg_6"
        />
        <path
          d="m3051,968c6,-102 20,-136 71,-184c68,-64 86,-69 273,-69c155,0 173,2 210,22c88,47 130,120 141,246l7,77l-354,0l-354,0l6,-92z"
          id="svg_7"
        />
      </g>
      <text
        fill="#000000"
        font-family="Serif"
        font-size="180"
        font-weight="bold"
        id="svg_8"
        letter-spacing="6"
        stroke="#000000"
        stroke-width="0"
        text-anchor="middle"
        x="244"
        xmlspace="preserve"
        y="162.5">
        막차
      </text>
    </g>
  </svg>
);

export default BusStopIconLast;
