const transactionService = require("../services/transactionService");
const { validateTransaction } = require("../validations/transactionValidation");

const createTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving transactions" });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.transactionId);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving transaction" });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
};