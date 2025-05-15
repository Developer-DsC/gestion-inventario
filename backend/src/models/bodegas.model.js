// bodega.model.js
const db = require('../config/db') // Asegúrate de tener configurado db.js

const BodegaModel = {
    async getAll() {
        const result = await db.query('SELECT * FROM public.bodegas');
        return result.rows;
    },

    async create({ nombre, ciudad }) {
        const result = await db.query(
            'INSERT INTO bodegas (nombre, ciudad) VALUES ($1, $2) RETURNING *', [nombre, ciudad]
        );
        return result.rows[0];
    }
}

module.exports = BodegaModel;