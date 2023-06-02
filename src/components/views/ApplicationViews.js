import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductForm } from "../products/ProductForm"; // Import the ProductForm component

export const ApplicationViews = () => {
  return (
    <>
      {/* Add a route for the ProductForm component */}
      <Routes>
        <Route path="/products" element={<ProductForm />} />
      </Routes>
    </>
  );
};
