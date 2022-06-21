import * as React from "react";

const IconPause = (props) => (
  <svg
    width="700pt"
    height="700pt"
    viewBox="0 0 700 700"
    xmlns="http://www.w3.org/2000/svg"
    className={props.classicon}
    id={props.id}
    {...props}
  >
    <g fillRule="evenodd">
      <path
        transform="translate(0, 70)"
        d="M143.6 511.59V48.1c0-19.582 19.582-35.457 35.457-35.457h84.426c19.582 0 35.457 15.875 35.457 35.457v463.49c0 19.582-19.582 35.457-35.457 35.457h-84.426c-19.582 0-35.457-15.875-35.457-35.457zM400.48 511.59V48.1c0-19.582 19.582-35.457 35.457-35.457h84.426c19.582 0 35.457 15.875 35.457 35.457v463.49c0 19.582-19.582 35.457-35.457 35.457h-84.426c-19.582 0-35.457-15.875-35.457-35.457z"
        fill={props.fill}
      />
    </g>
  </svg>
);

export default IconPause;
