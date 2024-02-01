// MovieBooking.js

import React, { useState } from 'react';
import "../css/MovieBooking.css";

const MovieBooking = ({ onClose, showId }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
    movieName: '',
    numberOfTickets: 1,
    seatPreference: '',
    paymentMethod: 'creditCard',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = () => {
    localStorage.setItem(`bookingData_${showId}`, JSON.stringify(formData));
    onClose();
  };

  return (
    <div className="booking-overlay">
      <div id="booking-form" className="booking-form">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Movie Booking Form</h2>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <label>
          Movie Name:
          <input type="text" name="movieName" value={formData.movieName} onChange={handleInputChange} />
        </label>
        <label>
          Number of Tickets:
          <input type="number" name="numberOfTickets" value={formData.numberOfTickets} onChange={handleInputChange} />
        </label>
        <label>
          Seat Preference:
          <input type="text" name="seatPreference" value={formData.seatPreference} onChange={handleInputChange} />
        </label>
        <label>
          Payment Method:
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <button onClick={handleFormSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default MovieBooking;
