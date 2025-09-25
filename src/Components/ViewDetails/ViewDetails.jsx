import React from 'react'
import './ViewDetails.css'

const ViewDetails = ({ contact , onClose }) => {
  // If no contact is provided, don't render anything
  if (!contact) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header with title + close button */}
        <div className="modal-header">
          <h3>Contact Details</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Display contact details */}
        <div className="modal-body">
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Address:</strong> {contact.address}</p>
        </div>
      </div>
    </div>
  )
}

export default ViewDetails
