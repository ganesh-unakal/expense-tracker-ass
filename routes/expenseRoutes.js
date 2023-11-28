const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses-controller');


router.post('/add-expenses', expenseController.postAddExpense);

router.get('/get-allexpenses', expenseController.getAllExpenses);

router.get('/delete-expense/:id', expenseController.deleteExpense);
module.exports = router

