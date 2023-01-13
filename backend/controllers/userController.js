const { Magic } = require('@magic-sdk/admin');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const getUser = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(401).json({ message: 'User is not logged in' });
};

module.exports = {
  getUser,
  // deleteUser,
};
