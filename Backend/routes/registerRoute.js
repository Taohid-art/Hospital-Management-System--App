const express = require('express');
const router = express.Router();
const connection = require('../db'); // 
const { upload } = require('../utils/multerConfig'); 
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');


router.post('/', upload.single('profile_image'), (req, res) => {
  const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    blood_group,
    phone,
    email,
    address,
    emergency_contact_name,
    emergency_contact_phone,
    insurance_provider,
    insurance_number,
    registered_date,
    status,
    password
  } = req.body;

  const profile_image = req.file ? req.file.filename : null;

  // 1️⃣ Check if email already exists
  const findSql = 'SELECT * FROM patients WHERE email = ?';
  connection.query(findSql, [email], (err, results) => {  
    if (err) {
      console.error('Error checking existing patient:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Patient with this email already exists. Please login.' });
    }

    // 2️⃣ Email does not exist → proceed with registration
    const sql = `
      INSERT INTO patients (
        first_name, last_name, gender, date_of_birth, blood_group, phone, email,
        address, profile_image, emergency_contact_name, emergency_contact_phone,
        insurance_provider, insurance_number, registered_date, status, password
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({ error: 'Failed to register patient' });

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Failed to register patient' });

        connection.query(
          sql,
          [
            first_name,
            last_name,
            gender,
            date_of_birth,
            blood_group,
            phone,
            email,
            address,
            profile_image,
            emergency_contact_name,
            emergency_contact_phone,
            insurance_provider,
            insurance_number,
            registered_date,
            status,
            hash
          ],
          (err, results) => {
            if (err) {
              console.error('Error inserting patient:', err);
              return res.status(500).json({ error: 'Failed to register patient' });
            }

            const token = generateToken({ email });
            res.cookie('token', token, {
              httpOnly: true,
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
              maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            res.status(201).json({
              message: 'Patient registered successfully',
              token,
              patientId: results.insertId
            });
          }
        );
      });
    });
  });
});



router.post('/admin-register', upload.single('profile_image'), (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name
  } = req.body;

  const profile_image = req.file ? req.file.filename : null;
  console.log('Admin Registration Data:', email, first_name, last_name, profile_image);
  
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'Please provide email, password, first name, and last name' });
  }

  // Check if admin email already exists
  connection.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error checking existing admin:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error('Error generating salt:', err);
        return res.status(500).json({ error: 'Server error' });
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ error: 'Server error' });
        }

        const sql = `
          INSERT INTO admin (email, password, first_name, last_name, profile_image, created_at)
          VALUES (?, ?, ?, ?, ?, NOW())
        `;

        connection.query(
          sql,
          [email, hash, first_name, last_name, profile_image],
          (err, results) => {
            if (err) {
              console.error('Error inserting admin:', err);
              return res.status(500).json({ error: 'Failed to register admin' });
            }
            const admin = true
            // Generate token (you can customize payload as needed)
            const token = generateToken({ email , admin });

            // Set token cookie if you want (optional)
            res.cookie('token', token, { httpOnly: true });

            res.status(201).json({ message: 'Admin registered successfully', token, adminId: results.insertId });
          }
        );
      });
    });
  });
});

module.exports = router;
