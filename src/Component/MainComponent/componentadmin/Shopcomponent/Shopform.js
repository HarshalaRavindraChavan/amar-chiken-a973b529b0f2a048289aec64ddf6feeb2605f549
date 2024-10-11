import React from 'react';
import './Shopform.css';

const Shopform = () => {
  return (
    <div className="container shopform-container">
      <h2 className="form-title">Shop Information</h2>
      <form className="shopform">
        <div className="row">
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name=""
              placeholder="Shop Name"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name=""
              placeholder="Shop Location"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name=""
              placeholder="Address"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name=""
              placeholder="Pincode"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name=""
              placeholder="Mobile No"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name=""
              placeholder="Email Address"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name=""
              placeholder="Products"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name=""
              placeholder="Price of Product"
            />
          </div>
          <div className="form-group col-md-6">
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
          <div className="form-group col-md-6">
            <label>Product Images</label>
            <input
              type="file"
              id="productImages"
              name="productImages"
              multiple
              className="form-control-file"
              required
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

export default Shopform;
