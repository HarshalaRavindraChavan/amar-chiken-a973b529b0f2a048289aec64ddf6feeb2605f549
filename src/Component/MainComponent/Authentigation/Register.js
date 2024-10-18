import React, { useState } from 'react';
import { Modal, Form, Toast } from 'react-bootstrap';
import Authuser from './Authuser';
import './Register.css';

const Register = ({ showregisterModal, handleCloseregister }) => {
  const { http } = Authuser();

  const [formData, setFormData] = useState({
    user_Name: '',
    user_Email: '',
    user_phoneno: '',
    user_Password: '',
  });

  const [error, setError] = useState('');
  // const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/userAPI/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Registration failed');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Register data:', data);
      
        setError(''); // Clear any previous errors
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(err.message || 'Network error or server not reachable.');
      });
  };

  return (
    <Modal show={showregisterModal} onHide={handleCloseregister} dialogClassName="custom-modal-right">
       <button type="button" className="btn-close" onClick={handleCloseregister} style={{margin:'10px'}}></button>
      <Modal.Header className="d-flex justify-content-between align-items-center">
       
        <Modal.Title className="mx-auto" >Please Sign Up</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          <div className="container">
            {/* {error && <div className="alert alert-danger mt-2">{error}</div>}

            {showToast && (
              <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                <Toast.Body>OTP sent successfully!</Toast.Body>
              </Toast>
            )} */}

<div className="floating-label">
              <input
              style={{height:'10vh'}}
                type="text"
                name="user_Name"
               className="form-control "
                placeholder=""
                value={formData.user_Name}
                onChange={handleInputChange}
              />
              <label> Name</label>
              </div>

              <div className="floating-label">
              <input
               style={{height:'10vh'}}
                type="text"
                name="user_phoneno"
                className="form-control "
                placeholder=""
                value={formData.user_phoneno}
                onChange={handleInputChange}
              />
             <label>Phone Number</label>
             </div>

             <div className="floating-label">
              <input
               style={{height:'10vh'}}
                type="text"
                name="user_Email"
                className="form-control "
                placeholder=""
                value={formData.user_Email}
                onChange={handleInputChange}
              />
            <label>Email</label>
            </div>

            <div className="floating-label">
              <input
               style={{height:'10vh'}}
                type="text"
                name="user_Password"
               className="form-control "
                placeholder=""
                value={formData.user_Password}
                onChange={handleInputChange}
              />
             <label>Password</label>
             </div>

            <button type="submit" className="custom-register-btn mt-3">
              Register
            </button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default Register;
