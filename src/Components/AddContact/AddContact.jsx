import React, { useState } from "react";
import "./AddContact.css";

function AddContact({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });//form state to hold input values

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submissions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Name is required!");
      return;
    }
    if (form.name.trim().length < 2) {
      alert("Name must be at least 2 characters.");
      return;
    }
    if (!form.email.trim()) {
      alert("Email is required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Please enter a valid email.");
      return;
    }
    if (!form.phone.trim()) {
      alert("Phone number is required!");
      return;
    }
    if (!/^\d{10,}$/.test(form.phone)) {
      alert("Phone number must be at least 10 digits.");
      return;
    }
    if (!form.address.trim()) {
      alert("Address is required!");
      return;
    }
    if (form.address.trim().length < 5) {
      alert("Address must be at least 5 characters.");
      return;
    }
    onAdd(form);
    setForm({ name: "", email: "", phone: "", address: "" }); // reset form
    onClose(); // close popup
  };

  // Handle form reset
  const handleReset = () => {
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Contact</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>
        
        {/* Form for adding a new contact */}
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
          />

          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter Your Address"
          />
        {/* Form action buttons */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContact;

