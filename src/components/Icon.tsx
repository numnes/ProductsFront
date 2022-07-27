import React from "react";
import * as Icons from "react-feather";

export type IconProps = JSX.IntrinsicElements["svg"] & {
  name: keyof typeof Icons;
  size?: number;
};

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const Component = Icons[name] || Icons.Info;

  return <Component {...props} />;
};
