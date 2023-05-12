import React from "react";

type Props = {
  name: string;
  color?: string;
  className?: string;
  size?: number;
};

const Icon = ({ name, color, size = 24, ...props }: Props) => {
  const iconName = `#icon-${name}`;
  return (
    <svg className={["icon", props.className].join(" ")} aria-hidden="true" {...props} style={{ width: `${size}px`, height: `${size}px` }}>
      <use href={iconName} fill={color} />
    </svg>
  );
};

export default Icon;
