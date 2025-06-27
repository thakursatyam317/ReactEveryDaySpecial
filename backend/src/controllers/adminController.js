import User from '../models/userModels.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password -__v');
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const toggleUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();

    res.status(200).json({ 
      success: true,
      message: `Role updated to ${user.role}`,
      user: { _id: user._id, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.status = user.status === 'active' ? 'blocked' : 'active';
    await user.save();

    res.status(200).json({ 
      success: true,
      message: `Status updated to ${user.status}`,
      user: { _id: user._id, status: user.status }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};