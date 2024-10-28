import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import Register from "./Register";
import Authuser from "./Authuser";

const Login = ({ showLoginModal, handleCloseLogin }) => {
  const { http } = Authuser();
  const [loginData, setLoginData] = useState({ user_phoneno: "", user_Name: "", user_Email: "", user_Password: "" });
  const [otp, setOtp] = useState(""); // Store OTP as a single string
  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP status
  const [register, setRegister] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  // Handle input change for login form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit login form and send OTP
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Register Value: " + register);
    // check if register form is shown
    if(register) {
      http
      .post(process.env.REACT_APP_API_URL + "user/register", loginData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("login otp", res.data);
        if (res.status === 200) {
          alert("User Registered successfully!");
          setIsOtpSent(true); // Display OTP input field
         
          
        } 
      })
      .catch((error) => {
        console.error("Error", error);
        toast.error("An error occurred. Please try again.");
      });
    } else {
      http
      .post(process.env.REACT_APP_API_URL + "user/send-otp", loginData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("login otp", res.data);
        if (res.status === 200) {
          
          // alert("OTP sent successfully!");
          setIsOtpSent(true); // Display OTP input field
        } 
        // Below condition doesn't occur ever
        // else 
        // {
        //   toast.error("Invalid credentials");
        //   handleCloseLogin();
        //   setRegister(true); // Show registration modal if login fails
        // }
      })
      .catch((error) => {
        if(error.status === 400) {
          if(error.response.data.code === "NO_USER") {
            toast.error("Invalid credentials");
            // handleCloseLogin();
            setRegister(true); // Show registration modal if login fails
          }
        }
        console.error("Error", error);
        toast.error("An error occurred. Please try again.");
      });
    }
  };

  // Verify OTP
  const verifyOtp = (e) => {
    e.preventDefault();

    if (otp.length < 4) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    const data = {
      user_phoneno: loginData.user_phoneno,
      otp: otp,
    };

    http
      .post(process.env.REACT_APP_API_URL + "user/verify-otp", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("OTP verification response", res.data);
        if (res.status === 200) {
          // alert("OTP verified successfully!");
          navigate("/dash"); // Navigate to dashboard
          // Assuming res.data includes user info
 
  navigate("/dash"); // Navigate to dashboard
        } else {
          toast.error(res.data.message || "OTP verification failed");
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleCloseRegister = () => setShowRegisterModal(false);

  return (
    <Modal
      show={showLoginModal}
      onHide={handleCloseLogin}
      dialogClassName="custom-modal-right"
      centered
    >
      {/* Close Button */}
      <button
        type="button"
        className="btn-close"
        onClick={handleCloseLogin}
        style={{ marginLeft: "30px" }}
      ></button>

      {/* Header */}
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      {/* Form */}
      <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          {/* Register Link */}
          <div className="mt-3 text-center">
            <span className="text-muted">or </span>
            <span
              onClick={() => {
                handleCloseLogin();
                setShowRegisterModal(true);
              }}
              className="text-red create-account-link"
            >
              Create an account
            </span>
          </div>

          {/* Phone Number Input */}
          <div className="container mt-3">
          {/* <label>Phone Number</label> */}
            <div className="floating-label">
              
              <input
                className="form-control"
                // type="text"
                placeholder="Enter Your Mobile Number"
                name="user_phoneno"
                value={loginData.user_phoneno}
                onChange={handleInputChange}
                style={{ height: "7vh" }}
                required
              />
              
            </div>
          </div>

          {/* Conditional Fields for Register */}
          {register && (
            <div className="container mt-3">
              <Form.Group className="form-group">
                <Form.Control
                  type="text"
                  name="user_Name"
                  placeholder="Name"
                  value={loginData.user_Name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group mt-2">
                <Form.Control
                  type="email"
                  name="user_Email"
                  placeholder="Email"
                  value={loginData.user_Email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group mt-2">
                <Form.Control
                  type="password"
                  name="user_Password"
                  placeholder="Password"
                  value={loginData.user_Password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className="custom-register-btn mt-3">
                Continue
              </Button>
            </div>
          )}

          {/* Conditional Fields for OTP Verification */}
          {!register && (
            <>
              {isOtpSent ? (
                <div className="mt-3 text-center">
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ height: "7vh" }}
                    required
                  />
                  <Button
                    type="button"
                    className="btn btn-danger mt-3 verify-otp-btn"
                    onClick={verifyOtp}
                  >
                    Verify OTP
                  </Button>
                </div>
              ) : (
                <div className="container mt-3">
                  <Button
                    type="submit"
                    className="custom-login-btn"
                    // className="form-control"
                    onClick={() => setIsOtpSent(true)}
                  >
                    Continue
                  </Button>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default Login;
