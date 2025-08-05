const express = require('express');
const router = express.Router();
const connection = require('../db');
const {upload} = require('../utils/multerConfig');





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
router.post('/add',upload.single('profile_image'),(req, res) => {
  const {
    first_name,
    last_name,
    gender,
    phone,
    email,
    department_id,
    
    specialization,
    qualification,
    years_of_experience,
    available_days,
    available_time_from,
    available_time_to,
    status,
  } = req.body;
  const profile_image = req.file ? req.file.filename : null; // Handle file upload
  
  console.log(profile_image);
  
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
      status,
      
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



router.put('/:id/update',upload.single('profile_image'), (req, res) => {
  const doctorId = req.params.id;

  const {
    first_name,
    last_name,
    gender,
    phone,
    email,
    department_id,
  
    specialization,
    qualification,
    years_of_experience,
    available_days,
    available_time_from,
    available_time_to,
    status,
  } = req.body;
   const profile_image = req.file ? req.file.filename : null;
  

    const selectSql = 'SELECT profile_image FROM doctors WHERE doctor_id = ?';
  connection.query(selectSql, [doctorId], (selectErr, selectResult) => {
    if (selectErr) {
      console.error('Failed to fetch doctor data:', selectErr);
      return res.status(500).json({ message: 'Error fetching doctor data' });
    }

    if (selectResult.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
  const oldImage = selectResult[0].profile_image;
  if (profile_image && oldImage) {
    const oldImagePath = path.join(__dirname, '../../frontend/public/images', oldImage);
    fs.unlink(oldImagePath, (fsErr) => {
      if (fsErr) {
        console.warn(`Old image not found or already deleted: ${oldImage}`);
      } else {
        console.log(`Deleted old image file: ${oldImage}`);
      }
    });
  }
  })
  const sql = `
    UPDATE doctors SET 
      first_name =?,
      last_name  = ?,
      gender = ?,
      phone = ?,
      email = ?,
      department_id = ?,
      profile_image = ?,
      specialization = ?,
      qualification = ?,
      years_of_experience = ?,
      available_days = ?,
      available_time_from = ?,
      available_time_to = ?,
      status = ?
     WHERE doctor_id = ?
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
    doctorId,
  ];

    connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ message: "Update failed" });
    }
    res.status(200).json({ message: "Doctor updated successfully" });
  });
});





// DELETE doctor by ID
const fs = require('fs');



router.delete('/:id', (req, res) => {
  const doctorId = req.params.id;

  // Step 1: Fetch the doctor's profile_image filename
  const selectSql = 'SELECT profile_image FROM doctors WHERE doctor_id = ?';

  connection.query(selectSql, [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching doctor:', err);
      return res.status(500).json({ message: 'Failed to fetch doctor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const imageFile = results[0].profile_image;
    
    
    const imagePath = path.join(__dirname, '../../frontend/public/images', imageFile);


    // Step 2: Delete the image file
    fs.unlink(imagePath, (fsErr) => {
      if (fsErr) {
        console.warn(`Image not found or already deleted: ${imageFile}`);
      } else {
        console.log(`Deleted image file: ${imageFile}`);
      }

      // Step 3: Delete the doctor from database
      const deleteSql = 'DELETE FROM doctors WHERE doctor_id = ?';
      connection.query(deleteSql, [doctorId], (err, result) => {
        if (err) {
          console.error('Error deleting doctor:', err);
          return res.status(500).json({ message: 'Failed to delete doctor' });
        }

        res.status(200).json({ message: 'Doctor and image deleted successfully' });
      });
    });
  });
});

module.exports = router;
