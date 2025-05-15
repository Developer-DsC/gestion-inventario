const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/producto.controller.js');

// Rutas CRUD
router.get('/productos', ProductoController.listar);
router.post('/productos', ProductoController.crear);
router.get('/productos/:id', ProductoController.obtenerPorId);
router.put('/productos/:id', ProductoController.actualizar);
router.delete('/productos/borrar/:id', ProductoController.eliminar);

module.exports = router;