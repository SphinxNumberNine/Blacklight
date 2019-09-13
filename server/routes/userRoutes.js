// this file will be used for anything regarding user data.
// this includes, but is not limited to, registration, editing details, changing password, etc
// all functions defined in this file require authentication, with the exception of registration

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = mongoose.model('users');

module.exports = app => {
  app.post('/api/register_user', async (req, res) => {
    let hashedPass = bcrypt.hashSync(req.body.password.toString(), 10);
    const newUser = await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPass
    }).save();

    res.status(200).json({
      user: newUser,
      message: 'user saved'
    });
  });

  app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        keys.HASH_KEY.toString()
      );
      res.status(200).json({
        message: 'logged in as ' + user.firstName + ' ' + user.lastName,
        token
      });
    } else {
      res.status(401).json({
        message: 'unauthorized'
      });
    }
  });

  app.post('/api/update_user', async (req, res) => {
    // validate user
    try {
      jwt.verify(req.body.token, keys.HASH_KEY);
    } catch (err) {
      res.status(401).json({ message: unauthorized });
    }

    const id = req.body.id;
    var user = await User.findById(id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save();

    res.status(200).json({
      user,
      message: 'user updated'
    });
  });
};
