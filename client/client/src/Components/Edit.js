import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    salary: 0,
  });

  const getEmployee = async (employeeId) => {
    try {
      const employeeExists = await fetch(`http://localhost:8081/api/v1/emp/employees/${employeeId}`);
      if (employeeExists.ok) {
        const employeeData = await employeeExists.json();
        setNewEmployee({
          first_name: employeeData.first_name,
          last_name: employeeData.last_name,
          email: employeeData.email,
          salary: employeeData.salary,
        });
      }
    } catch (e) {
      console.error('Error fetching employee:', e);
    }
  };

  const updateEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/v1/emp/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        console.log('Employee updated successfully');
        // Redirect to the home page after successful update
        navigate('/')
      } else {
        console.error('Error updating employee:', response.statusText);
      }
    } catch (e) {
      console.error('An unexpected error occurred:', e);
    }
  };

  useEffect(() => {
    getEmployee(id);
  }, [id]);
  const containerStyle = {
    textAlign: 'center',
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    marginTop: '50px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  };

  const labelStyle = {
    display: 'block',
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
      <h2>Edit Employee {id}</h2>
      <form>
        <label style={labelStyle}>
          First Name:
          <input
            type="text"
            name="first_name"
            value={newEmployee.first_name}
            onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={newEmployee.last_name}
            onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Email:
          <input
            type="text"
            name="email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Salary:
          <input
            type="text"
            name="salary"
            value={newEmployee.salary}
            onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
            style={inputStyle}
          />
        </label>
        <button type="button" onClick={updateEmployee} style={buttonStyle}>
          Save Changes
        </button>
        <Link to="/" style={cancelButtonStyle}>
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default Edit;
