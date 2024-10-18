import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Authuser from "./Authuser";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import Register from "./Register";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";

const Login = ({ showLoginModal, handleCloseLogin }) => {
  const { http, setToken } = Authuser();
  const [loginData, setLoginData] = useState({ user_phoneno: "" });
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP status
  const [register,setregister]=useState(false)
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

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Allow only one character per input
    const tempOtpValues = [...otpValues];
    tempOtpValues[index] = value;
    setOtpValues(tempOtpValues);
  };

  // Submit login form and send OTP
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);

    http
      .post("/send-otp", loginData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("login otp",res.data);
        if (res.status === 200) {
          alert("OTP sent successfully!");
          setIsOtpSent(true); // Display OTP input fields
        } else {
          toast.error(error || "Invalid credentials");
          handleCloseLogin();
          setregister(true); // Show registration modal if login fails
        }
      })
      .catch((error) => {
        console.error("Error", error);
        toast.error("An error occurred. Please try again.");
        // setregister(true); // Show registration modal if login fails
      });
  };

  // Verify OTP
  const verifyOtp = (e) => {
    e.preventDefault();
    // const otp = otpValues.join("");

    // if (otp.length < 4) {
    //   toast.error("Please enter the complete OTP.");
    //   return;
    // }

    const data = {
      user_phoneno: loginData.user_phoneno,
      // otp: otp,
    };

    http
      .post("/verify-otp", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("OTP verification response", res.data);
        if (res.status === 200) {
          alert("OTP verified successfully!");
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
      >
        <Modal.Header className="d-flex align-items-center justify-content-between">
          <Modal.Title className="mx-auto">Login</Modal.Title>
          <Button variant="close" onClick={handleCloseLogin}></Button>
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
              <input
                className="form-control"
                type="text"
                placeholder="Phone Number"
                name="user_phoneno"
                value={loginData.user_phoneno}
                onChange={handleInputChange}
              />
            </div>

           

{register &&(
  <div className="container mt-3">
  {/* {error && <div className="alert alert-danger mt-2">{error}</div>}

  {showToast && (
    <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
      <Toast.Body>OTP sent successfully!</Toast.Body>
    </Toast>
  )} */}

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

  {/* <div className="form-group">
    <input
      type="text"
      name="user_phoneno"
      className="form-control"
      placeholder="Phone Number"
      value={formData.user_phoneno}
      onChange={handleInputChange}
    />
  </div> */}

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
    continue
  </button>
</div>
)}

            

          {/* Login Button */}
{!register && (
  <>
    {isOtpSent ? (
      // OTP Inputs Section
      <div className="mt-3">
        <div className="d-flex justify-content-between">
          {/* {otpValues.map((value, index) => ( */}
            <input
              key={`otp`}
              className="form-control otp-input"
              type="text"
              // value={value}
              onChange={(e) => handleOtpChange( e.target.value)}
              maxLength="1"
            />
          {/* ))} */}
        </div>

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