const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');


// CRUD operations for Boisson
router.post('/', TransactionController.createTransaction);
router.get('/', TransactionController.getAllTransaction);
router.put('/:id', TransactionController.updateTransaction);
router.delete('/:id', TransactionController.deleteTransaction);

//recherche
router.get('/search', TransactionController.searchTransactions);

module.exports = router;