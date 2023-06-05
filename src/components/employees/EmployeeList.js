import React, { useEffect, useState } from 'react';

export const EmployeeList = ({ newEmployee }) => {
    const [employees, setEmployees] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (newEmployee) {
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        }
    }, [newEmployee]); // Add another useEffect to update the Employees when newEmployee changes

    useEffect(() => {
        fetch('http://localhost:8088/employees?_expand=user&_expand=location')
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8088/locations')
            .then((response) => response.json())
            .then((data) => {
                setLocations(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const getLocationName = (locationId) => {
        const location = locations.find((location) => location.id === locationId);
        return location ? location.name : 'N/A';
    };

    return (
        <div>
            <h2>All Employees</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        <b>Name:</b> {employee.user.fullName}
                        <br />
                        <b>Location:</b> {getLocationName(employee.locationId)}
                        <br />
                        <b>Start Date:</b> {employee.startDate}
                        <br />
                        <b>Pay Rate:</b> ${employee.payRate.toFixed(2)} per hour
                    </li>
                ))}
            </ul>
        </div>
    );
};