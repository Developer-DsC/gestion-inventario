// bodega.routes.js
const express = require('express');
const router = express.Router();
const BodegaController = require('../controllers/bodega.controller.js');

// Rutas CRUD
router.get('/bodegas', BodegaController.listar);
router.post('/bodegas', BodegaController.crear);


module.exports = router;