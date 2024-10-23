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
    shopImages: [] // Array to store images
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
    const data = new FormData(); // Create FormData object

    // Append all form fields to FormData
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        // If it's an array (like shopImages), append each file
        for (let i = 0; i < formData[key].length; i++) {
          data.append(key, formData[key][i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    fetch(
      `${process.env.REACT_APP_API_URL}user/shops`,
      formData,
      {
          headers: { 'Content-Type': 'application/json' },
      }
  )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert('added successfully');
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="container shopform-container">
      <h2 className="form-title">Shop Information</h2>
      <form className="shopform" encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="row">
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="shopName"
              placeholder="Shop Name"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="shopLocation"
              placeholder="Shop Location"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="address"
              placeholder="Address"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="mobileNumber"
              placeholder="Mobile No"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="email"
              name="emailAddress"
              placeholder="Email Address"
              onChange={onInputChange}
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
              onChange={onInputChange}
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addshps;
