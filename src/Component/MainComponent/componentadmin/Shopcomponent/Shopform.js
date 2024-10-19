import React, { useState } from 'react';
import './Shopform.css';
import Authuser from '../../Authentigation/Authuser';

const Shopform = () => {
const [shopdata, setshopdata]=useState({shopName:'', shopLocation:'',address:'',pincode:'',mobileNumber:'',emailAddress:'',shopImage:''})
const [http]=Authuser()

const handleInputChange=(e)=>{
  setshopdata({ ...shopdata, [e.target.name]: e.target.value });
}

const handleFormSubmit = (e) => {
  e.preventDefault();

  http.post('http://localhost:5000/api/shops', {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((response) => {
      if (response.status===200) {
       alert("shop added");
      }
      return response.json();
    })
    .then((data) => {
      console.log('shop data:', data);
    
      
    })
    .catch((err) => {
      console.error('Error:', err);
      
    });
};

  return (
    <div className="container shopform-container">
      <h2 className="form-title">Shop Information</h2>
      {/* <form className="shopform"> */}
        <div className="shopform">
  <div className="row">
    <div className="form-group col-md-6 custom-input">
      <input
        className="form-control triangle-input"
        type="text"
        placeholder="Shop Name"
      />
    </div>
    <div className="form-group col-md-6 custom-input">
      <input
        className="form-control triangle-input"
        type="text"
        placeholder="Shop Location"
      />
    </div>
    <div className="form-group col-md-6 custom-input">
      <input
        className="form-control triangle-input"
        type="text"
        placeholder="Address"
      />
    </div>
    <div className="form-group col-md-6 custom-input">
      <input
        className="form-control triangle-input"
        type="text"
        placeholder="Pincode"
      />
    </div>
    <div className="form-group col-md-6 custom-input">
      <input
        className="form-control triangle-input"
        type="text"
        placeholder="Mobile No"
      />
    </div>
    <div className="form-group col-md-6 custom-input">
      <input
        className="form-control triangle-input"
        type="text"
        placeholder="Email Address"
      />
    </div>
    <div className="form-group col-md-6 custom-input">
      <label>Shop Images</label>
      <input
        type="file"
        id="shopImages"
        name="shopImages"
        multiple
        className="form-control-file"
        required
      />
    </div>
  </div>
  <button type="submit" className="submit-button" onClick={(e)=>handleFormSubmit(e)}>
    Submit
  </button>
  </div>
{/* </form> */}

    </div>
  );
};

export default Shopform;
