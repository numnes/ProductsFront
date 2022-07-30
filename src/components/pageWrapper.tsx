import React from "react";
import { styled } from "@mui/system";

const StyledWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: "0 0 auto",
  height: "100%",
  width: "100%",
  minWidth: "100%",
  justifyContent: "center",
  alignItems: "center",
});

const PageWrapper: React.FC<{ children: React.ReactNode; style?: any }> = ({
  children,
  ...rest
}) => {
  return <StyledWrapper {...rest}>{children}</StyledWrapper>;
};

export default PageWrapper;
