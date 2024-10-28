import React, { useState } from 'react';
import './Addshop.css';
import Authuser from '../../Authentication/Authuser';

const Addshps = () => {
  const { http } = Authuser();
  const [formData, setformData] = useState({
    shopName: '',
    shopLocation: '',
    address: '',
    street: '',
    pincode: '',
    mobileNumber: '',
    emailAddress: '',
    // shopImages: [] // Array to store images
  });

  console.log(formData);

  const onInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setformData({ ...formData, [name]: files }); // Update shopImages with selected files
    } else {
      setformData({ ...formData, [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
  
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        for (let i = 0; i < formData[key].length; i++) {
          data.append(key, formData[key][i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }
  
    fetch(`${process.env.REACT_APP_API_URL}/shops`, {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        alert('Added successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
      });
  };
  

  return (
    <div className="container shopform-container">
    <h2 className="form-title">Shop Information</h2>
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
        <div className="form-group col-12 custom-input">
        {/* <label className="file-label">Shop Images</label> */}
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
      <button type="submit" className="submit-button">
        Submit
      </button>
    </div>
  </div>
  
  );
};

export default Addshps;
