const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// Helper: Query DB with promise
function query(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

// Helper: Common login function
async function handleLogin({ email, password, table, idField, isAdmin = false }, res) {
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const results = await query(`SELECT * FROM ${table} WHERE email = ? LIMIT 1`, [email]);
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create token payload
    const payload = isAdmin
      ? { admin_id: user[idField], email: user.email, admin: true }
      : { patient_id: user[idField], email: user.email };

    const token = generateToken(payload);

    // Send secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax', // use 'strict' for tighter security
      secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      message: `${isAdmin ? 'Admin' : 'User'} login successful`,
      token,
      user: {
        id: user[idField],
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        ...(isAdmin ? {} : { status: user.status }),
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Patient login
router.post('/', (req, res) => {
  handleLogin(
    { email: req.body.email, password: req.body.password, table: 'patients', idField: 'patient_id' },
    res
  );
});

// Admin login
router.post('/admin-login', (req, res) => {
  handleLogin(
    { email: req.body.email, password: req.body.password, table: 'admin', idField: 'admin_id', isAdmin: true },
    res
  );
});

module.exports = router;
