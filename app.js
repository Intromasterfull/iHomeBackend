const express = require('express');
const cors = require('cors');
require('./routes/dataRegist');

const app = express();

app.use(cors());
app.use(express.json());

const scheduleRoutes = require('./routes/dataRegist');

app.use('/api', scheduleRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});