const { comparePassword, generateToken } = require('../utils/authUtils');
const authService = require('../services/authService'); 
const User = require('../models/User'); 

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const token = await authService.login(email, password); // Pastikan Anda memiliki logika login yang benar
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message }); // Pastikan menangani kesalahan dengan benar
  }
};

module.exports = { login };