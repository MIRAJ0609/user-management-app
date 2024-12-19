import React, { useState } from 'react';
import axios from 'axios';

const EditUser = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${user.id}`, formData);
      alert('User updated successfully.');
      onSave(response.data); // Pass the updated user to App.js
    } catch (err) {
      alert('Failed to update user.');
    }
  };

  return (
    <div className="edit-form">
      <h3>Edit User</h3>
      <form>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUser;
