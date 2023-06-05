import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './EmployeeForm.css';
import { EmployeeList } from './EmployeeList';

export const EmployeeForm = () => {
    const navigate = useNavigate();
    const [employeeName, setEmployeeName] = useState('');
    const [employeeLocation, setEmployeeLocation] = useState('');
    const [payRate, setPayRate] = useState('');
    const [employeeLocations, setEmployeeLocations] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newEmployee, setNewEmployee] = useState(null); // Track the new Employee
    const [startDate, setStartDate] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');

    useEffect(() => {
        fetch('http://localhost:8088/locations')
            .then((response) => response.json())
            .then((data) => {
                setEmployeeLocations(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleEmployeeNameChange = (event) => {
        setEmployeeName(event.target.value);
    };

    const handleEmployeeLocationChange = (event) => {
        setEmployeeLocation(event.target.value);
    };

    const handlePayRateChange = (event) => {
        setPayRate(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEmployeeEmailChange = (event) => {
        setEmployeeEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        const newUserData = {
            fullName: employeeName,
            isStaff: true,
            email: employeeEmail
        };

        fetch('http://localhost:8088/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserData),
        })
            .then((response) => response.json())
            .then((user) => {
                const newEmployee = {
                    userId: user.id,
                    locationId: parseInt(employeeLocation),
                    payRate: parseFloat(payRate),
                    startDate: startDate
                };

                fetch('http://localhost:8088/employees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEmployee),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setIsSubmitting(false);
                        setNewEmployee(data);
                        navigate('/employees');
                    })
                    .catch((error) => {
                        setIsSubmitting(false);
                        console.error(error);
                    });
            })
            .catch((error) => {
                setIsSubmitting(false);
                console.error(error);
            });
    };


    return (
        <div className="employee-form">
            <h2>Add New Employee</h2>
            <Link to="/" className="close-link">X</Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="employeeName">Employee Name:</label>
                    <input
                        type="text"
                        id="employeeName"
                        className="employee-form-input"
                        value={employeeName}
                        onChange={handleEmployeeNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="employeeEmail">Employee Email:</label>
                    <input
                        type="email"
                        id="employeeEmail"
                        className="employee-form-input"
                        value={employeeEmail}
                        onChange={handleEmployeeEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        className="employee-form-input"
                        value={startDate}
                        onChange={handleStartDateChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="employeeLocation">Employee Location:</label>
                    <select
                        id="employeeLocation"
                        className="employee-form-select"
                        value={employeeLocation}
                        onChange={handleEmployeeLocationChange}
                        required
                    >
                        <option value="">Select Employee Location</option>
                        {employeeLocations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="payRate">Pay Rate:</label>
                    <input
                        type="number"
                        id="payRate"
                        className="employee-form-input"
                        value={payRate}
                        onChange={handlePayRateChange}
                        step="0.00"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="employee-form-button"
                >
                    Add Employee
                </button>
            </form>
            <EmployeeList newEmployee={newEmployee} />
        </div>
    );
};