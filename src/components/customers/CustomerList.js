// In the CustomerList.js file, import the necessary dependencies and define the CustomerList component.
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CustomerList.css'

// Inside the CustomerList component, define the state variables for storing the list of customers and the selected customer.
export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Use the useEffect hook to fetch the list of customers from the API when the component mounts.
    useEffect(() => {
        fetch('http://localhost:8088/customers?_expand=user')
          .then((response) => response.json())
          .then((data) => {
            const formattedData = data.map((customer) => {
              return {
                ...customer,
                user: {
                    ...customer.user,
                    fullName: customer.user.fullName,
                    email: customer.user.email,
                }
            };
        });
            setCustomers(formattedData);
          })
          .catch((error) => console.error(error));
      }, []);
    

    // Define a function to handle the click event when a customer's name is clicked. This function should update the selected customer state.
    const handleCustomerClick = (customer) => {
        alert(
            `Customer Details\nName: ${customer.user.fullName}\nEmail: ${customer.user.email}\nLoyalty Number: ${customer.loyaltyNumber}`
        );
    };

    // Render the list of customers using the map method, displaying the customer name and email. 
    // Wrap the customer name in a Link component to enable navigation to the detail view.
    // Conditionally render the detail view if a customer is selected, displaying the customer's name, email, and loyalty number.

    return (
        <div className="customer-list">
            <h2>All Customers</h2>
            <div className="close-container"><Link to="/" className="close-link">X</Link>
            </div>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        <Link to="#" onClick={() => handleCustomerClick(customer)}>
                            {customer.user.fullName}
                        </Link>
                        <br />
                        Email: {customer.user.email}
                    </li>
                ))}
            </ul>

            {selectedCustomer && (
                <div>
                    <h3>Customer Details:</h3>
                    <p>Name: {selectedCustomer.user.fullName}</p>
                    <p>Email: {selectedCustomer.user.email}</p>
                    <p>Loyalty Number: {selectedCustomer.loyaltyNumber}</p>
                </div>
            )}
        </div>
    );
};

// Export the CustomerList component at the end of the file.
export default CustomerList;