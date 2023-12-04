import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function View(){
  const { id } = useParams();

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

  useEffect(()=>{
      getEmployee(id)
  }, [id])
  const tableStyle = {
    borderCollapse: 'collapse',
    margin: '10em auto 0',
    width: '60%'
  };
  const thStyle = {
    border: '2px solid #ddd',
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#f2f2f3',
  };

  const tdStyle = {
    border: '2px solid #ddd',
    padding: '8px',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '100%'
  };
  const backgroundColor = {

    width: '100%',
    height: '100%'
  }

  return (
    <div style={backgroundColor}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{newEmployee.first_name}</td>
            <td style={tdStyle}>{newEmployee.last_name}</td>
            <td style={tdStyle}>{newEmployee.email}</td>
            <td style={tdStyle}>{newEmployee.salary}</td>
          </tr>
        </tbody>
        <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={buttonStyle}>Go Back</button>
      </Link>
      </table>
      
    </div>
  );
}

export default View;