const express = require('express');

const router = express.Router();

const { Magic } = require('@magic-sdk/admin');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const passport = require('passport');
const MagicStrategy = require('passport-magic').Strategy;

const User = require('../models/userModel');

const strategy = new MagicStrategy(async (user, done) => {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);
  const existingUser = await User.findOne({ issuer: user.issuer });
  console.log(existingUser);
  if (!existingUser) {
    return signupUser(user, userMetadata, done);
  }
  return loginUser(user, done);
});

passport.use(strategy);

const signupUser = async (user, userMetadata, done) => {
  const newUser = new User({
    issuer: user.issuer,
    email: userMetadata.email,
    lastLoginAt: user.claim.iat,
  });
  await newUser.save();
  return done(null, newUser);
};

const loginUser = async (user, done) => {
  if (user.claim.iat <= user.lastLoginAt) {
    return done(null, false, {
      message: `Replay attack detected for user ${user.issuer}.`,
    });
  }
  // user.lastLoginAt = user.claim.ait;
  // user.save();
  return done(null, user);
};

router.post('/login', passport.authenticate('magic'), (req, res) => {
  if (req.user) {
    res.status(200).end('User is logged in.');
  } else {
    return res.status(401).end('Could not log user in.');
  }
});

passport.serializeUser((user, done) => {
  done(null, user.issuer);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ issuer: id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

const userController = require('../controllers/userController');

router.get('/', userController.getUser);

// router.patch('/edit', userController.editUser);

// router.delete('/delete', userController.deleteUser);

router.post('/logout', async (req, res) => {
  if (req.isAuthenticated()) {
    await magic.users.logoutByIssuer(req.user.issuer);
    req.logout();
    return res.status(200).end();
  }
  return res.status(401).end(`User is not logged in.`);
});

module.exports = router;
