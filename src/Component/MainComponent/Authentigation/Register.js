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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  const sendOtp = async () => {
    try {
      const response = await http.post(
        'http://localhost:5000/userAPI/send-otp',
        JSON.stringify(formData), // Ensure it's serialized
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.status === 201) {
        alert('OTP sent successfully. Please verify.');
        setShowToast(true);
        console.log(true);
        
        setIsOtpVisible(true);
        setFormData(initialFormData);
      }
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else {
        setError('Network error. Please check your connection.');
      }
    }
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    sendOtp();
  };

  const verifyOtp = async () => {
    try {
      const response = await http.post(
        'http://localhost:5000/userAPI/verify-otp',
        { otp },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        alert('OTP verified successfully!');
        handleCloseregister();
      }
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else {
        setError('Verification failed. Please try again.');
      }
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
                <Toast.Body>Registered successfully! OTP sent.</Toast.Body>
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

            <button type="submit" className="custom-register-btn mt-3">Register</button>

            {isOtpVisible && (
              <div className="mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                />
                <button className="btn btn-primary mt-2" onClick={verifyOtp}>Verify OTP</button>
              </div>
            )}
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default Register;
