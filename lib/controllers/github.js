const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const User = require('../models/User');
const UserService = require('../services/UserService');
const { sign } = require('../utils/jwt');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`);
  })

  .get('/login/callback', (req, res, next) => {
    UserService.create(req.query.code)
      // we don't need the below code, but we can have it! We're returning the user from line 15, naming it on line 17, saying hi, and passing it along to the next .then
      // .then((user) => {
      //   console.log('HEEEEEY');
      //   return user;
      // })
      .then((user) => {
        res.cookie(process.env.COOKIE_NAME, sign(user), { HTTPOnly: true, maxAge: ONE_DAY_IN_MS }).redirect('/api/v1/posts');
      })
      .catch((error) => next(error));
  //   try {
  //     const user = await UserService.create(req.query.code);

  //     res
  //       .cookie(process.env.COOKIE_NAME, sign(user), {
  //         httpOnly: true,
  //         maxAge: ONE_DAY_IN_MS
  //       })
  //       .redirect('/api/v1/posts');
  //   } catch (error) {
  //     next(error);   
  //   }
  })
    
//   .get('/verify', authenticate, (req, res, next) => {
//     res.send(req.user);
//   })
    
  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully' });
  });
