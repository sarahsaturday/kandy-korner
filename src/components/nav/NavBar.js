import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate();
  const [showLocations, setShowLocations] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {

    fetch('http://localhost:8088/locations')
      .then(response => response.json())
      .then(data => {
        setLocations(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleLocationsClick = () => {
    setShowLocations(!showLocations);
  };

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__locations">
                <button className="navbar__link" onClick={handleLocationsClick}>
                    Locations
                </button>
                {showLocations && (
                    <ul className="navbar__locations-list">
                        {/* Iterate over the list of locations and display the address and square footage */}
                        {locations.map(location => (
                            <li key={location.id}>
                                <p><b>Store Name:</b> {location.name}</p>
                                <p><b>Address:</b> {location.address}</p>
                                <p><b>Square Footage:</b> {location.squareFootage} sq ft</p>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>
    )
}
