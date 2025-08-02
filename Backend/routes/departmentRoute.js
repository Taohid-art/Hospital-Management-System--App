const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/',(req,res) =>{
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
        
        
    });
})
router.post("/",(req,res) => {
 const query = `INSERT INTO departments (department_id, department_name,head_doctor_id, contact_number, location)
VALUES(?,?,?,?,?)`;
const values = [
    req.body.department_id,
    req.body.department_name,
    req.body.head_doctor_id,
    req.body.contact_number,
    req.body.location

];

  connection.query(query, values,(err, results)=> {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.status(201).json({ message: 'Department added successfully', departmentId: results.insertId });
  })
  
})

router.delete('/delete/:id',(req,res)=>{
    const departmentId = req.params.id;

    
    connection.query('DELETE FROM departments WHERE department_id = ?', [departmentId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Department not found' });
        res.json({ message: 'Department deleted successfully' });
    });
})
module.exports = router;