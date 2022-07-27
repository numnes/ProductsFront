import { Grid } from "@mui/material";
import { useLayoutSize } from "contexts/hooks/useLayoutSize";
import React from "react";

// import { Container } from './styles';

const PageContent: React.FC<{ children: React.ReactNode | null }> = ({
  children,
}) => {
  const { size } = useLayoutSize();

  return (
    <Grid
      style={{
        display: "grid",
        width: size === "large" ? "60%" : "100%",
        height: "100%",
        backgroundColor: "white",
        padding: size !== "small" ? "2rem 3rem 0px 3rem" : "2rem 1rem 0px 1rem",
        marginTop: "60px",
        gridTemplateRows: "1fr 8fr 1fr",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </Grid>
  );
};

export default PageContent;
