const express = require('express');
const router = express.Router();
const connection = require('../db');

// GET all doctors with filters
router.get('/', (req, res) => {
  const { name, specialization, status, gender } = req.query;

  let sql = 'SELECT * FROM doctors WHERE 1=1';
  const values = [];

  if (name) {
    sql += ' AND (first_name LIKE ? OR last_name LIKE ?)';
    values.push(`%${name}%`, `%${name}%`);
  }

  if (specialization) {
    sql += ' AND specialization = ?';
    values.push(specialization);
  }

  if (status) {
    sql += ' AND status = ?';
    values.push(status);
  }

  if (gender) {
    sql += ' AND gender = ?';
    values.push(gender);
  }

  connection.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.json(results);
  });
});

// GET single doctor by ID
router.get('/:id', (req, res) => {
  const doctorId = req.params.id;

  connection.query(
    'SELECT * FROM doctors WHERE doctor_id = ?',
    [doctorId],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query failed' });
      if (results.length === 0) return res.status(404).json({ error: 'Doctor not found' });
      res.json(results[0]);
      
      
    }
  );
});
router.post('/add', (req, res) => {
  const {
    first_name,
    last_name,
    gender,
    phone,
    email,
    department_id,
    profile_image,
    specialization,
    qualification,
    years_of_experience,
    available_days,
    available_time_from,
    available_time_to,
    status,
  } = req.body;

  const sql = `
    INSERT INTO Doctors (
      first_name,
      last_name,
      gender,
      phone,
      email,
      department_id,
      profile_image,
      specialization,
      qualification,
      years_of_experience,
      available_days,
      available_time_from,
      available_time_to,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    first_name,
    last_name,
    gender,
    phone,
    email,
    department_id,
    profile_image,
    specialization,
    qualification,
    years_of_experience,
    available_days,
    available_time_from,
    available_time_to,
    status,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting doctor:", err);
      return res.status(500).json({ error: "Failed to add doctor" });
    }
    res.status(200).json({ message: "Doctor added successfully", doctor_id: result.insertId });
  });
});






// DELETE doctor by ID
router.delete('/:id', (req, res) => {
  const doctorId = req.params.id;
  if (!doctorId) {
    return res.status(400).json({ message: 'Doctor ID is required' });
  }

  const sql = 'DELETE FROM doctors WHERE doctor_id = ?';

  connection.query(sql, [doctorId], (err, result) => {
    if (err) {
      console.error('Error deleting doctor:', err);
      return res.status(500).json({ message: 'Failed to delete doctor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  });
});

module.exports = router;
