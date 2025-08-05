const express = require('express');
const router = express.Router();
const connection = require('../db');
const {upload} = require('../utils/multerConfig');
const fs = require('fs');
const path = require('path');

router.get("/", (req, res) => {
  const query = "SELECT * FROM Staff";
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post('/add', upload.single('profile_image'),(req,res)=>{
  const {
    first_name,
    last_name,
    gender,
    role,
    phone,
    email,
    department_id,
    hire_date,
    salary,
    shift,
    status} = req.body;
    const profile_image = req.file ? req.file.filename : null;
   
    
    const query = `INSERT INTO staff (
    first_name,
    last_name,
    gender,
    role,
    phone,
    email,
    department_id,
    hire_date,
    salary,
    shift,
    status,
    profile_image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
    const values = [
    first_name,
    last_name,
    gender,
    role,
    phone,
    email,
    department_id,
    hire_date,
    salary,
    shift,
    status,
    profile_image
    ];
    connection.query(query,values, (err ,results)=>{
      if(err) {
           console.error("Error inserting Staff:", err);
      return res.status(500).json({ error: "Failed to add Staff" });
      }
      res.status(200).json({ message: "Doctor added successfully"});
    })
});
router.delete('/delete/:id', (req, res) => {
  const staffId = req.params.id;

  // 1) Get profile_image filename for the staff
  const selectSql = 'SELECT profile_image FROM staff WHERE staff_id = ?';
  connection.query(selectSql, [staffId], (selectErr, selectResults) => {
    if (selectErr) {
      console.error('Error fetching staff:', selectErr);
      return res.status(500).json({ error: 'Failed to fetch staff' });
    }

    if (selectResults.length === 0) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    const profileImage = selectResults[0].profile_image;

    // 2) Delete DB row
    const deleteSql = 'DELETE FROM staff WHERE staff_id = ?';
    connection.query(deleteSql, [staffId], (deleteErr, deleteResults) => {
      if (deleteErr) {
        console.error('Error deleting staff:', deleteErr);
        return res.status(500).json({ error: 'Failed to delete staff' });
      }

      if (deleteResults.affectedRows === 0) {
        return res.status(404).json({ error: 'Staff not found' });
      }

      // 3) If there is an image filename, try to delete the file (non-blocking)
      if (profileImage) {
        // Build correct absolute path to your backend public images folder
        const imgPath = path.join(__dirname, '../../frontend/public/images', profileImage);

        fs.unlink(imgPath, (fsErr) => {
          if (fsErr) {
            // Log warning but DO NOT send another response (we already deleted DB)
            console.warn('Image file delete warning (file may not exist):', fsErr.message);
          }
          // Respond to client only once (after DB delete and attempted file removal)
          return res.status(200).json({ message: 'Staff and image deleted successfully' });
        });
      } else {
        // No image to delete - respond immediately
        return res.status(200).json({ message: 'Staff deleted successfully (no image)' });
      }
    });
  });
});

module.exports = router;