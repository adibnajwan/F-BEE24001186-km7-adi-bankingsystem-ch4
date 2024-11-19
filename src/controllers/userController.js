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

    console.log("Request received for email:", email);

    const user = await userService.getUserByEmail(email);
    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ error: "User not found" });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000);

    await userService.updateUser(user.id, {
      resetPasswordToken: token,
      resetTokenExpiry: expiry,
    });

    console.log("Token generated:", token);

    const resetLink = `${process.env.API_URL}/reset-password?token=${token}`;
    await sendEmail(
      user.email,
      'Reset Password Request',
      { resetLink, userName: user.name }
    );

    console.log("Reset email sent to:", user.email);

    res.status(200).json({ message: 'Reset password link sent to email.' });
  } catch (error) {
    console.error("Error in forgotPassword handler:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await userService.getUserByToken(token);
    if (!user || user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    const hashedPassword = await hashPassword(newPassword);

    await userService.updateUser(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetTokenExpiry: null,
    });

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  postUser,
  getAllUsers,
  getUserById,
  forgotPassword,
  resetPassword
};