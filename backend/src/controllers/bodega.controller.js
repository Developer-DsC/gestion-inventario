// bodega.controller.js
const BodegaModel = require('../models/bodegas.model.js');

const BodegaController = {
    async listar(req, res) {
        try {
            const bodegas = await BodegaModel.getAll();
            res.json(bodegas);
        } catch (error) {
            console.error('Error al listar bodegas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    async crear(req, res) {
        try {
            const nueva = await BodegaModel.create(req.body);
            res.status(201).json(nueva);
        } catch (error) {
            console.error('Error al crear bodega:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
}

module.exports = BodegaController;