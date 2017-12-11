const app = require('./app');
const db = require('./db/index.js');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log('Listening on port ', PORT);
