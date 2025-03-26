import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Payment.css";

function Payment() {
  const { eventId } = useParams(); // Get event ID from URL
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Successful!"); // Replace with actual payment processing logic
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Secure Debit Card Payment</h2>
        <p>Event ID: <strong>{eventId}</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input 
              type="text" 
              name="cardholderName" 
              className="form-control" 
              placeholder="John Doe" 
              value={paymentDetails.cardholderName} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input 
              type="text" 
              name="cardNumber" 
              className="form-control" 
              placeholder="XXXX XXXX XXXX XXXX" 
              maxLength="19" 
              value={paymentDetails.cardNumber} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Expiry Date</label>
              <input 
                type="text" 
                name="expiryDate" 
                className="form-control" 
                placeholder="MM/YY" 
                maxLength="5" 
                value={paymentDetails.expiryDate} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group col-md-6">
              <label>CVV</label>
              <input 
                type="password" 
                name="cvv" 
                className="form-control" 
                placeholder="XXX" 
                maxLength="3" 
                value={paymentDetails.cvv} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Pay Now</button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
