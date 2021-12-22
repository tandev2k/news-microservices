const User = require('../models/user.model')

const getCurrentUser = (req, res) => {
  return res.status(200).json({ success: true, user: req.user })
}
const getAllUsers = async (req, res) => {
  const users = await User.find()
  res.status(200).json({ success: true, users })
}
module.exports = { getCurrentUser, getAllUsers }
