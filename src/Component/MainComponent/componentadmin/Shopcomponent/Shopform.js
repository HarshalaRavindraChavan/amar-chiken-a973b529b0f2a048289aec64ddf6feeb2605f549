import React, { useState } from 'react';
import './Shopform.css';
import Authuser from '../../Authentigation/Authuser';

const Shopform = () => {

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
  <button type="submit" className="submit-button" >
    Submit
  </button>
  </div>
{/* </form> */}

    </div>
  );
};

export default Shopform;
