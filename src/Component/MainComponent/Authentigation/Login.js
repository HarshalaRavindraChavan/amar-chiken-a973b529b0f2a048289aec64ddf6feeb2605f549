import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Authuser from "./Authuser";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import Register from "./Register";

const Login = ({ showLoginModal, handleCloseLogin }) => {
  const { http, setToken } = Authuser();
  const [loginData, setLoginData] = useState({ user_phoneno: "" });
  const [otpValues, setOtpValues] = useState(["", "", "", ""]); // Initialize OTP array
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  // Function to handle input change for login form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    fetch('http://localhost:5000/userAPI/send-otp', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("login otp", data);
        if (data.success) {
          alert('OTP sent successfully!');
          setShowOtpModal(true); // Show OTP modal if login is successful
        } else {
          toast.error(data.message || 'Invalid credentials');
        }
      })
      .catch((error) => {
        console.log("Error", error);
        toast.error('An error occurred. Please try again.');
      });
  };

  const handleOtpChange = (index, value) => {
    let tempOtpValues = [...otpValues];
    tempOtpValues[index] = value;
    setOtpValues(tempOtpValues);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const otp = otpValues.join('');
    console.log("OTP entered:", otp);

    // Prepare data for OTP verification
    const data = {
      user_phoneno: loginData.user_phoneno,
      otp: otp
    };

    // Fetch the API for OTP verification
    http.post('http://localhost:5000/userAPI/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("OTP verification response", response);
        if (response.success) {
          alert('OTP verified successfully!');
          // Optionally, navigate to another page or update user context
          // navigate('/dashboard');
        } else {
          toast.error(response.message || 'OTP verification failed');
        }
      })
      .catch((error) => {
        console.log("Error verifying OTP", error);
        toast.error('An error occurred while verifying OTP. Please try again.');
      });

    // Close OTP modal after submission
    handleCloseOtpModal();
  };

  // Function to handle closing the OTP modal
  const handleCloseOtpModal = () => setShowOtpModal(false);

  // Function to handle registration modal closing
  const handleCloseRegister = () => setShowRegisterModal(false);

  return (
    <div>
      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLogin} dialogClassName="custom-modal-right">
        <Modal.Header className="d-flex align-items-center justify-content-between">
          <Modal.Title className="mx-auto">Login</Modal.Title>
          <Button variant="close" onClick={handleCloseLogin}></Button>
        </Modal.Header>

        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <div>
              <span className="text-black">or </span>
              <span 
                onClick={() => {
                  handleCloseLogin(); // Close the login modal
                  setShowRegisterModal(true); // Show the registration modal
                }} 
                className="text-red" 
                style={{ cursor: "pointer" }}
              >
                Create an account
              </span>
            </div>
            <br />
            <div className="container">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Phone Number"
                name="user_phoneno"
                value={loginData.user_phoneno}
                onChange={(e)=>handleInputChange(e)}
              />
              <br />
              <div className="container mt-2">
                <Button type="submit" className="custom-login-btn mt-3">Login</Button>
              </div>
            </div>
          </Modal.Body>
        </Form>
      </Modal>

      {/* OTP Modal */}
      <Modal show={showOtpModal} onHide={handleCloseOtpModal}>
        <Modal.Header closeButton>
          <Modal.Title>Verify OTP</Modal.Title>
        </Modal.Header>
        <Form onSubmit={verifyOtp}>
          <Modal.Body>
            <div className="d-flex justify-content-between">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  className="form-control"
                  type="text"
                  placeholder="Enter OTP"
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  maxLength="1"
                />
              ))}
            </div>
            <div className="mt-3">
              <Button type="submit" className="btn btn-primary">Verify OTP</Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>

      {/* Registration Modal */}
      <Register showregisterModal={showRegisterModal} handleCloseregister={handleCloseRegister} />
    </div>
  );
};

export default Login;
