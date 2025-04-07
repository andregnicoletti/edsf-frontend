import React from "react";

import { Icon } from "@cpqd-quati/react";
import { Spacing4 } from "@cpqd-quati/tokens";

import { InputRightIconProps } from "./InputRightIcon.types";

// import { Container } from './styles';

export const InputRightIcon: React.FC<InputRightIconProps> = (props) => {
  return (
    <Icon
      sx={{ marginRight: Spacing4 }}
      iconName={props.iconName}
      size="sm"
      color="var(--primary-800)"
    />
  );
};
