const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const doctorRoute = require('./routes/doctorRoute');
const departmentRoute = require('./routes/departmentRoute');
const staffRoute = require('./routes/staffRoute');


app.use(express.json());
app.use(cors());
app.use("/doctors", doctorRoute);
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));
app.use('/dashboard/department',departmentRoute);
app.use('/dashboard/staff',staffRoute)


app.get('/', (req, res) => {
    res.send('Welcome to the Healthcare API');      
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
