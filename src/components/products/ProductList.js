import React, { useEffect, useState } from 'react';

export const ProductList = ({ newProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8088/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, [newProduct]); // Add newProduct as a dependency to listen for changes

  useEffect(() => {
    if (newProduct) {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }
  }, [newProduct]); // Add another useEffect to update the products when newProduct changes

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};