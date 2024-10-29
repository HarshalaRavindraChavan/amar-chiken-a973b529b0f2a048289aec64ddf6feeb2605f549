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
    <div>
      {/* Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={handleCloseLogin}
        dialogClassName="custom-modal-right"
        centered
      >
         <button
        type="button"
        className="btn-close"
        onClick={handleCloseLogin}
        style={{ marginLeft: '30px' }}
      ></button>
         {/* <Button variant="close" onClick={} ></Button> */}
         <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title className="mx-auto">Login</Modal.Title>
      </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            {/* Register Link */}
            <div className="mt-3">
              <span className="text-black">or </span>
              <span
                onClick={() => {
                  handleCloseLogin();
                  setShowRegisterModal(true);
                }}
                className="text-red"
                style={{ cursor: "pointer" }}
              >
                Create an account
              </span>
            </div>

            {/* Phone Number Input */}
            <div className="container">
            {/* <div className="floating-label"> */}
              <input
              style={{ height: '7vh' }}
                className="form-control"
                type="text"
                placeholder="Phone Number"
                name="user_phoneno"
                value={loginData.user_phoneno}
                onChange={handleInputChange}
              />
                {/* <label>Phone Number</label> */}
              </div>
            
            {/* </div> */}

            {register && (
              <div className="container mt-3">
                <div className="form-group">
                  <input
                    type="text"
                    name="user_Name"
                    className="form-control"
                    placeholder="Name"
                    value={loginData.user_Name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="user_Email"
                    className="form-control"
                    placeholder="Email"
                    value={loginData.user_Email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="user_Password"
                    className="form-control"
                    placeholder="Password"
                    value={loginData.user_Password}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="custom-register-btn mt-3">
                  Continue
                </button>
              </div>
            )}

            {/* Login Button */}
            {!register && (
              <>
                {isOtpSent ? (
                  // OTP Input Section
                  <div className="mt-3">
                    <input
                      className="form-control otp-input"
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength="6"
                    />
                    <button
                      type="button"
                      className="btn btn-danger mt-3"
                      onClick={verifyOtp}
                    >
                      Verify OTP
                    </button>
                  </div>
                ) : (
                  // Login Button Section
                  <div className="container mt-2">
                    <button type="submit" className="custom-login-btn mt-3">
                      Continue
                    </button>
                  </div>
                )}
              </>
            )}
          </Modal.Body>
        </Form>
      </Modal>

      {/* Registration Modal */}
      <Register
        showregisterModal={showRegisterModal}
        handleCloseregister={handleCloseRegister}
      />
    </div>
  );
};

export default Login;