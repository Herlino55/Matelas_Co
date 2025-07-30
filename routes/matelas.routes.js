const express = require('express');
const router = express.Router();
const matelasController = require('../controllers/matelas.controller');
const upload = require('../middlewares/upload');

// CRUD
router.post('/', upload.single('photo'), matelasController.createMatelas);
router.get('/', matelasController.getAllMatelas);
router.put('/:id', matelasController.updateMatelas);
router.delete('/:id', matelasController.deleteMatelas);
router.get('/dim',upload.single('photo'), matelasController.searchMatelas);

module.exports = router;
