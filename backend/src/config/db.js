const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Verifica la conexión de forma asíncrona
db.connect()
    .then(() => {
        console.log('✅ Conexión a la base de datos establecida.');
        return db.query('SELECT NOW()');
    })
    .then((res) => {
        console.log('🕒 Fecha y hora del servidor PostgreSQL:', res.rows[0].now);
    })
    .catch((err) => {
        console.error('❌ Error al conectar a la base de datos:', err.message);
    });

module.exports = db;