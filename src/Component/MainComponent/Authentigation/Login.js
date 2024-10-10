import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Authuser from './Authuser';
import { Navigate, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import './Register.css';
import { Link } from "react-router-dom";
import Register from "./Register";

const Login = ({ showLoginModal, handleCloseLogin }) => {
  const { http, token, setToken } = Authuser();
  const [Login, SetLogin] = useState({  user_phoneno: '', user_Password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleCloseRegister = () => setShowRegisterModal(false);

  const handleShowRegister = () => {
    setShowRegisterModal(true);
    handleCloseLogin(); // Close the login modal
  };

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
        alert('Logged in successfully');
        navigate('/dash'); // Use navigate to go to the dashboard
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

  return (
    <div>
      {/* Login Modal */}
      <Modal
          show={showLoginModal}
          onHide={handleCloseLogin}
          dialogClassName="custom-modal-right"
      >
          <Modal.Header className="d-flex justify-content-between align-items-center">
              <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseLogin}
              ></button>

              {/* Modal title centered */}
              <Modal.Title className="mx-auto"></Modal.Title>
          </Modal.Header>
          
          <Form onSubmit={handleFormSubmit}>
              <Modal.Body>
              <div>
                  <span className="text-black">or </span>
                  <span onClick={handleShowRegister} className="text-red" style={{ cursor: "pointer" }}>Create an account</span>
              </div>
              <br />
              <div className="container">
                  <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Phone Number"
                      name="user_Email"
                      value={Login.user_phoneno}
                      onChange={handleInputChange}
                  />
                  <br />
                  {/* <input
                      className="form-control me-2"
                      type="password"
                      placeholder="Password"
                      name="user_Password"
                      value={Login.user_Password}
                      onChange={handleInputChange}
                  />
                  <br /> */}
                  {/* Custom styled button */}
                  <div className="container mt-2">
                      <button
                          type="submit"
                          className="custom-login-btn mt-3"
                      >
                          Login
                      </button>
                  </div>
              </div>

              {/* Optional additional button or content */}
              <div className="container mt-4">
                  <p id="result"></p> {/* Display the button click result */}
              </div>
              </Modal.Body>
          </Form>
      </Modal>
      <Register 
          showregisterModal={showRegisterModal} 
          handleCloseregister={handleCloseRegister} 
      />
    </div>
  );
};

export default Login;
