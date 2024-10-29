import React from 'react'

const Productadd = () => {
  return (
    <div className="container shopform-container">
      <h2 className="form-title">Product Information</h2>
      <form className="shopform" encType="multipart/form-data" >
        <div className="row">
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="productName"
              placeholder="Product Name"
            //   onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="Location"
              placeholder=" Location"
            //   onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="address"
              placeholder="Address"
            //   onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="pincode"
              placeholder="Pincode"
            //   onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="text"
              name="mobileNumber"
              placeholder="Mobile No"
            //   onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <input
              className="form-control triangle-input"
              type="email"
              name="emailAddress"
              placeholder="Email Address"
            //   onChange={onInputChange}
            />
          </div>
          <div className="form-group col-md-6 custom-input">
            <label>Product Images</label>
            <input
              type="file"
              id="shopImages"
              name="shopImages"
              multiple
              className="form-control-file"
            //   onChange={onInputChange}
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Productadd