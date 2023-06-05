import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductForm } from "../products/ProductForm"; // Import the ProductForm component
import { SearchForm } from '../search/SearchForm';
import { EmployeeForm } from '../employees/EmployeeForm';
import { CustomerList } from '../customers/CustomerList';

export const ApplicationViews = () => {
  return (
    <>
      {/* Add a route for the ProductForm component */}
      <Routes>
        <Route path="/products" element={<ProductForm />} />
        <Route path="/search" element={<SearchForm />} />
        <Route path="/employees" element={<EmployeeForm />} />
        <Route path="/customers" element={<CustomerList />} />
      </Routes>
    </>
  );
};
