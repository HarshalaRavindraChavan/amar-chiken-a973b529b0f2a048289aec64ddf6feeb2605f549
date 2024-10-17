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

  // Handle input change for login form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);

    http
      .post("/send-otp", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("login otp", res.data);
        if (res.data.success) {
          alert("OTP sent successfully!");
          setShowOtpModal(true); // Show OTP modal if OTP sent successfully
        } else {
          toast.error(res.data.message || "Invalid credentials");
          handleCloseLogin(); // Close login modal
          setShowRegisterModal(true); // Show registration modal
        }
      })
      .catch((error) => {
        console.error("Error", error);
        toast.error("An error occurred. Please try again.");
        handleCloseLogin(); // Close login modal
        setShowRegisterModal(true); // Show registration modal
      });
  };

  const handleOtpChange = (index, value) => {
    let tempOtpValues = [...otpValues];
    tempOtpValues[index] = value;
    setOtpValues(tempOtpValues);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const otp = otpValues.join("");
    console.log("OTP entered:", otp);

    const data = {
      user_phoneno: loginData.user_phoneno,
      otp: otp,
    };

    http
      .post("/verify-otp", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("OTP verification response", res.data);
        if (res.data.success) {
          alert("OTP verified successfully!");
          navigate("/dash"); // Navigate to dashboard
        } else {
          toast.error(res.data.message || "OTP verification failed");
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP", error);
        toast.error("An error occurred while verifying OTP. Please try again.");
      });

    handleCloseOtpModal(); // Close OTP modal after submission
  };

  const handleCloseOtpModal = () => setShowOtpModal(false);
  const handleCloseRegister = () => setShowRegisterModal(false);

  return (
    <div>
      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLogin} dialogClassName="custom-modal-right">
        <Modal.Header className="d-flex align-items-center justify-content-between">
          <Modal.Title className="mx-auto">Login</Modal.Title>
          <Button variant="close" onClick={handleCloseLogin}></Button>
        </Modal.Header>

        <Form onSubmit={(e)=>handleFormSubmit(e)}>
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
                <button type="submit" className="custom-login-btn mt-3">
                  Login
                </button>
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
              <button type="submit" className="btn btn-primary">
                Verify OTP
              </button>
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
