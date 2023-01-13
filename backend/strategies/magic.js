const passport = require('passport');

const { Magic } = require('@magic-sdk/admin');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const MagicStrategy = require('passport-magic').Strategy;

const User = require('../models/userModel');

passport.use(
  new MagicStrategy(async (user, done) => {
    const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);
    const existingUser = await User.findOne({ issuer: user.issuer });
    if (!existingUser) {
      return signupUser(user, userMetadata, done);
    }
    return loginUser(user, done);
  })
);
