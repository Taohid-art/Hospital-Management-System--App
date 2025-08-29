
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const doctorRoute = require('./routes/doctorRoute');
const departmentRoute = require('./routes/departmentRoute');
const staffRoute = require('./routes/staffRoute');
const registerRoutes = require('./routes/registerRoute');
const loginRoutes = require('./routes/loginRoute');
const logoutRoutes = require('./routes/logoutRoute');
const authRoute = require("./routes/authRoute");

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session middleware
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Prevent JS access to cookies
    secure: false,  // true only if using HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

// Routes
app.use("/auth", authRoute);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logoutRoutes);
app.use("/doctors", doctorRoute);
app.use('/dashboard/department', departmentRoute);
app.use('/dashboard/staff', staffRoute);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
