import React from "react";

type Props = {
  name: string;
  color?: string;
  className?: string;
};

const Icon = ({ name, color, ...props }: Props) => {
  const iconName = `#icon-${name}`;
  return (
    <svg aria-hidden="true" {...props}>
      <use href={iconName} fill={color} />
    </svg>
  );
};

export default Icon;
