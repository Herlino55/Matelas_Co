const express = require('express');
const router = express.Router();
const boissonController = require('../controllers/boisson.controller');

//CRUD
router.post('/', boissonController.createBoissons);
router.get('/', boissonController.getAllBoissons);
router.put('/:id', boissonController.updateBoisson);
router.delete('/:id', boissonController.deleteBoisson);

module.exports = router;