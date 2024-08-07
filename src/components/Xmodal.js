import React, { useState } from 'react';
import './Xmodal.css'; // Create and import a CSS file for styling

const XModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = 'Please fill out this field.';
    if (!formData.email.includes('@')) tempErrors.email = 'Invalid email. Please check your email address.';
    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      tempErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
    }
    if (new Date(formData.dob) > new Date()) {
      tempErrors.dob = 'Invalid date of birth. Date of birth cannot be in the future.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      setIsModalOpen(false);
      setFormData({
        username: '',
        email: '',
        phone: '',
        dob: '',
      });
      setErrors({});
    } else {
      if (errors.phone) alert(errors.phone);
      if (errors.dob) alert(errors.dob);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>User Details Form</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Form</button>
      
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <h2>Fill Details</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <p className="error">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                  {errors.dob && <p className="error">{errors.dob}</p>}
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
