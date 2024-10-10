import React, { useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Authuser from './Authuser';
import './Register.css';

const Register = ({ showregisterModal, handleCloseregister }) => {
  const { http } = Authuser();

  // Initial state for form data
  const initialFormData = {
    user_Name: '',
    user_Email: '',
    user_location: '',
    user_Password: '',
    user_phoneno: '',
    user_pincode: ''
  };

  // State to hold form data
  const [formData, setFormData] = useState(initialFormData);

  // State for error messages
  const [error, setError] = useState(null);
  // State for toast notifications
  const [showToast, setShowToast] = useState(false);
  // State for OTP verification
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otp, setOtp] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
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
        setShowToast(true); // Show success toast
        // After successful registration, show OTP input
        setIsOtpVisible(true);
        alert('Registered successfully. Please verify your mobile number.');

        // Clear the form data
        setFormData(initialFormData); // Reset form fields
        setOtp(''); // Reset OTP input
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Error:', err);
    }
  };

  // Handle OTP verification (dummy function)
  const handleOtpVerify = () => {
    if (otp) {
      alert('OTP verified successfully!');
      // Add logic to verify OTP here (API call, etc.)
    } else {
      setError('Please enter a valid OTP.');
    }
  };

  // Render the component UI
  return (
    <>
      <Modal
        show={showregisterModal}
        onHide={handleCloseregister}
        dialogClassName="custom-modal-right"
      >
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleCloseregister}
          ></button>

          <Modal.Title className="mx-auto">Please Sign Up</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <div className="container">
              {error && <div className="alert alert-danger">{error}</div>}
              {showToast && (
                <Toast
                  onClose={() => setShowToast(false)}
                  show={showToast}
                  delay={3000}
                  autohide
                >
                  <Toast.Body>Registered successfully!</Toast.Body>
                </Toast>
              )}

              {/* Input Fields */}
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
                  name="user_Email"
                  placeholder="Email"
                  value={formData.user_Email}
                  onChange={handleInputChange}
                />
                <br />
              </div>

              {/* <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="user_pincode"
                  placeholder="Pin code"
                  value={formData.user_pincode}
                  onChange={handleInputChange}
                />
                <br />
              </div> */}
              
              {/* <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="user_location"
                  placeholder="Location"
                  value={formData.user_location}
                  onChange={handleInputChange}
                />
                <br />
              </div> */}

              {/* Submit Button */}
              <button type="submit" className="custom-register-btn mt-3">
                Register
              </button>

              {/* OTP Verification */}
              {isOtpVisible && (
                <div className="mt-4">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={handleOtpVerify}
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default Register;
