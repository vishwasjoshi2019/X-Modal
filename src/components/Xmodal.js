import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

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

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h1>User Details Form</h1>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>Open Form</Button>
      
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style} className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <Typography id="modal-title" variant="h6" component="h2">
              Fill Details
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                margin="normal"
                id="username"
                label="Username"
                value={formData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                fullWidth
                margin="normal"
                id="email"
                label="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                id="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                fullWidth
                margin="normal"
                id="dob"
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                error={!!errors.dob}
                helperText={errors.dob}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button type="submit" variant="contained" color="primary" className="submit-button">
                Submit
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default XModal;
