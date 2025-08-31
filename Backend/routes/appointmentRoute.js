const express = require('express');
const db = require('../db');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Appointments route is working!' });
});

// Book appointment
router.post('/', async (req, res) => {
  try {
    console.log('Appointment booking request:', req.body);
    const { patient_id, doctor_id, appointment_date, appointment_time, reason, status = 'pending' } = req.body;

    // Validate required fields
    if (!patient_id || !doctor_id || !appointment_date || !appointment_time || !reason) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // For now, just return success without database
    // TODO: Add database insertion when DB is ready
    console.log('Appointment would be created for:', {
      patient_id, doctor_id, appointment_date, appointment_time, reason, status
    });
    
    res.status(201).json({ 
      message: 'Appointment booked successfully',
      appointment_id: Math.floor(Math.random() * 1000) // Temporary ID
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Failed to book appointment: ' + error.message });
  }
});

// Get appointments
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT a.*, 
             CONCAT(p.first_name, ' ', p.last_name) as patient_name,
             CONCAT(d.first_name, ' ', d.last_name) as doctor_name,
             d.specialization
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.patient_id
      LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `;
    
    const [appointments] = await db.execute(query);
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

module.exports = router;