import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ListProducts from "pages/products/ListProducts";
import Products from "pages/products";
import Login from "pages/Login";

const GlobalRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products />}>
          <Route path="" element={<ListProducts />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default GlobalRouter;
