import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Edit from './Edit'
import View from './View';
function Employee() {
  const [data, setData] = useState(null);
  
  const [selectedEmp, setSelectedEmp] = useState(null)

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
      setData(dataRes);;
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/v1/emp/employees?eid=${employeeId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        getEmployees();
      } 
      else {
        console.error('Failed to delete employee');
      }
    }catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginRight: '5px',
  };

  const addButtonStyle = {
    backgroundColor: '#008CBA',
    color: 'white',
    padding: '12px 18px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block',
    margin: '20px 0',
  };const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px',
  };

  return (
    <div>
       <div style={navStyle}>
      <div>Employee Management App</div>
      <div>
        <Link to='/login'>
        <a style={linkStyle}>
          Login
        </a>
        </Link>
        <Link to='/signup'>
        <a style={linkStyle}>
          Signup
        </a>
        </Link>
      </div>
    </div>
      <div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Salary</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((employee, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{employee._id}</td>
                  <td style={tdStyle}>{employee.email}</td>
                  <td style={tdStyle}>{employee.first_name}</td>
                  <td style={tdStyle}>{employee.last_name}</td>
                  <td style={tdStyle}>{employee.salary}</td>
                  <td style={tdStyle}>
                    <Link to={`/edit/${employee._id}`}>
                      <button style={buttonStyle}>Update</button>
                    </Link>
                    <Link to={`/view/${employee._id}`}>
                      <button style={buttonStyle}>View</button>
                    </Link>
                    <button style={buttonStyle} onClick={() => handleDeleteEmployee(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Link to='/add'>
        <button style={addButtonStyle}>Add Employee</button>
      </Link>
    </div>
  );
}

export default Employee;
