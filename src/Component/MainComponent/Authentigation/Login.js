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

  // Function to handle registration modal closing
  const handleCloseRegister = () => setShowRegisterModal(false);

  // Function to handle input change for login form
  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Function to handle OTP input change
  const handleOtpChange = (e) => setOtp(e.target.value);

  // Function to handle form submission for login
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error

    // Validate phone number input
    if (!loginData.user_phoneno) {
      toast.error("Please enter your phone number.");
      return;
    }

    http.post(
      "http://localhost:5000/userAPI/send-otp",
      { user_phoneno: loginData.user_phoneno }, // Send phone number as JSON
      { headers: { "Content-Type": "application/json" } }
    )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.exists) {
            toast.success("OTP sent successfully!");
            setShowOtpModal(true); // Show OTP modal
          } else {
            toast.info("Phone number not found, please register.");
            setShowRegisterModal(true); // Show registration modal
          }
        } else {
          throw new Error(`Unexpected status: ${response.status}`);
        }
      })
      .catch((err) => {
        console.error("Error checking phone number:", err);
        toast.error("Error processing request. Please try again.");
      });
  };

  // Function to handle OTP verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();

    http.post(
      "http://localhost:5000/userAPI/verify-otp",
      JSON.stringify({ user_phoneno: loginData.user_phoneno, otp }),
      { headers: { "Content-Type": "application/json" } }
    )
      .then((response) => {
        if (response.status === 200) {
          alert("OTP verified successfully!");
          setToken(response.data.token); // Set the authentication token
          navigate("/dash"); // Navigate to dashboard
          setShowOtpModal(false); // Close OTP modal
        } else {
          throw new Error(`Unexpected status: ${response.status}`);
        }
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        toast.error("Invalid OTP. Please try again.");
      });

  };

  // Function to handle closing the OTP modal
  const handleCloseOtpModal = () => setShowOtpModal(false);

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
                onChange={handleInputChange}
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
