import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ProductForm.css'
import { ProductList } from './ProductList';

export const ProductForm = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [price, setPrice] = useState('');
  const [productTypes, setProductTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProduct, setNewProduct] = useState(null); // Track the new product


  useEffect(() => {
    fetch('http://localhost:8088/productTypes')
      .then((response) => response.json())
      .then((data) => {
        setProductTypes(data);
      })
      .catch((error) => console.error(error));
  }, [newProduct]);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const newProduct = {
      name: productName,
      typeId: parseInt(productType),
      price: parseFloat(price),
    };

    fetch('http://localhost:8088/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSubmitting(false);
        setNewProduct(data); // Set the new product received from the server
        navigate('/products'); // Navigate to the listing of all products
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error(error);
      });
  };

  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      <Link to="/" className="close-link">X</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            className="product-form-input" // Apply the class name to the input field
            value={productName}
            onChange={handleProductNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productType">Product Type:</label>
          <select
            id="productType"
            className="product-form-select" // Apply the class name to the select dropdown
            value={productType}
            onChange={handleProductTypeChange}
            required
          >
            <option value="">Select Product Type</option>
            {productTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            className="product-form-input" // Apply the class name to the input field
            value={price}
            onChange={handlePriceChange}
            step="0.01"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="product-form-button" // Apply the class name to the button
        >
          Add Product
        </button>
      </form>
      <ProductList newProduct={newProduct} />
    </div>
  );
};
