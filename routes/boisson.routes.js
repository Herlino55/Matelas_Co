const express = require('express');
const router = express.Router();
const boissonController = require('../controllers/boisson.controller');
const authMiddleware = require('../middlewares/auth.middleware')

//CRUD
router.post('/',authMiddleware, boissonController.createBoissons);
router.get('/',authMiddleware, boissonController.getAllBoissons);
router.put('/:id',authMiddleware, boissonController.updateBoisson);
router.delete('/:id',authMiddleware, boissonController.deleteBoisson);
router.get('/search',authMiddleware, boissonController.searchBoissons);

module.exports = router;