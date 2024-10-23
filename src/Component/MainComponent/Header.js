import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
// import Register from "./Authentigation/Register";

// import Login from "./Authentigation/Login";
import Authuser from "./Authentication/Authuser";
import Login from "./Authentication/Login";



const Header = () => {

  const { logout, token, http, user } = Authuser();
  const [showCityModal, setShowCityModal] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
 
  
  const handleCloseCity = () => setShowCityModal(false);
  const handleShowCity = () => setShowCityModal(true);
  
 

 
  
  // Function to close the register modal by setting state to false

  
  const handleShowLogin = () => {
    setShowLoginModal(true); 
    // alert("added") // Open the login modal
   // Close the account modal
  };
  
  // Function to close the login modal by setting state to false
  const handleCloseLogin = () => setShowLoginModal(false);
  


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            {/* Logo and Name */}
            <Link className="navbar-brand d-flex align-items-center" to="#">
              <img
                src="https://t3.ftcdn.net/jpg/06/55/69/72/360_F_655697217_GclwFgFfhS8Tw1V3dRbplhWKouXgQ9SL.jpg"
                alt="Logo"
                className="logo"
                style={{ alignItems: "center" }}
              />
              <span className="ms-2">Amir Chicken</span>
            </Link>

            {/* Search Bar */}
            <div className="mx-auto d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search For The Products You Love..."
                aria-label="Search"
                style={{
                  width: "400px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              />
             
            </div>
            
            {/* Product and My Account Buttons */}
            <div>
            <button
                className="btn btn-outline-danger me-2"
                // onClick={handleShowCity}
              >
                <i className="fa-solid fa-card" /> AddCard
              </button>
            </div>&nbsp;
            <div className="d-flex align-items-center">
              {/* City Button */}
             

              <button
                className="btn btn-outline-danger me-2"
                onClick={handleShowCity}
              >
                <i className="fa-solid fa-city" /> Location
              </button>

              {/* City Modal */}
              <Modal show={showCityModal} onHide={handleCloseCity}>
  <Modal.Header closeButton>
    {/* <div className="text-center w-100"> */}
      {/* <img
        src=""
        alt=""
        className="circular-image"
        style={{
          width: "90px", // Adjust size for mobile screens
          height: "90px",
          background: "#9A292F",
          borderRadius: "50%", // Ensures image stays circular
          objectFit: "cover", // Scales image while keeping aspect ratio
        }}
      /> */}
    {/* </div> */}
  </Modal.Header>

  <Modal.Title className="text-center mt-3">Amir chicken</Modal.Title>

  <Modal.Body>
    <p className="text-center">Choose Your location</p>
    <div className="d-flex justify-content-center">
      <input
        className="form-control"
        type="search"
        placeholder="Search your city or pincode..."
        aria-label="Search"
        style={{
          // width: "100%",
          // maxWidth: "400px",
          // borderRadius: "10px",
          textAlign: "center",
          width: "80%",
          height:"8vh", 
          maxWidth: "400px",
          borderRadius:"20px"
        }}
      />
    </div>
  </Modal.Body>

  <Modal.Footer>
    <div className="d-flex justify-content-center w-100">
      <Button
        style={{ backgroundColor: "#9A292F", width: "80%",height:"8vh", maxWidth: "400px",borderRadius:"20px" }}
        onClick={() => alert("Search performed!")}
      >
        Submit
      </Button>
    </div>
  </Modal.Footer>
</Modal>

              {/* Products Button */}
              <div className="d-flex align-items-center">
                {/* Product Button with Link */}
                <a href="/product" className="text-decoration-none">
                  <button className="btn btn-outline-danger me-2 d-flex align-items-center">
                    <i className="fa-solid fa-box me-1"></i> Products
                  </button>
                </a>

                {/* My Account Button with custom class */}
                {!token ? (
        // Sign In Button
        <button
          className="btn btn-outline-danger d-flex align-items-center custom-width"
          onClick={handleShowLogin}
        >
          <i className="fa-solid fa-user me-1"></i> Sign In
        </button>
      ) : (
        // Dropdown Trigger with User Name
        <div className="dropdown-trigger" onClick={toggleDropdown}>
          <i className="fa fa-user me-1"></i> {user?.name || 'User'}
        </div>
      )}

      {isOpen && token && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/swiggy-one">Amar chicken One</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      )}
              </div>

              {/* Account Modal */}
              {/* <Modal show={showAccountModal} onHide={handleCloseAccount}>
                <Modal.Header closeButton>
                  <Modal.Title>Log In/Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex justify-content-center">
                    <button
                      className="form-control sty"
                     
                      onClick={handleShowLogin}
                    >
                      Log in Existing Account
                    </button>
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                  <button
        className="form-control sty"
        onClick={handleShowRegister}  // <-- Updated this line
      >
        Create New Account
      </button>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button variant="secondary" onClick={handleCloseAccount}>Close</Button> */}
                {/* </Modal.Footer> */}
              {/* </Modal>  */}

             
             
            </div>
          </div>
        </nav>
        

<Login
        showLoginModal={showLoginModal} 
        handleCloseLogin={handleCloseLogin} 
      />
      </header>

    </div>
  );
};

export default Header;
