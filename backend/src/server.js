const dotenv = require('dotenv');
const app = require('./app');
const db = require('./config/db.js');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('listening server...' + PORT));