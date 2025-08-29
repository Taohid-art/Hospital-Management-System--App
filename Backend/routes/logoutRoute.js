const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Must match the exact cookie options from login
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax', // or 'strict' if you used strict in login
    secure: process.env.NODE_ENV === 'production', // must match login setting
    path: '/' // match the path used in login
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
