import React, { useState } from 'react';
import { Modal, Form, Toast } from 'react-bootstrap';

import './Register.css';
import Authuser from './Authuser';

const Register = ({ showregisterModal, handleCloseregister }) => {
  const { http } = Authuser(); // Ensure http is properly initialized

  const [formData, setFormData] = useState({
    user_Name: '',
    user_Email: '',
    user_phoneno: '',
    user_Password: '',
  });

  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false); // Toast state

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await http.post(
            `${process.env.REACT_APP_API_URL}user/register`,
            formData,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        console.log('Register data:', response.data);
        alert("register successfully");



        
        setError(''); // Clear errors if any
        setShowToast(true); // Show success toast
    } catch (err) {
        console.error('Error:', err);
        // Check if response and data are present
        const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
        setError(errorMessage); // Set specific error message
    }
};


  return (
    <Modal
      show={showregisterModal}
      onHide={handleCloseregister}
      dialogClassName="custom-modal-right"
    >
      <button
        type="button"
        className="btn-close"
        onClick={handleCloseregister}
        style={{ margin: '10px' }}
      ></button>

      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title className="mx-auto">Please Sign Up</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          <div className="container">
            {error && <div className="alert alert-danger mt-2">{error}</div>}

            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
            >
              <Toast.Body>Registration Successful!</Toast.Body>
            </Toast>

            <div className="floating-label">
              <input
                style={{ height: '10vh' }}
                type="text"
                name="user_Name"
                className="form-control"
                value={formData.user_Name}
                onChange={handleInputChange}
                required
              />
              <label>Name</label>
            </div>

            <div className="floating-label">
              <input
                style={{ height: '10vh' }}
                type="text"
                name="user_phoneno"
                className="form-control"
                value={formData.user_phoneno}
                onChange={handleInputChange}
                required
              />
              <label>Phone Number</label>
            </div>

            <div className="floating-label">
              <input
                style={{ height: '10vh' }}
                type="text"
                name="user_Email"
                className="form-control"
                value={formData.user_Email}
                onChange={handleInputChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="floating-label">
              <input
                style={{ height: '10vh' }}
                type="text"
                name="user_Password"
                className="form-control"
                value={formData.user_Password}
                onChange={handleInputChange}
                required
              />
              <label>Password</label>
            </div>

            <button type="submit" className="custom-register-btn mt-3">
              Continue
            </button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default Register;
