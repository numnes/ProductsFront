import Header from "components/header";
import PageWrapper from "components/pageWrapper";
import React from "react";

const Landing: React.FC = () => {
  return (
    <PageWrapper style={{ backgroundColor: "var(--background-color)" }}>
      <Header />
    </PageWrapper>
  );
};

export default Landing;
