const accountService = require("../services/accountService");
const { validationResult } = require('express-validator');

const createAccount = async (req, res) => {
  try {
    const account = await accountService.createAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    console.error("Error creating account:", error); 
    res.status(400).json({ error: error.message });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving accounts" });
  }
};

const getAccountById = async (req, res) => {
  try {
    const account = await accountService.getAccountById(req.params.accountId);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving account" });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
};