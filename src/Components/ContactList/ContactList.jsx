import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEye, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import AddContact from '../AddContact/AddContact';
import EditContact from '../EditContact/EditContact';
import ViewDetails from '../ViewDetails/ViewDetails';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]); // Initialize contacts state
  const [search, setSearch] = useState(""); // Initialize search state
  const [showAdd, setShowAdd] = useState(false);// Control AddContact popup
  const [editing, setEditing] = useState(null);// Contact being edited
  const [viewing, setViewing] = useState(null);// Contact being viewed

  //----To fetch the contact details from give json url and format it to our need----
  useEffect(() => {
  const loadContacts = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json");
      const data = await response.json();
      // Format data to match our contact structure
      const formattedData = data.map((c, index) => ({
        id: index + 1,
        name: c.name,
        phone: c.mobile,
        email: c.email,
        address: c.address || "",
      }));

      setContacts(formattedData);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  loadContacts();
}, []);
//CRUD Operations(ADD,UPDATE,DELETE,SEARCH)
  const addContact = (contact) => {
    setContacts([
      ...contacts,
      {
        id: contacts.length + 1,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
      },
    ]);
  };

  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.phone.includes(search)
  );

  return (
    <div className="container">
      <div className="contact-card">
        <div className="header">
          <h2>All Contacts</h2>
          <button className="add-btn" onClick={() => setShowAdd(true)}>
            <FaPlus />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search Contact"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {/* Render the contact list */}
        <div className="contact-list">
          {filteredContacts.map((contact, index) => (
            <div key={contact.id} className="contact-item">
              <span className="contact index">{index + 1}</span>
              <FaUserCircle className="contact-icon" />

              {/* Display contact name and phone number */}
              <div className="contact-info">
                <p className="name">{contact.name}</p>
                <p className="phone">{contact.phone}</p>
              </div>

              {/* Action icons for view, edit, delete */}
              <div className="actions">
                <FaEye className="icon" title="view" onClick={() => setViewing(contact)} />
                <FaTrash className="icon delete" title="delete" onClick={() => deleteContact(contact.id)} />
                <FaEdit className="icon" title="edit" onClick={() => setEditing(contact)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render popups for adding, editing, and viewing contacts */}

      {showAdd && (
        <AddContact onAdd={addContact} onClose={() => setShowAdd(false)} />
      )}
      {editing && (
        <EditContact contact={editing} onUpdate={updateContact} onClose={() => setEditing(null)} />
      )}
      {viewing && (
        <ViewDetails contact={viewing} onClose={() => setViewing(null)} />
      )}
    </div>
  );
};

export default ContactList;
