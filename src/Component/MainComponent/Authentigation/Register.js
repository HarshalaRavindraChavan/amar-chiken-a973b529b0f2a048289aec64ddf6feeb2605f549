import React, { useState } from 'react';
import { Modal, Form, Toast } from 'react-bootstrap';
import Authuser from './Authuser';
import './Register.css';

const Register = ({ showregisterModal, handleCloseregister }) => {
  const { http } = Authuser();

  const initialFormData = {
    user_Name: '',
    user_Email: '',
    user_phoneno: '',
    user_Password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  // Function to send OTP
  const sendOtp = async () => {
    try {
      const response = await http.post(
        'http://localhost:5000/userAPI/send-otp',
        JSON.stringify(formData), // Send only registration data
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        alert('OTP sent successfully. Please verify.');
        console.log(error);
        
        setShowToast(true);
        setIsOtpVisible(true);
      }
    } catch (err) {
      setError(
        err.response
          ? `Error: ${err.response.status} - ${err.response.data.message}`
          : 'Network error. Please check your connection.'
      );
    }
  };

  // Handle form submission to send OTP
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    sendOtp();
  };

  // Function to verify OTP separately
  const verifyOtp = async () => {
    try {
      const response = await http.post(
        'http://localhost:5000/userAPI/verify-otp',
        JSON.stringify({ otp, user_Email: formData.user_Email }), // Send OTP and email for verification
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        alert('OTP verified successfully!');
        handleCloseregister();
      }
    } catch (err) {
      setError(
        err.response
          ? `Error: ${err.response.status} - ${err.response.data.message}`
          : 'Verification failed. Please try again.'
      );
    }
  };

  return (
    <Modal show={showregisterModal} onHide={handleCloseregister} dialogClassName="custom-modal-right">
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <button type="button" className="btn-close" onClick={handleCloseregister}></button>
        <Modal.Title className="mx-auto">Please Sign Up</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          <div className="container">
            {error && <div className="alert alert-danger">{error}</div>}
            {showToast && (
              <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                <Toast.Body>OTP sent successfully!</Toast.Body>
              </Toast>
            )}

            <div className="form-group">
              <input
                type="text"
                name="user_Name"
                className="form-control"
                placeholder="Name"
                value={formData.user_Name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="user_phoneno"
                className="form-control"
                placeholder="Phone Number"
                value={formData.user_phoneno}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="user_Email"
                className="form-control"
                placeholder="Email"
                value={formData.user_Email}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="custom-register-btn mt-3">
              Register
            </button>

            {isOtpVisible && (
              <div className="mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                />
                <button className="btn btn-primary mt-2" onClick={verifyOtp}>
                  Verify OTP
                </button>
              </div>
            )}
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default Register;
