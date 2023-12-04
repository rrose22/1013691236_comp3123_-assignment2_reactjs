import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Employee, {getEmployees, handleInputChange} from './Employee';

function Add(){
  const [data, setData] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    salary: 0,
  });

  const getEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/v1/emp/employees');
      const dataRes = await response.json();
      setData(dataRes);
      console.log({ data });
    } catch (e) {
      console.log(e);
    }
  };

  const  handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleAddEmployee = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/v1/emp/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });
      if (response.ok) {
        // Fetch updated employee list after successful addition
        getEmployees();
        // Clear the newEmployee state for the next entry
        setNewEmployee({
          first_name: '',
          last_name: '',
          email: '',
          salary: 0,
        });
      } else {
        console.error('Failed to add employee');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const containerStyle = {
    textAlign: 'center',
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    marginTop: '50px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const labelStyle = {
    marginBottom: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const cancelButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <div>
        <h2>Add Employee</h2>
        <form style={formStyle}>
          <label style={labelStyle}>
            First Name:
            <input
              type="text"
              name="first_name"
              value={newEmployee.first_name}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={newEmployee.last_name}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Email:
            <input
              type="text"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Salary:
            <input
              type="text"
              name="salary"
              value={newEmployee.salary}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <button type="button" onClick={handleAddEmployee} style={buttonStyle}>
            Add Employee
          </button>
          <Link to="/" style={cancelButtonStyle}>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Add;