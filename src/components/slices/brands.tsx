import Container from "../container";

const SolanaLogo = (
  <svg xmlns="http://www.w3.org/2000/svg" fill={"#DDDDDD"} viewBox="0 0 646 96">
    <path d="M108.53 75.6899L90.81 94.6899C90.4267 95.1026 89.9626 95.432 89.4464 95.6573C88.9303 95.8827 88.3732 95.9994 87.81 95.9999H3.81C3.40937 95.9997 3.01749 95.8827 2.68235 95.6631C2.34722 95.4436 2.08338 95.1311 1.92313 94.7639C1.76288 94.3967 1.71318 93.9908 1.78012 93.5958C1.84706 93.2008 2.02772 92.8338 2.3 92.5399L20 73.5399C20.3833 73.1273 20.8474 72.7979 21.3636 72.5725C21.8797 72.3472 22.4368 72.2305 23 72.2299H107C107.404 72.2216 107.802 72.333 108.143 72.5502C108.484 72.7674 108.754 73.0806 108.917 73.4504C109.081 73.8203 109.131 74.2303 109.062 74.6288C108.993 75.0273 108.808 75.3965 108.53 75.6899ZM90.81 37.4199C90.4253 37.0091 89.9608 36.6811 89.445 36.4558C88.9292 36.2306 88.3728 36.1129 87.81 36.11H3.81C3.40937 36.1102 3.01749 36.2272 2.68235 36.4468C2.34722 36.6663 2.08338 36.9788 1.92313 37.346C1.76288 37.7132 1.71318 38.1191 1.78012 38.5141C1.84706 38.9091 2.02772 39.2761 2.3 39.57L20 58.58C20.3847 58.9908 20.8492 59.3188 21.365 59.5441C21.8808 59.7693 22.4372 59.887 23 59.8899H107C107.4 59.8878 107.79 59.7693 108.124 59.5491C108.458 59.3288 108.72 59.0162 108.879 58.6494C109.038 58.2826 109.087 57.8774 109.019 57.4833C108.952 57.0892 108.772 56.7232 108.5 56.43L90.81 37.4199ZM3.81 23.7699H87.81C88.3732 23.7694 88.9303 23.6527 89.4464 23.4273C89.9626 23.202 90.4267 22.8726 90.81 22.4599L108.53 3.45995C108.808 3.16647 108.993 2.79726 109.062 2.39877C109.131 2.00028 109.081 1.59031 108.917 1.22045C108.754 0.850591 108.484 0.537368 108.143 0.320195C107.802 0.103021 107.404 -0.0084012 107 -5.10783e-05H23C22.4368 0.000541762 21.8797 0.117167 21.3636 0.342553C20.8474 0.567938 20.3833 0.897249 20 1.30995L2.3 20.3099C2.02772 20.6038 1.84706 20.9708 1.78012 21.3658C1.71318 21.7608 1.76288 22.1667 1.92313 22.5339C2.08338 22.9011 2.34722 23.2136 2.68235 23.4331C3.01749 23.6527 3.40937 23.7697 3.81 23.7699Z" />
    <path d="M210.94 40.6002H166V25.8002H222.62V11.0002H165.85C163.91 10.9897 161.988 11.3613 160.192 12.0938C158.396 12.8264 156.761 13.9055 155.383 15.2696C154.004 16.6337 152.907 18.2561 152.155 20.044C151.403 21.832 151.01 23.7506 151 25.6902V40.6902C151.008 42.6315 151.398 44.5523 152.149 46.3425C152.9 48.1328 153.996 49.7575 155.375 51.1237C156.755 52.49 158.39 53.5709 160.187 54.3047C161.984 55.0385 163.909 55.4108 165.85 55.4002H210.85V70.2002H152.07V85.0002H210.94C212.88 85.0108 214.802 84.6391 216.598 83.9066C218.394 83.174 220.029 82.0949 221.407 80.7308C222.786 79.3667 223.883 77.7444 224.635 75.9564C225.387 74.1684 225.78 72.2498 225.79 70.3102V55.3102C225.782 53.3689 225.392 51.4482 224.641 49.6579C223.89 47.8676 222.794 46.2429 221.415 44.8767C220.035 43.5105 218.4 42.4296 216.603 41.6958C214.806 40.962 212.881 40.5897 210.94 40.6002Z" />
    <path d="M298 11H252.89C250.947 10.9842 249.02 11.3519 247.219 12.0821C245.419 12.8123 243.78 13.8905 242.397 15.2552C241.013 16.6198 239.913 18.2439 239.159 20.0345C238.404 21.8251 238.01 23.747 238 25.69V70.31C238.01 72.253 238.404 74.1749 239.159 75.9655C239.913 77.7561 241.013 79.3802 242.397 80.7448C243.78 82.1095 245.419 83.1877 247.219 83.9179C249.02 84.6481 250.947 85.0158 252.89 85H298C299.94 85.0105 301.862 84.6389 303.658 83.9064C305.454 83.1738 307.089 82.0947 308.467 80.7306C309.846 79.3665 310.943 77.7441 311.695 75.9562C312.447 74.1682 312.84 72.2496 312.85 70.31V25.69C312.84 23.7504 312.447 21.8318 311.695 20.0438C310.943 18.2559 309.846 16.6335 308.467 15.2694C307.089 13.9053 305.454 12.8262 303.658 12.0936C301.862 11.3611 299.94 10.9895 298 11ZM297.89 70.2H253V25.8H297.87L297.89 70.2Z" />
    <path d="M456 11.0001H412C410.06 10.9896 408.138 11.3612 406.342 12.0937C404.546 12.8263 402.911 13.9054 401.533 15.2695C400.154 16.6336 399.057 18.256 398.305 20.0439C397.553 21.8319 397.16 23.7505 397.15 25.6901V85.0001H412.15V60.6901H455.95V85.0001H470.95V25.6901C470.94 23.742 470.544 21.8152 469.786 20.0206C469.027 18.2261 467.922 16.5993 466.532 15.2338C465.143 13.8684 463.497 12.7914 461.689 12.0648C459.881 11.3382 457.948 10.9764 456 11.0001ZM455.89 45.8901H412.09V25.8001H455.89V45.8901Z" />
    <path d="M631.15 11.0002H587.15C585.21 10.9897 583.288 11.3613 581.492 12.0938C579.696 12.8264 578.062 13.9055 576.683 15.2696C575.304 16.6337 574.207 18.2561 573.455 20.044C572.703 21.832 572.31 23.7506 572.3 25.6902V85.0002H587.3V60.6902H631V85.0002H646V25.6902C645.99 23.7506 645.597 21.832 644.845 20.044C644.093 18.2561 642.996 16.6337 641.617 15.2696C640.238 13.9055 638.604 12.8264 636.808 12.0938C635.012 11.3613 633.09 10.9897 631.15 11.0002ZM631 45.8902H587.2V25.8002H631V45.8902Z" />
    <path d="M544 70.2001H538L516.55 17.2001C515.815 15.3716 514.55 13.8045 512.918 12.6999C511.286 11.5952 509.361 11.0033 507.39 11.0001H494.08C492.786 10.9935 491.504 11.2418 490.307 11.7307C489.109 12.2197 488.02 12.9397 487.1 13.8497C486.181 14.7598 485.45 15.8419 484.949 17.0345C484.448 18.227 484.187 19.5066 484.18 20.8001V85.0001H499.18V25.8001H505.18L526.62 78.8001C527.367 80.6251 528.642 82.1858 530.281 83.283C531.919 84.3803 533.848 84.9641 535.82 84.9601H549.13C550.424 84.9667 551.706 84.7185 552.903 84.2295C554.101 83.7406 555.19 83.0205 556.11 82.1105C557.029 81.2005 557.76 80.1183 558.261 78.9258C558.762 77.7332 559.023 76.4537 559.03 75.1601V11.0001H544V70.2001Z" />
    <path d="M341.1 11H326.1V70.31C326.11 72.2539 326.505 74.1766 327.26 75.9678C328.015 77.7591 329.116 79.3836 330.5 80.7484C331.884 82.1132 333.525 83.1912 335.326 83.9208C337.128 84.6504 339.056 85.0171 341 85H386V70.2H341.1V11Z" />
  </svg>
);
const ChainLinkLogo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={"#DDDDDD"}
    viewBox="0 0 184.65 56.71"
  >
    <path d="M63.39,28a10,10,0,0,1,9.67-10.4h.41c5.1,0,8.11,3,9,6.51L79.3,25.17a5.58,5.58,0,0,0-5.83-4.38c-3.3,0-6.61,2.41-6.61,7.27s3.23,7.18,6.65,7.18a6,6,0,0,0,5.95-4.41l3.11,1a9,9,0,0,1-9.1,6.63,9.91,9.91,0,0,1-10.09-9.72C63.37,28.5,63.38,28.25,63.39,28Z" />
    <path d="M88.74,38H85.46V17.54h3.28v8a4.85,4.85,0,0,1,3.9-1.72c3.39,0,5,2.43,5,5.46V38H94.48V29.86a2.67,2.67,0,0,0-2.24-3,2.89,2.89,0,0,0-.59,0,2.86,2.86,0,0,0-2.86,2.86,2.09,2.09,0,0,0,0,.25Z" />
    <path d="M105,30.12l3.52-.55c.8-.1,1-.51,1-1,0-1.16-.78-2.09-2.6-2.09a2.62,2.62,0,0,0-2.82,2.37V29l-3-.67c.25-2.38,2.41-4.5,5.79-4.5,4.24,0,5.85,2.4,5.85,5.2v6.83a13.62,13.62,0,0,0,.17,2.21h-3a8,8,0,0,1-.13-1.76,4.78,4.78,0,0,1-4.24,2.17,4.32,4.32,0,0,1-4.66-3.94c0-.07,0-.14,0-.2C100.83,31.81,102.64,30.45,105,30.12Zm4.54,2.21V31.7l-3.59.54a1.89,1.89,0,0,0-1.83,1.87A1.82,1.82,0,0,0,106,35.9h.15a3.12,3.12,0,0,0,3.43-2.8A3.22,3.22,0,0,0,109.53,32.33Z" />
    <path d="M118.32,17.26a2.14,2.14,0,0,1,2.17,2.12v0a2.14,2.14,0,1,1-2.17-2.14Zm-1.6,20.8V24.24H120V38Z" />
    <path d="M127.47,38H124.2V24.24h3.19v1.83a4.55,4.55,0,0,1,4.07-2.23c3.36,0,5,2.43,5,5.46V38h-3.27V29.86c0-1.69-.77-3.06-2.83-3.06a2.9,2.9,0,0,0-2.88,2.92c0,.11,0,.22,0,.33Z" />
    <path d="M140.42,38V17.54h3.28V38Z" />
    <path d="M149.55,17.26a2.13,2.13,0,1,1-2.12,2.12A2.14,2.14,0,0,1,149.55,17.26Zm-1.61,20.8V24.24h3.25V38Z" />
    <path d="M158.71,38h-3.28V24.24h3.19v1.83a4.56,4.56,0,0,1,4.07-2.23c3.36,0,5,2.43,5,5.46V38h-3.28V29.86a2.67,2.67,0,0,0-2.24-3,3,3,0,0,0-.6,0,2.9,2.9,0,0,0-2.87,2.9,2,2,0,0,0,0,.35Z" />
    <path d="M178.88,30.05l5.77,8h-4l-4-5.67-1.69,1.78V38h-3.25V17.54h3.25V29.8l5.28-5.56h4.35Z" />
    <path d="M24.56,12l14.18,8.14V36.5L24.6,44.69,10.43,36.57V20.22L24.56,12m0-12-5.2,3L5.2,11.22l-5.2,3V42.59l5.2,3,14.18,8.14,5.2,3,5.2-3,14.13-8.2,5.2-3V14.12l-5.2-3L29.74,3l-5.2-3Z" />
  </svg>
);
const SeededNetworkLogo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={"#DDDDDD"}
    viewBox="0 0 768.19 152.64"
  >
    <path d="M260.54,129.64c-28.37,0-46.09-15.21-47.82-39h24.15c.47,12.39,8.62,20.38,23.2,20.38,12.07,0,20.7-5.33,20.7-14.42,0-7.21-5.49-11.29-15-13.17l-18.5-3.61C230.13,76.49,217,67.24,217,48.58c0-20.06,17.71-34.49,42-34.49,25.25,0,43.75,14.74,45.31,38.26H280.14c-.78-11.76-8.94-19.76-20.85-19.76-11.6,0-18.19,6.59-18.19,14.43s7.06,11,15.21,12.54l19.28,3.92C295.35,67.4,306,76.49,306,93.11,306,114.59,288.76,129.64,260.54,129.64Z" />
    <path d="M358.37,129.48c-24.93,0-41.86-17.24-41.86-43.58,0-24.93,17.4-43.12,41.55-43.12,26.49,0,44.05,21.48,40.13,48.76h-59.1c.15,12.86,7.52,21.17,18.65,21.17,9.57,0,16.15-4.71,18.66-13h21.48C393.17,118.51,378.59,129.48,358.37,129.48ZM339.09,77.75H375c-.47-11.61-7.21-19-17.4-19C347.24,58.78,340,66.61,339.09,77.75Z" />
    <path d="M448.83,129.48C423.9,129.48,407,112.24,407,85.9c0-24.93,17.4-43.12,41.55-43.12,26.49,0,44.05,21.48,40.13,48.76h-59.1c.15,12.86,7.52,21.17,18.65,21.17,9.57,0,16.15-4.71,18.66-13h21.48C483.64,118.51,469.06,129.48,448.83,129.48ZM429.55,77.75h35.9c-.47-11.61-7.21-19-17.4-19C437.7,58.78,430.49,66.61,429.55,77.75Z" />
    <path d="M561.08,116c-6.58,8.78-15.67,13.64-26.49,13.64-22.58,0-37.16-19-37.16-43.43,0-24.77,14.58-43.43,37.16-43.43,9.88,0,18.5,4.39,24.77,12.39V15.5H581V128.07H561.08Zm-21.63-5.8c10.82,0,19.91-8.47,19.75-24.3S550,62.07,539.45,62.07c-10.66,0-19.6,8.15-19.6,24.14C519.85,101.89,528.79,110.2,539.45,110.2Z" />
    <path d="M636,129.48c-24.92,0-41.86-17.24-41.86-43.58,0-24.93,17.41-43.12,41.55-43.12,26.49,0,44,21.48,40.13,48.76h-59.1c.16,12.86,7.52,21.17,18.66,21.17,9.56,0,16.14-4.71,18.65-13h21.48C670.83,118.51,656.25,129.48,636,129.48ZM616.74,77.75h35.9c-.47-11.61-7.21-19-17.4-19C624.89,58.78,617.68,66.61,616.74,77.75Z" />
    <path d="M748.28,116c-6.59,8.78-15.68,13.64-26.5,13.64-22.58,0-37.16-19-37.16-43.43,0-24.77,14.58-43.43,37.16-43.43,9.88,0,18.5,4.39,24.77,12.39V15.5h21.64V128.07H748.28Zm-21.64-5.8c10.82,0,19.91-8.47,19.75-24.3s-9.25-23.83-19.75-23.83C716,62.07,707,70.22,707,86.21,707,101.89,716,110.2,726.64,110.2Z" />
    <path
      className="cls-2"
      d="M146.64,46.61a76.36,76.36,0,1,0-70.32,106V132a10.8,10.8,0,0,0-8.79-10.58c-29.62-5.77-49.16-40.09-28.69-73a29.65,29.65,0,0,1,9.52-9.52c32.83-20.39,67-1.08,73,28.36a11.39,11.39,0,0,0,11.16,9.12h20.15A75.9,75.9,0,0,0,146.64,46.61Z"
    />
    <path
      className="cls-3"
      d="M61.14,68.48v23H84.79a6.72,6.72,0,0,0,6.71-6.71V61.14h-23A7.34,7.34,0,0,0,61.14,68.48Z"
    />
  </svg>
);
const GamesolLogo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={"#DDDDDD"}
    viewBox="0 0 1024 265"
  >
    <path
      d="M234.42,143.91h44.93v20.66H235.67q-13.59,0-22.4-8.46t-8.8-22.05q0-13.74,8.8-22.47t22.4-8.74h53.52V86.35H235.67q-20.94,0-34.32,12.76T188,132.67q0,20.94,13.52,34.67t34.18,13.73h60.18V128.79H234.42Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M377,89.12c-2.59-2-5.09-3.05-7.48-3.05-2.22,0-4.72,1.07-7.49,3.19a22.16,22.16,0,0,0-5.41,6.11l-51.44,85.7h21.18L369,110.73l16.42,27.21h-25l-9.95,16.51h44.95l15.84,26.49,21.29.13L382.37,95.36A21.92,21.92,0,0,0,377,89.12Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M557.36,87.87A9.46,9.46,0,0,0,550.71,85q-5.4,0-10.26,9.3l-31.82,62.19-31.7-62.12Q472.1,85,466.71,85a9.12,9.12,0,0,0-6.57,2.78,12.82,12.82,0,0,0-3.66,6.51l-21.14,87h18.71l13.59-66.29,31.76,61q3.32,6.39,9.7,6.38,5.68,0,8.88-6.24l31.75-61.16,13.73,66.29H582L561,94.25A13.76,13.76,0,0,0,557.36,87.87Z"
      transform="translate(-3 -2.5)"
    />
    <rect x="620.22" y="122.27" width="54.08" height="16.5" />
    <polygon points="596.78 178.57 678.59 178.57 678.59 162.07 613.28 162.07 613.28 100.35 678.59 100.35 678.59 83.85 596.78 83.85 596.78 178.57" />
    <path
      d="M791.68,130q-9.15-7.91-22.87-7.91H724.16a13,13,0,0,1-8-2.49,8.34,8.34,0,0,1-3.33-7.08,8.54,8.54,0,0,1,3.33-7.07,12.52,12.52,0,0,1,8-2.64h71.41V86.35H724.16q-12.35,0-20.66,6.8a23.8,23.8,0,0,0-8.88,19.27q0,12.08,8.88,19.42,8.31,6.79,20.66,6.8h44.65a22.13,22.13,0,0,1,11.64,2.91q5.84,3.47,5.83,9.84a11.58,11.58,0,0,1-5.69,10.13,22.17,22.17,0,0,1-11.78,3H696.57v16.5h72.24q13.73,0,22.87-7.62,9.57-8.19,9.57-21.64T791.68,130Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M887.36,86.35H860.88q-20.94,0-34.32,12.76t-13.38,33.56q0,20.94,13.52,34.67t34.18,13.73h26.48q20.79,0,34.25-13.73t13.45-34.67q0-20.8-13.31-33.56T887.36,86.35Zm22.53,69.76q-8.8,8.46-22.53,8.46H860.88q-13.59,0-22.4-8.46t-8.8-22.05q0-13.74,8.8-22.47t22.4-8.74h26.48q13.73,0,22.53,8.74t8.81,22.47Q918.7,147.65,909.89,156.11Z"
      transform="translate(-3 -2.5)"
    />
    <polygon points="957.99 162.07 957.99 83.85 941.49 83.85 941.49 178.57 1023.16 178.57 1023.16 162.07 957.99 162.07" />
    <path
      d="M161.47,85.59c-1.4-.36-2.81-.74-4.23-1.12-25-6.73-53.09-16.86-75-27.92-21.91,11.06-50.05,21.19-75,27.92-1.42.38-2.83.76-4.23,1.12.13,1.68.32,3.36.59,5a296.3,296.3,0,0,1,3.65,46.45A295.89,295.89,0,0,1,3.83,181.9a295.41,295.41,0,0,1,70.06,85.6h1V170.13h0l-50-40.07V107.2l48.52,28.17-2.94,15.95,11.59,13.24L94,151.32l-3-16.12,48.52-28V130l-50,40.17V267.5h1a295.53,295.53,0,0,1,70.05-85.6,296.55,296.55,0,0,1,.25-91.29C161.15,89,161.34,87.27,161.47,85.59Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M6.65,77.34l2-.54A365,365,0,0,0,82.23,49.2,365.34,365.34,0,0,0,155.8,76.8c.67.18,1.34.37,2,.54l.09,0c0-.47,0-.94,0-1.41A75.76,75.76,0,0,0,100.74,2.5L92.87,19.75,89.58,27H74.88l-3.28-7.2L63.73,2.5A75.77,75.77,0,0,0,6.51,76c0,.47,0,.94,0,1.41Z"
      transform="translate(-3 -2.5)"
    />
    <rect x="875.44" y="228.11" width="148.56" height="1.98" />
    <rect x="184.13" y="228.11" width="148.56" height="1.98" />
    <path
      d="M403,242.17h-5.23l-5.7-5.74h-7.68v-3.55h9.56a6,6,0,0,0,3.32-.87,3.26,3.26,0,0,0,1.52-2.88q0-3.81-4.84-3.81H382.25v16.85H378.7V221.76h14.63a10.78,10.78,0,0,1,6.36,1.71,7.1,7.1,0,0,1,1.16,10.15,8,8,0,0,1-4.08,2.42Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M460.44,231.74a10.2,10.2,0,0,1-2.9,7.47,9.89,9.89,0,0,1-7.37,3h-5.71a9.89,9.89,0,0,1-7.36-3,10.21,10.21,0,0,1-2.91-7.47,9.54,9.54,0,0,1,2.88-7.23,10.29,10.29,0,0,1,7.39-2.75h5.71a10.26,10.26,0,0,1,7.4,2.75A9.57,9.57,0,0,1,460.44,231.74Zm-3.52.3a6.47,6.47,0,0,0-6.75-6.72h-5.71a6.47,6.47,0,0,0-6.72,6.72,6.27,6.27,0,0,0,1.9,4.75,6.64,6.64,0,0,0,4.82,1.82h5.71a6.68,6.68,0,0,0,4.85-1.82A6.3,6.3,0,0,0,456.92,232Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M514.68,236.22a4.93,4.93,0,0,1-.66,2.48q-2,3.44-7.47,3.44H491.92V221.73h14.63q5.24,0,7.32,3.26a5.3,5.3,0,0,1-1.34,7.08A5.09,5.09,0,0,1,514.68,236.22Zm-3.44-8.45a2.15,2.15,0,0,0-1.49-2,6.57,6.57,0,0,0-2.66-.51H495.47v13.29h11.62a7.23,7.23,0,0,0,2.6-.44c1-.44,1.55-1.07,1.55-1.89s-.51-1.47-1.55-1.91a6.77,6.77,0,0,0-2.6-.48h-9.53v-3.55h9.53a6.26,6.26,0,0,0,2.66-.54A2.17,2.17,0,0,0,511.24,227.77Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M572.56,231.74a10.24,10.24,0,0,1-2.9,7.47,9.89,9.89,0,0,1-7.38,3h-5.7a9.89,9.89,0,0,1-7.36-3,10.22,10.22,0,0,1-2.92-7.47,9.55,9.55,0,0,1,2.89-7.23,10.27,10.27,0,0,1,7.39-2.75h5.7a10.27,10.27,0,0,1,7.41,2.75A9.57,9.57,0,0,1,572.56,231.74ZM569,232a6.55,6.55,0,0,0-1.89-4.84,6.64,6.64,0,0,0-4.86-1.88h-5.7a6.47,6.47,0,0,0-6.72,6.72,6.27,6.27,0,0,0,1.9,4.75,6.64,6.64,0,0,0,4.82,1.82h5.7a6.72,6.72,0,0,0,4.86-1.82A6.3,6.3,0,0,0,569,232Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M634.38,242.2h-4l-3-14.28-6.84,13.17a2.1,2.1,0,0,1-1.91,1.35,2.26,2.26,0,0,1-2.09-1.38l-6.84-13.14-2.93,14.28h-4l4.56-18.73a2.75,2.75,0,0,1,.78-1.41,2,2,0,0,1,1.42-.59c.77,0,1.51.67,2.2,2l6.83,13.38,6.85-13.39c.7-1.34,1.44-2,2.21-2a2,2,0,0,1,1.44.62,3,3,0,0,1,.77,1.38Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M692.8,242.17l-4.59,0-3.41-5.71h-9.68l2.14-3.55h5.39L679.11,227l-9.2,15.15h-4.56l11.08-18.46a4.8,4.8,0,0,1,1.17-1.32,2.73,2.73,0,0,1,1.61-.69,2.63,2.63,0,0,1,1.61.66,4.71,4.71,0,0,1,1.17,1.35Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M743.3,240.41c0,1.31-.45,2-1.35,2a3.42,3.42,0,0,1-2.21-1.22L726.67,228v14.16h-3.53V223.53a2,2,0,0,1,.39-1.24,1.3,1.3,0,0,1,1.1-.53,3,3,0,0,1,2,1.05l13.08,13.11V221.76h3.55Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M780.63,242.17h-3.55V221.76h3.55Z"
      transform="translate(-3 -2.5)"
    />
    <path
      d="M840,242.17l-4.59,0L832,236.43h-9.68l2.14-3.55h5.39L826.35,227l-9.2,15.15h-4.56l11.08-18.46a4.8,4.8,0,0,1,1.17-1.32,2.73,2.73,0,0,1,1.61-.69,2.63,2.63,0,0,1,1.61.66,4.53,4.53,0,0,1,1.16,1.35Z"
      transform="translate(-3 -2.5)"
    />
  </svg>
);
const SecretumLogo = (
  <svg xmlns="http://www.w3.org/2000/svg" fill={"#DDDDDD"} viewBox="0 0 206 28">
    <path d="M30.5344 26.9732C29.3988 26.7502 27.6677 25.8883 26.8237 25.1259C25.7244 24.1326 24.9368 22.6437 24.6302 20.979L24.5144 20.3502L25.8508 20.0351C26.5858 19.8618 27.2119 19.7479 27.2422 19.7819C27.2724 19.8159 27.4255 20.2912 27.5824 20.838C27.9536 22.1316 29.1054 23.436 30.3779 24.0038C31.1509 24.3488 31.6088 24.4203 33.073 24.4247C34.6857 24.4297 34.9276 24.3846 35.8952 23.9008C36.7768 23.4599 37.0231 23.2314 37.3701 22.5317C37.7122 21.8419 37.7644 21.5433 37.6621 20.8611C37.4168 19.2252 36.1024 18.5462 32.4556 18.1715C28.5666 17.7718 26.4957 16.6277 25.7772 14.4817C25.5183 13.7084 25.5192 11.8638 25.7792 11.0948C26.5106 8.92923 28.8315 7.46835 31.8385 7.28077C34.8903 7.09039 37.6731 8.21429 39.0424 10.1902C39.5238 10.8848 40.3015 12.8507 40.1535 12.9988C40.0959 13.0564 37.7351 13.7195 37.4598 13.7554C37.4471 13.7574 37.3425 13.3845 37.2274 12.9276C36.7851 11.1712 34.799 9.87785 32.544 9.87785C29.7658 9.87785 27.972 11.4614 28.5531 13.401C28.9496 14.7244 30.3276 15.347 33.6412 15.6997C36.897 16.0463 38.389 16.6252 39.5639 17.9979C39.9002 18.3907 40.2727 19.0601 40.3918 19.4854C40.6959 20.5716 40.5534 22.8448 40.1261 23.7244C39.363 25.295 37.6261 26.509 35.4899 26.9646C34.419 27.193 31.6782 27.1978 30.5347 26.9736L30.5344 26.9732ZM52.5824 26.8848C49.5291 26.0637 47.0963 23.4314 46.3108 20.099C45.9612 18.6158 45.9558 15.3811 46.3007 14.057C46.8368 11.9986 48.225 10.0483 50.0486 8.79133C52.6109 7.02523 56.5856 6.75025 59.3536 8.1476C62.5705 9.77151 64.2057 12.5571 64.2057 16.4133V18.1681H56.5963H48.9868L49.087 19.1388C49.2933 21.1371 50.55 22.96 52.3068 23.8091C53.0133 24.1506 53.5371 24.2455 55.0334 24.3029C56.6286 24.3641 57.0303 24.3195 57.9295 23.9813C59.2274 23.493 60.3479 22.481 60.8291 21.3625L61.1967 20.508L62.4807 20.8552C63.1869 21.0462 63.8253 21.259 63.8993 21.328C64.1324 21.5454 62.9793 23.5985 62.0581 24.6065C61.0503 25.7091 59.2291 26.7041 57.6993 26.9877C56.347 27.2385 53.6997 27.1852 52.5824 26.8848H52.5824ZM61.207 14.8449C61.207 14.108 60.2289 12.2779 59.487 11.6265C59.1322 11.3149 58.4017 10.8535 57.8637 10.6012C57.0251 10.2079 56.6463 10.1424 55.2098 10.1424C53.7733 10.1424 53.3944 10.2079 52.5559 10.6012C52.0179 10.8535 51.2962 11.3072 50.9522 11.6092C50.2738 12.2048 49.3235 13.8541 49.1293 14.7726L49.0081 15.3459H55.1076H61.207V14.8449ZM77.082 26.898C73.6679 26.0659 71.1472 23.6317 70.2896 20.3388C69.9335 18.9718 69.9424 15.6346 70.3059 14.2248C71.1082 11.1129 73.3809 8.7872 76.7292 7.65163C78.217 7.14706 81.3664 7.18808 82.9471 7.73263C84.2753 8.19014 85.8939 9.29728 86.7561 10.3379C87.7598 11.5495 88.8309 14.0627 88.4891 14.4045C88.4338 14.4598 87.7917 14.6438 87.0623 14.8134L85.7362 15.1217L85.4731 14.2195C84.6637 11.4436 82.3922 9.92568 79.2912 10.0884C76.7543 10.2216 74.7821 11.5584 73.6752 13.8951C73.1332 15.0392 73.1132 15.1627 73.1132 17.3744C73.1132 19.4908 73.1495 19.7448 73.5842 20.6722C74.1841 21.9519 75.315 23.0828 76.6506 23.7386C77.6248 24.2169 77.8435 24.2535 79.7278 24.2535C81.6467 24.2535 81.8073 24.2252 82.7009 23.7303C83.9685 23.0282 84.9079 21.9183 85.403 20.5379C85.6269 19.9136 85.9051 19.4028 86.0212 19.4028C86.2577 19.4028 88.609 19.9349 88.6781 20.0041C88.8024 20.1283 88.0936 22.0801 87.6237 22.9078C86.4895 24.9057 84.6346 26.2926 82.2925 26.894C81.0164 27.2217 78.4179 27.2237 77.082 26.898L77.082 26.898ZM124.373 26.8847C121.604 26.1401 119.542 24.1151 118.394 21.0114C117.801 19.4108 117.649 16.1658 118.077 14.2445C118.975 10.2082 122.833 7.23716 127.176 7.23716C130.259 7.23716 133.009 8.69544 134.616 11.182C135.621 12.7375 135.996 14.1364 135.996 16.3346V18.1681H128.387H120.778L120.894 19.1823C121.119 21.1383 122.293 22.8409 124.057 23.771C124.912 24.2222 125.115 24.2535 127.176 24.2535C129.226 24.2535 129.444 24.2203 130.274 23.7821C131.316 23.2326 132.247 22.2579 132.701 21.242L133.023 20.5235L134.377 20.8762C135.122 21.0701 135.76 21.2506 135.796 21.2772C135.832 21.3038 135.615 21.8515 135.314 22.4942C134.67 23.8706 132.969 25.6653 131.763 26.2409C129.84 27.1584 126.479 27.4512 124.373 26.8847V26.8847ZM132.974 14.6234C132.554 12.7548 131.502 11.4479 129.778 10.6513C128.808 10.2034 128.475 10.1424 127 10.1424C125.556 10.1424 125.187 10.207 124.328 10.6094C122.654 11.3945 121.351 13.0245 120.931 14.8608L120.82 15.3458H126.978H133.136L132.974 14.6234V14.6234ZM166.84 26.8366C164.9 26.197 163.643 24.9428 162.767 22.7727C162.38 21.8127 162.366 21.5809 162.314 14.7726L162.259 7.76112H163.666H165.073L165.14 14.2434C165.212 21.2781 165.247 21.5475 166.26 22.876C167.083 23.9546 167.922 24.2535 170.127 24.2535C171.782 24.2535 172.171 24.1973 172.773 23.8715C173.788 23.3219 174.709 22.2948 175.277 21.0785L175.772 20.0201L175.824 13.8906L175.877 7.76112H177.368H178.858V17.1979V26.6347H177.359H175.86V24.959C175.86 23.6527 175.806 23.2833 175.617 23.2833C175.483 23.2833 175.275 23.5197 175.156 23.8087C174.812 24.6392 173.236 26.1148 172.164 26.6091C170.845 27.2181 168.323 27.3258 166.84 26.8366H166.84ZM93.4862 25.3118V23.9889H95.6028H97.7195V17.1979V10.4069H95.7792H93.8389V9.08402V7.76111H97.2785H100.718V8.99583C100.718 10.4636 100.958 10.5968 101.668 9.52364C102.997 7.51532 105.775 6.73514 108.548 7.59152C109.47 7.87637 109.906 8.14215 110.647 8.87034C111.161 9.37592 111.767 10.1864 111.993 10.6715C112.398 11.541 112.966 14.1959 112.804 14.4588C112.758 14.5331 112.223 14.6488 111.614 14.716C111.006 14.7832 110.329 14.8817 110.111 14.9348C109.758 15.0207 109.714 14.9647 109.714 14.4268C109.714 13.5225 109.233 12.0794 108.735 11.4874C107.716 10.2755 105.627 9.74619 103.831 10.2448C102.878 10.5094 101.736 11.7126 101.233 12.981C100.842 13.9694 100.817 14.2787 100.755 19.0059L100.689 23.9889H103.173H105.657V25.3118V26.6347H99.5716H93.4862L93.4862 25.3118ZM147.549 26.4646C147.355 26.3834 147.009 26.1391 146.78 25.9217C145.898 25.0844 145.874 24.852 145.874 17.38V10.4069H142.875H139.876V9.08402V7.76111H142.875H145.874V3.88055V0H147.373H148.872V3.88055V7.76111H152.488H156.104V9.08402V10.4069H152.488H148.872V16.9207C148.872 22.6072 148.907 23.4697 149.149 23.7117C149.379 23.9412 149.925 23.9889 152.324 23.9889H155.222V25.3118V26.6347L151.562 26.6235C149.549 26.6175 147.743 26.5459 147.549 26.4646V26.4646ZM185.738 17.1979V7.76111H187.237H188.736V8.81944C188.736 9.40152 188.814 9.87777 188.909 9.87777C189.004 9.87777 189.241 9.56487 189.436 9.18244C190.114 7.85346 191.611 7.11521 193.279 7.2873C194.492 7.41249 195.433 8.03968 195.993 9.0951C196.471 9.99566 196.691 10.0632 197.038 9.41554C197.441 8.66208 198.728 7.6479 199.587 7.40764C200.536 7.14179 202.218 7.25646 202.955 7.63721C203.747 8.04706 204.443 8.81712 204.899 9.78958L205.313 10.6715L205.315 18.6531L205.317 26.6347H203.915H202.513L202.46 19.2705C202.412 12.575 202.378 11.8535 202.09 11.3252C201.103 9.51807 198.423 9.65179 197.468 11.5558C197.135 12.2192 197.112 12.6663 197.065 19.4469L197.016 26.6347H195.522H194.028V19.3971C194.028 11.5881 194.014 11.4574 193.082 10.5979C192.748 10.2898 192.363 10.1523 191.693 10.102C190.485 10.0114 189.681 10.4413 189.138 11.4675C188.739 12.2211 188.737 12.2761 188.737 19.4305V26.6348H187.237H185.738V17.198L185.738 17.1979ZM8.11394 20.1305C8.11394 18.2493 8.18883 17.2946 8.37852 16.7569C8.69781 15.852 8.69626 15.9331 8.39642 15.8181C8.23222 15.7551 7.97008 16.0583 7.61207 16.7253C7.29048 17.3244 6.41287 18.3834 5.42867 19.36L3.783 20.993L2.8223 20.0202L1.8616 19.0474L3.53254 17.3668C4.45156 16.4424 5.62019 15.4501 6.12952 15.1617C6.63884 14.8732 7.05556 14.5718 7.05556 14.4918C7.05556 14.1753 6.81694 14.1487 6.13548 14.3891C5.63807 14.5646 4.60695 14.6403 2.71185 14.6403H0V13.3174V11.9944H2.71185C4.60695 11.9944 5.63807 12.07 6.13548 12.2456C6.80936 12.4833 7.05556 12.4589 7.05556 12.1544C7.05556 12.0807 6.63884 11.7803 6.12952 11.487C5.62019 11.1937 4.45156 10.1962 3.53254 9.27048L1.8616 7.58728L2.8223 6.6145L3.783 5.64172L5.41304 7.26497C6.40598 8.25378 7.25638 9.28844 7.58883 9.91217C7.88899 10.4753 8.20462 10.9361 8.29021 10.9361C8.60647 10.9361 8.63388 10.6017 8.3773 9.87437C8.18897 9.34061 8.11391 8.38015 8.11391 6.5042V3.88055H9.43684H10.7598V6.55001C10.7598 8.07543 10.6715 9.51416 10.5537 9.90706C10.405 10.4034 10.4012 10.6481 10.54 10.787C10.6789 10.9258 10.8816 10.7157 11.269 10.0316C11.5642 9.51045 12.5845 8.30946 13.5363 7.36279L15.2669 5.64155L16.2275 6.61432L17.1882 7.58708L15.6056 9.18455C14.6756 10.1232 13.5722 11.0361 12.9299 11.3982C12.181 11.8203 11.8676 12.0945 11.9345 12.269C12.053 12.5779 11.9702 12.5788 12.8764 12.259C13.4141 12.0693 14.3687 11.9944 16.25 11.9944L18.8736 11.9944V13.3173V14.6402H16.2558C14.5184 14.6402 13.3617 14.557 12.8162 14.3929C12.0699 14.1683 11.9945 14.1723 11.9951 14.437C11.9954 14.6086 12.3916 14.942 12.959 15.248C13.5066 15.5434 14.6271 16.4754 15.5554 17.4075L17.1884 19.0474L16.2276 20.0202L15.2669 20.9931L13.5363 19.2719C12.5845 18.3252 11.5642 17.1242 11.269 16.603C10.8816 15.9189 10.6789 15.7089 10.54 15.8477C10.4012 15.9865 10.405 16.2312 10.5537 16.7276C10.6715 17.1205 10.7597 18.5592 10.7597 20.0846L10.7598 22.7541H9.43684H8.11391L8.11394 20.1305Z" />
  </svg>
);

const Brands = () => (
  <section>
    <Container>
      <div
        className={"gap-x-20 mb-10 lg:mb-0 justify-around items-center grid grid-cols-2 px-2 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-5"}>
        <a href={"https://solana.com/"} target={"_blank"} rel="noreferrer">
          {SolanaLogo}
        </a>
        <a href={"https://chain.link/"} target={"_blank"} rel="noreferrer">
          {ChainLinkLogo}
        </a>
        <a href={"https://seeded.network/"} target={"_blank"} rel="noreferrer">
          {SeededNetworkLogo}
        </a>
        <a href={"https://gamesol.io/"} target={"_blank"} rel="noreferrer">
          {GamesolLogo}
        </a>
        <a href={"https://secretum.io/"} target={"_blank"} rel="noreferrer">
          {SecretumLogo}
        </a>
      </div>
    </Container>
  </section>
);

export default Brands;
