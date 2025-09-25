import React, { useState, useEffect } from "react";
import "./editContact.css";

const EditContact = ({ contact, onUpdate, onClose }) => {
  // Local state to hold form values (pre-filled with contact to edit)
  const [form, setForm] = useState(contact);

  // Whenever the contact prop changes, update the form state
  useEffect(() => {
    setForm(contact);
  }, [contact]);

  // Update form fields as the user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure required fields are filled
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

    // Send updated contact back to parent
    onUpdate(form);

    // Close the modal
    onClose();
  };

  // Reset form back to the original contact values
  const handleReset = () => {
    setForm(contact);
  };

  return (
    <div className="edit-overlay">
      <div className="edit-content">
        {/* Header with title + close button */}
        <div className="edit-header">
          <h3>Edit Contact</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Edit contact form */}
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Enter Your Name"
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Enter Your Email"
          />

          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Enter Your Address"
          />

          {/* Action buttons */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">Update</button>
            <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
