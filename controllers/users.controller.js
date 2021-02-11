const passport = require("passport");
const User = require('../models/User');


module.exports = {
  checkSession: async (req, res, next) => {
      if(req.user) {
        return res.status(200).json(req.user);n
      } else {
        return res.status(401).json({message: 'No user found'});
      }
  },

  registerPost: (req, res, next) => {
    passport.authenticate("register", (error, user) => {
      if (error) {
        return res.status(403).json({message: error.message});
      }

      req.logIn(user, (error) => {
        if (error) {
          return res.status(403).json({message: error.message});
        }

        return res.json(user);
      });
    })(req, res, next);
  },

  loginPost: (req, res, next) => {
    passport.authenticate("login", (error, user) => {
      if (error) {
        return res.json({message: error.message});
      }

      req.logIn(user, (error) => {
        if (error) {
          return res.json({message: error.message});
        }
        return res.json(user);
      });
    })(req, res, next);
  },

  logoutPost: (req, res, next) => {
    if (req.user) {
      req.logout();

      req.session.destroy(() => {
        res.clearCookie("connect.sid");

        return res.status(200).json({ message: 'Logout successful' });
      });
    } else {
      return res.status(401).json({ message: 'Unexpected error' });
    }
  },
};