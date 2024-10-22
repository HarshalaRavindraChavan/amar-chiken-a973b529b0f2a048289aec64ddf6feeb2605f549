import React, { useState } from 'react';
import './Addshop.css';
import Authuser from '../../Authentigation/Authuser';
import { Alert } from 'react-bootstrap';

const Addshop = () => {
  const { http } = Authuser(); // Ensure http is available

  const [shopData, setShopData] = useState({
    shopName: '',
    shopLocation: '',
    address: '',
    street: '',
    pincode: '',
    mobileNumber: '',
    emailAddress: '',
    shopImages: [],
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const onInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setShopData((prevState) => ({
        ...prevState,
        [name]: Array.from(files),
      }));
    } else {
      setShopData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(shopData).forEach((key) => {
      if (Array.isArray(shopData[key])) {
        shopData[key].forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, shopData[key]);
      }
    });

    try {
      const response = await http.post('http://localhost:5000/api/shops', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResponseMessage('Shop added successfully!');
      setAlertVariant('success');
      console.log('Response:', response.data);

      // Reset form
      setShopData({
        shopName: '',
        shopLocation: '',
        address: '',
        street: '',
        pincode: '',
        mobileNumber: '',
        emailAddress: '',
        shopImages: [],
      });
    } catch (error) {
      setResponseMessage('There was an error submitting the form.');
      setAlertVariant('danger');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container shopform-container">
      {responseMessage && (
        <Alert variant={alertVariant} className="mt-3">
          {responseMessage}
        </Alert>
      )}

      <div className="shopform">
        <h2 className="form-title">Shop Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {[
              { name: 'shopName', placeholder: 'Shop Name', type: 'text' },
              { name: 'shopLocation', placeholder: 'Shop Location', type: 'text' },
              { name: 'address', placeholder: 'Address', type: 'text' },
              { name: 'pincode', placeholder: 'Pincode', type: 'text' },
              { name: 'mobileNumber', placeholder: 'Mobile No', type: 'text' },
              { name: 'emailAddress', placeholder: 'Email Address', type: 'email' },
            ].map((input, index) => (
              <div key={index} className="form-group col-md-6 custom-input">
                <input
                  className="form-control triangle-input"
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={shopData[input.name]}
                  onChange={onInputChange}
                  required
                />
              </div>
            ))}

            <div className="form-group col-md-6 custom-input">
              <label>Shop Images</label>
              <input
                type="file"
                id="shopImages"
                name="shopImages"
                multiple
                className="form-control-file"
                onChange={onInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addshop;
