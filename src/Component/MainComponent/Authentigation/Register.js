import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Authuser from './Authuser';

const Register = ({ showregisterModal, handleCloseregister }) => {
  const { http } = Authuser();

  // State to hold form data
  const [formData, setFormData] = useState({
    user_Name: '',
    user_Email: '',
    user_location: '',
    user_Password: '',
    user_phoneno: '',
    user_pincode: ''
  });

  // State for error messages
  const [error, setError] = useState(null);

  // Centralized action handlers for input changes and form submission

  // 1. Action: Handling Input Change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 2. Action: Handle Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    // Action: Posting the form data to the backend
    submitRegistrationData(formData);
  };

  // 3. Action: Submit Data to Backend
  const submitRegistrationData = (data) => {
    http.post('http://localhost:5000/userAPI/register',data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(error);
          
          throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .then((responseData) => {
        console.log(responseData);
        alert('Registered successfully');
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status other than 200
          setError(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
          // Request was made but no response received
          setError('Network error. Please check your connection.');
        } else {
          // Something else happened
          console.log(error);
          
          setError('Registration failed. Please try again.');
        }
        console.error('Error:', error);
      });
  };
  

  // Render the component UI
  return (
    <Modal show={showregisterModal} onHide={handleCloseregister}>
      <Modal.Header closeButton>
        <Modal.Title>Please Sign Up</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e)=>handleFormSubmit(e)} action="#">
        <Modal.Body>
          <div className="container">
            {/* Action: Display Error Messages */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Input Fields with Centralized onChange Handler */}
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="user_Name"
                placeholder="Name"
                onChange={(e)=>handleInputChange(e)}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="user_pincode"
                placeholder="Pin code"
                onChange={(e)=>handleInputChange(e)}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="user_location"
                placeholder="Location"
                onChange={(e)=>handleInputChange(e)}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="user_Email"
                placeholder="Email"
                onChange={(e)=>handleInputChange(e)}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="user_Password"
                placeholder="Password"
                onChange={(e)=>handleInputChange(e)}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="user_phoneno"
                placeholder="Phone number"
                onChange={(e)=>handleInputChange(e)}
              />
              <br />
            </div>

            {/* Additional Information */}
            <div className="container mt-2">
              <span className="psw">
                Forgot <Link to="#">Forgot?</Link>
              </span>
              <br />
              <label>
                <input type="checkbox" name="remember" /> Remember me
              </label>
              <br />
            </div>

            {/* Action: Submit Button */}
            <button type="submit" className="btn btn-danger form-control">
              Register
            </button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default Register;