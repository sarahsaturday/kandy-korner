import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const [showLocations, setShowLocations] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showTopPriced, setShowTopPriced] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  const [data, setData] = useState({
    locations: [],
    products: [],
    productTypes: [],
  });

  useEffect(() => {
    // Fetch locations data
    fetch('http://localhost:8088/locations')
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => ({
          ...prevData,
          locations: data,
        }));
      })
      .catch((error) => console.error(error));

    // Fetch product types data
    fetch('http://localhost:8088/productTypes')
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => ({
          ...prevData,
          productTypes: data,
        }));
      })
      .catch((error) => console.error(error));

    // Fetch products data
    fetch('http://localhost:8088/products')
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => ({
          ...prevData,
          products: data,
        }));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Get user information from local storage
    const storedUser = localStorage.getItem("kandy_user");
    const user = JSON.parse(storedUser)
    const userIsStaff = user && user.staff === true;
    setIsStaff(userIsStaff);

  }, []);

  const handleLocationsClick = () => {
    setShowLocations(!showLocations);
  };

  const handleProductsClick = () => {
    setShowProducts(!showProducts);
  };

  const handleTopPricedClick = () => {
    setShowTopPriced(!showTopPriced);
  };

  const { locations, products } = data;

  return (
    <ul className="navbar">
      <li className="navbar__item navbar__locations">
        <button className="navbar__link" onClick={handleLocationsClick}>
          Locations
        </button>
        {showLocations && (
          <ul className="navbar__locations-list">
            {/* Iterate over the list of locations and display the address and square footage */}
            {locations.map((location) => (
              <li key={location.id}>
                <p>
                  <b>Store Name:</b> {location.name}
                </p>
                <p>
                  <b>Address:</b> {location.address}
                </p>
                <p>
                  <b>Square Footage:</b> {location.squareFootage} sq ft
                </p>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li className="navbar__item navbar__products">
        <button className="navbar__link" onClick={handleProductsClick}>
          Products
        </button>
        {showProducts && (
          <ul className="navbar__products-list">
            {products.map((product) => (
              <li key={product.id}>
                <p>
                  <b>Product Name:</b> {product.name}
                </p>
                <p>
                  <b>Price:</b> {product.price}
                </p>
                <p>
                  <b>Product Type:</b> {product.type ? product.type : 'N/A'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li className="navbar__item navbar__top-priced">
        <button className="navbar__link" onClick={handleTopPricedClick}>
          Top Priced
        </button>
        {showTopPriced && (
          <ul className="navbar__products-list">
            {products.map((product) => (
              <li key={product.id}>
                <p>
                  <b>Product Name:</b> {product.name}
                </p>
                <p>
                  <b>Price:</b> {product.price}
                </p>
                <p>
                  <b>Product Type:</b> {product.type ? product.type : 'N/A'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </li>
      {isStaff && (
        <li className="navbar__item navbar__add-product">
          <Link className="navbar__link" to="/products">
            Add Product
          </Link>
        </li>
      )}
      <li className="navbar__item navbar__logout">
        <Link
          className="navbar__link"
          to=""
          onClick={() => {
            localStorage.removeItem('kandy_user');
            navigate('/', { replace: true });
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};
