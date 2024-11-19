const userService = require("../services/userService");
const { hashPassword } = require('../utils/authUtils');

const postUser = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      bio,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); 

    await userService.updateUser(user.id, {
      resetPasswordToken: token,
      resetTokenExpiry: expiry,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendEmail(user.email, 'Reset Your Password', { resetLink, userName: user.name });

    res.status(200).json({ message: 'Password reset link sent to email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  postUser,
  getAllUsers,
  getUserById,
  forgotPassword
};