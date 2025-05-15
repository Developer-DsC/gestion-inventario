const db = require('../config/db');

const ProductoModel = {
    async getAll() {
        const result = await db.query(`
      SELECT p.id, p.nombre, p.stock, p.precio,
             b.id AS bodega_id, b.nombre AS bodega_nombre, b.ciudad
      FROM productos p
      JOIN bodegas b ON p.bodega_id = b.id
    `);
        return result.rows;
    },

    async create({ nombre, stock, precio, bodega_id }) {
        const result = await db.query(
            `INSERT INTO productos (nombre, stock, precio, bodega_id)
       VALUES ($1, $2, $3, $4) RETURNING *`, [nombre, stock, precio, bodega_id]
        );
        return result.rows[0];
    },

    async getById(id) {
        const result = await db.query(
            `SELECT p.id, p.nombre, p.stock, p.precio,
              b.id AS bodega_id, b.nombre AS bodega_nombre, b.ciudad
       FROM productos p
       JOIN bodegas b ON p.bodega_id = b.id
       WHERE p.id = $1`, [id]
        );
        return result.rows[0];
    },

    async update(id, { nombre, stock, precio, bodega_id }) {
        const result = await db.query(
            `UPDATE productos
       SET nombre = $1, stock = $2, precio = $3, bodega_id = $4
       WHERE id = $5 RETURNING *`, [nombre, stock, precio, bodega_id, id]
        );
        return result.rows[0];
    },

    async delete(id) {
        await db.query('DELETE FROM productos WHERE id = $1', [id]);
    }
};

module.exports = ProductoModel;