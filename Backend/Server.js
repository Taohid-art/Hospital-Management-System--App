const express = require('express');
const cors = require('cors');
const app = express();
const doctorRoute = require('./routes/doctorRoute');

app.use(express.json());
app.use(cors());
app.use("/doctors", doctorRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Healthcare API');      
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
