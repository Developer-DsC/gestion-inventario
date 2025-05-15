const ProductoModel = require('../models/productos.model');

const ProductoController = {
    async listar(req, res) {
        try {
            const productos = await ProductoModel.getAll();
            res.json(productos);
        } catch (error) {
            console.error('Error al listar productos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    async crear(req, res) {
        try {
            const nuevo = await ProductoModel.create(req.body);
            res.status(201).json(nuevo);
        } catch (error) {
            console.error('Error al crear producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const producto = await ProductoModel.getById(req.params.id);
            if (!producto) return res.status(404).json({ error: 'No encontrado' });
            res.json(producto);
        } catch (error) {
            res.status(500).json({ error: 'Error interno' });
        }
    },

    async actualizar(req, res) {
        try {
            const actualizado = await ProductoModel.update(req.params.id, req.body);
            if (!actualizado) return res.status(404).json({ error: 'No encontrado' });
            res.json(actualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error interno' });
        }
    },

    async eliminar(req, res) {
        try {
            await ProductoModel.delete(req.params.id);
            res.json({ mensaje: 'Producto eliminado' });
        } catch (error) {
            res.status(500).json({ error: 'Error interno' });
        }
    }
};

module.exports = ProductoController;