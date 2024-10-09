import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Authuser from './Authuser';
import { Navigate } from "react-router";
import { toast } from 'react-toastify';

const Login = ({ showLoginModal, handleCloseLogin }) => {
  const { http, token, setToken } = Authuser();
  const [Login, SetLogin] = useState({ user_Email: '', user_Password: '' });
  const [btnDiseble, setDisebale] = useState(0);
  const [buttonResult, setButtonResult] = useState(""); // State for button click result
  const [error, setError] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    SetLogin({
      ...Login,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors
  
    try {
      const response = await http.post('http://localhost:5000/userAPI/login', Login, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check for success status codes
      if (response.status === 200 || response.status === 201) {
         alert('Logged in successfully'); // Change message to 'Logged in' instead of 'Registered'
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Login failed. Please try again.');
      }
      console.error('Error:', err);
    }
  };
  
  // Define the handleButtonClick function
  const handleButtonClick = () => {
    setButtonResult('Button was clicked!');
  };

  return (
    <div>
      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Log in/Sign Up</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          <div className="container">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Phone Number, Email Address"
              name="user_Email"
              value={Login.user_Email}
              onChange={handleInputChange} 
            />
            <br />
            <br />
            <input
              className="form-control me-2"
              type="password"
              placeholder="Password"
              name="user_Password"
              value={Login.user_Password}
              onChange={handleInputChange}
            />
            <div className="container mt-2">
              <span className="psw">
                Forgot <a href="#">password?</a>
              </span>
              <br />
              <label>
                <input type="checkbox" name="remember" /> Remember me
              </label>
              <br />
            </div>
            <button
              type="submit"
              className="form-control mt-3 sty"
            >
              Login
            </button>
          </div>

          {/* Button Click Example */}
          <div className="container mt-4">
            <button className="btn btn-primary" onClick={handleButtonClick}>
              Click Me!
            </button>
            <p id="result"></p> {/* Display the button click result */}
          </div>
        </Modal.Body>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
