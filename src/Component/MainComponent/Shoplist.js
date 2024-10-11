import React from 'react';
import { useParams } from 'react-router-dom';
import './Shoplist.css'; // Import the CSS for styling

const shopsData = [
  {
    img: "https://img.freepik.com/premium-vector/colorful-fried-chicken-shop-cartoon-vector-design_1080480-126900.jpg?semt=ais_hybrid",
    name: "Balaji Chicken",
    rating: 4.7,
    address: "Balaji park, mhada colony, Kolhapur, Maharashtra",
    pincode: "ZB53S7H",
    availability: { serviceAvailable: true, serviceNotAvailable: false },
    reviews: 31
  },
  // Add other shops if necessary
];

function Shoplist() {
  const { shopName } = useParams(); // Get the shop name from the URL
  const shop = shopsData.find((shop) => shop.name === shopName); // Find the shop details based on the name

  if (!shop) {
    return <div>Shop not found</div>; // Handle case when shop is not found
  }

  return (
    <div className="container mt-5 shop-container">
      <div className="shop-header">
        <img src={shop.img} alt={shop.name} className="shop-img" />
        <div className="shop-info">
          <h1 className="shop-name">{shop.name}</h1>
          <p>{shop.address}</p>
          <p>Pincode: {shop.pincode}</p>
          <div className="shop-status">
            <span className="status-available">
              {shop.availability.serviceAvailable ? 'Service available' : 'Service not available'}
            </span>
            <span className="shop-rating">
              <strong>{shop.rating}</strong>
              <i className="fas fa-star text-warning"></i>
              <span> ({shop.reviews} reviews)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="search-bar text-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search for the products you love"
        />
      </div>

      <div className="products-section">
        <h2 className="section-title">Products</h2>
        <div className="products">
          <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpQADIrYbC5agt9OFuvI5I5hieNxIJAEcQHQ&s" alt="Eggs" />
            <h5>Egg</h5>
            <p>100 / 10 p</p>
          </div>
          <div className="product-card">
            <img src="https://www.shutterstock.com/image-photo/fresh-raw-chicken-basil-isolated-260nw-1064429528.jpg" alt="Chicken" />
            <h5>Chicken</h5>
            <p>144 / 500gm</p>
          </div>
          <div className="product-card">
            <img src="https://t4.ftcdn.net/jpg/02/92/77/85/360_F_292778539_JeGMFXajaQtXpq5nRZLo87suJZkqJ7oS.jpg" alt="Chicken Wing" />
            <h5>Chicken Wing</h5>
            <p>144 / 500gm</p>
          </div>
          <div className="product-card">
            <img src="https://newzealandfresh.sg/cdn/shop/products/Screen_Shot_2018-08-14_at_12.16.53_AM_grande.png?v=1563071603" alt="Chicken Curry Cut" />
            <h5>1 Full Chicken Curry Cut</h5>
            <p>144 / 500gm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shoplist;
