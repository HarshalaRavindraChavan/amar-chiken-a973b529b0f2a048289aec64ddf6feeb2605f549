// import React from 'react'

import React, { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import Authuser from './Authuser';
import { Navigate } from "react-router";
// import { toast } from 'react-toastify';
import { toast } from 'react-toastify';

const Login = ({showLoginModal, handleCloseLogin}) => {

    const { http, token, setToken } = Authuser();

    const [Login, SetLogin] = useState({user_Email: '',user_password: '' });
    const [btnDiseble, setDisebale] = useState(0);
  
    const notify = () => toast("Notification message!");
  
  
  // Then use it
  toast('Your notification message');
  
    const OninputChange = (e) => {
      SetLogin({ ...Login, [e.target.name]: e.target.value });
    }
    const onSubmits=(e) => {
      e.preventDefault();
     
    
        http.post("http://localhost:5000/userAPI/login", Login)
          .then((res) => {
            console.log(res.data.user_data);
            if (res.data.token) {
              setToken(res.data.user_data, res.data.token);
              
              Navigate("/dash");
            } else {
              notify (res.data.message);
              console.log("login",Login);
              
            }
            setDisebale(0);
          })
          .catch((error) => {
            // notify("The provided credentials are invalid");
            setDisebale(0);
          });
    };
  
  return (
    <div>
         {/* Login Modal */}
         <Modal show={showLoginModal} onHide={handleCloseLogin}>
      <Modal.Header closeButton>
        <Modal.Title>Log in/Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div >
          <div className="container">
          <input
  className="form-control me-2"
  type="text"
  placeholder="Phone Number, Email Address"
// Ensure this is correctly connected to the state
  name="user_Email"
  onChange={(e) => OninputChange(e)}// Updates state as the user types
  
/>

            <br />
            <br/>
            <input
              className="form-control me-2"
              type="password"
              placeholder="Password"
              name="user_password"
              // value={userPassword}
              onChange={(e) => OninputChange(e)}
              // aria-label="Password"
             
          
            />
            <div className="container mt-2">
              <span className="psw">
                Forgot <a href="#">password?</a>
              </span>
              <br />
              <label>
                <input type="checkbox" name="remember" /> Remember me
              </label>
              <br />
            </div>
            <Button
              type="submit"
              className="form-control mt-3 sty"
              onClick={(e) => onSubmits(e)}
            >
              Login
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>

    </div>
  )
}

export default Login