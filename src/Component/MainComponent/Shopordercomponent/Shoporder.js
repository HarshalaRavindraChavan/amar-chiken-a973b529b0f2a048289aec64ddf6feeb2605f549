import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Shoplist.css'; // Import the CSS for styling

const Shoporder = () => {
  const { productName } = useParams();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Sample product data, replace this with actual data or fetch it from an API
  const productsData = [
    { name: 'Egg', available: 'Available in your Kolhapur', full: 'Full chicken is provided', description: 'Fresh farm eggs.', price: '100 / 10 p', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpQADIrYbC5agt9OFuvI5I5hieNxIJAEcQHQ&s' },
    { name: 'Chicken', available: 'Available in your Kolhapur', full: 'Full chicken is provided', description: 'Organic chicken meat.', price: '144 / 500gm', img: 'https://www.shutterstock.com/image-photo/fresh-raw-chicken-basil-isolated-260nw-1064429528.jpg' },
    { name: 'Chicken Wing', available: 'Available in your Kolhapur', full: 'Full chicken is provided', description: 'Juicy chicken wings.', price: '144 / 500gm', img: 'https://t4.ftcdn.net/jpg/02/92/77/85/360_F_292778539_JeGMFXajaQtXpq5nRZLo87suJZkqJ7oS.jpg' },
    { name: '1 Full Chicken Curry Cut', available: 'Available in your Kolhapur', full: 'Full chicken is provided', description: 'Curry cut chicken.', price: '144 / 500gm', img: 'https://newzealandfresh.sg/cdn/shop/products/Screen_Shot_2018-08-14_at_12.16.53_AM_grande.png?v=1563071603' },
  ];

  const product = productsData.find((prod) => prod.name === productName);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handlePlaceOrder = () => {
    // Set the orderPlaced state to true to show the order summary
    setOrderPlaced(true);
  };

  return (
    <div className="container mt-5 shop-container">
      {!orderPlaced ? (
        <div className="shop-header">
          <img src={product.img} alt={product.name} className="shop-img" />
          <div className="shop-info">
            <h1 className="shop-name">{product.name}</h1>
            <p>{product.available}</p>
            <h6>{product.description}</h6>
            <p>{product.full}</p>
            <p className="product-price">{product.price}</p>
            <h6>1 kg</h6>
            <button className="btn btn-primary place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="small-bill-card">
          <h4>Order summary</h4>
          <div className="summary-details">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p><strong>Order</strong> &nbsp;&nbsp;: &nbsp;&nbsp;Rs. 223.00</p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p><strong>Taxes</strong> &nbsp;&nbsp;: Rs. 3.00</p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p><strong>Delivery fees</strong> &nbsp;&nbsp;: Rs. 10.00</p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p><strong>Total</strong> &nbsp;&nbsp;: Rs. 236.00</p>
          </div>
          <h6>Estimated delivery time  &nbsp;&nbsp;: 15-30 mins</h6>

          <div className="payment-options">
            <div className="payment-method">
              <p>PhonePe</p>
              <p>G Pay</p>
            </div>
          </div>

          <button className="btn btn-danger pay-btn">Pay Rs. 236</button>
          <h5 className="btn btn-secondary">Cash on Delivery</h5>
          <button className="btn btn-primary place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
        </div>
      )}
    </div>
  );
}

export default Shoporder;
