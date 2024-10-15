import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Shoplist.css'; // Import the CSS for styling

const shopsData = [
  {
    img: "https://img.freepik.com/premium-vector/colorful-fried-chicken-shop-cartoon-vector-design_1080480-126900.jpg?semt=ais_hybrid",
    name: "Balaji Chicken",
    rating: 4.7,
    address: "Balaji park, mhada colony, Kolhapur, Maharashtra",
    pincode: "ZB53S7H",
    availability: { serviceAvailable: true, serviceNotAvailable: false },
    reviews: 31,
    products: [
      { name: 'Egg', price: '100 / 10 p', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpQADIrYbC5agt9OFuvI5I5hieNxIJAEcQHQ&s' },
      { name: 'Chicken', price: '144 / 500gm', img: 'https://www.shutterstock.com/image-photo/fresh-raw-chicken-basil-isolated-260nw-1064429528.jpg' },
      { name: 'Chicken Wing', price: '144 / 500gm', img: 'https://t4.ftcdn.net/jpg/02/92/77/85/360_F_292778539_JeGMFXajaQtXpq5nRZLo87suJZkqJ7oS.jpg' },
      { name: '1 Full Chicken Curry Cut', price: '144 / 500gm', img: 'https://newzealandfresh.sg/cdn/shop/products/Screen_Shot_2018-08-14_at_12.16.53_AM_grande.png?v=1563071603' },
    ]
  },
  // Add more shops if necessary
];

function Shoplist() {
  const { shopName } = useParams(); // Get the shop name from the URL
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const shop = shopsData.find((shop) => shop.name === shopName); // Find the shop details based on the name

  if (!shop) {
    return <div>Shop not found</div>; // Handle case when shop is not found
  }

  const handleProductClick = (productName) => {
    navigate(`/product/${productName}`); // Navigate to the product details page
  };

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
          {shop.products.map((product) => (
            <div key={product.name} className="product-card" onClick={() => handleProductClick(product.name)}>
              <img src={product.img} alt={product.name} />
              <h5>{product.name}</h5>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shoplist;
