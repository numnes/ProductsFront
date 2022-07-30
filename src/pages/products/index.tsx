import Header from "components/header";
import PageWrapper from "components/pageWrapper";
import React from "react";
import { Outlet } from "react-router-dom";

const Products: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <Outlet />
    </PageWrapper>
  );
};

export default Products;
