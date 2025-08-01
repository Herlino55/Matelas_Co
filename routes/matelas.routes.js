const express = require('express');
const router = express.Router();
const matelasController = require('../controllers/matelas.controller');
const upload = require('../middlewares/upload');

// CRUD
router.post('/', upload.single('photo'), matelasController.createMatelas);
router.get('/', matelasController.getAllMatelas);
router.put('/:id',upload.single('photo'), matelasController.updateMatelas);
router.delete('/:id', matelasController.deleteMatelas);
router.get('/dim', matelasController.searchMatelas);
router.get('/minimalStock', matelasController.verifierStockMatelas);

module.exports = router;
