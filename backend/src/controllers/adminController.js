// controllers/adminController.js
import User from '../models/userModels.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export const promoteToAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.role = 'admin';
    await user.save();
    res.json({ message: 'User promoted to admin' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to promote user' });
  }
};
