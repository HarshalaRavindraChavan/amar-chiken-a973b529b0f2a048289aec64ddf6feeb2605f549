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
  const [otp, setOtp] = useState(""); // Store OTP input
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCloseRegister = () => setShowRegisterModal(false);

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!loginData.user_phoneno) {
      toast.error("Please enter your phone number.");
      return;
    }
  
    try {
      const response = await http.post(
        "http://localhost:5000/userAPI/send-otp",
        { user_phoneno: loginData.user_phoneno }, // Send as a JSON object
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        if (response.data.exists) {
          toast.success("OTP sent successfully!");
          setShowOtpModal(true);
        } else {
          toast.info("Phone number not found, please register.");
          setShowRegisterModal(true);
        }
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error checking phone number:", err);
      toast.error("Error processing request. Please try again.");
    }
  };
  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post(
        "http://localhost:5001/userAPI/verify-otp", // Updated API
        JSON.stringify({ user_phoneno: loginData.user_phoneno, otp }),
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        alert("OTP verified successfully!");
        setToken(response.data.token);
        navigate("/dash"); // Navigate to dashboard
        setShowOtpModal(false);
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleCloseOtpModal = () => setShowOtpModal(false);

  return (
    <div>
      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLogin} dialogClassName="custom-modal-right">
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseLogin}></button>
          <Modal.Title className="mx-auto">Login</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <div>
              <span className="text-black">or </span>
              <span onClick={() => setShowRegisterModal(true)} className="text-red" style={{ cursor: "pointer" }}>
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
                onChange={handleInputChange}
              />
              <br />
              <div className="container mt-2">
                <button type="submit" className="custom-login-btn mt-3">Login</button>
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
        <Form onSubmit={handleOtpSubmit}>
          <Modal.Body>
            <input
              className="form-control"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
            />
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">Verify OTP</button>
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
