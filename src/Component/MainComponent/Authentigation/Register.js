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

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      // Await the API response
      const response = await http.post('http://localhost:5000/userAPI/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Registered successfully');
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        // If the error is due to the backend (non-2xx response)
        setError(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        // If the request was made but no response received
        setError('Network error. Please check your connection.');
      } else {
        // For any other error
        setError('Registration failed. Please try again.');
      }
      console.error('Error:', err);
    }
  };

  // Render the component UI
  return (
    <Modal show={showregisterModal} onHide={handleCloseregister}>
      <Modal.Header closeButton>
        <Modal.Title>Please Sign Up</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          <div className="container">
            {/* Display error messages */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Input Fields */}
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="user_Name"
                placeholder="Name"
                value={formData.user_Name}
                onChange={handleInputChange}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="user_pincode"
                placeholder="Pin code"
                value={formData.user_pincode}
                onChange={handleInputChange}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="user_location"
                placeholder="Location"
                value={formData.user_location}
                onChange={handleInputChange}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="user_Email"
                placeholder="Email"
                value={formData.user_Email}
                onChange={handleInputChange}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="user_Password"
                placeholder="Password"
                value={formData.user_Password}
                onChange={handleInputChange}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="user_phoneno"
                placeholder="Phone number"
                value={formData.user_phoneno}
                onChange={handleInputChange}
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

            {/* Submit Button */}
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
