import React from "react";

export enum HeartIconState {
  Default,
  Hover,
}

export enum HeartIconFillState {
  Empty,
  Filled,
}

interface HeartIconProps {
  state: HeartIconState;
  fillState: HeartIconFillState;
}

const HeartIcon: React.FC<HeartIconProps> = ({ state, fillState }) => {
  return (
    <div>
      {state === HeartIconState.Hover ? (
        <img
          src="/images/heart-icon-hover.svg"
          alt="Tree Icon"
          width={24}
          height={24}
        />
      ) : fillState === HeartIconFillState.Filled ? (
        <img
          src="/images/heart-icon-filled.svg"
          alt="Tree Icon"
          width={24}
          height={24}
        />
      ) : (
        <img
          src="/images/heart-icon.svg"
          alt="Tree Icon"
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default HeartIcon;
