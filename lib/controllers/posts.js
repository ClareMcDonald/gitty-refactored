const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
    
  .get('/', authenticate, (req, res, next) => {
    Post.getAll({
      ...req.body
    })
      .then((post) => res.send(post))
      .catch((error) => next(error));
    // try {
    //   const post = await Post.getAll(req.body);
    //   res.send(post);
    // } catch (error) {
    //   next(error);   
    // }
  })
    
  .post('/', authenticate, async (req, res, next) => {
    Post.insert({
      ...req.body,
      username: req.user.username
    })
      .then((post) => res.send(post))
      .catch((error) => next(error));
    
    // try {
    //   const post = await Post.insert({
    //     ...req.body,
    //     username: req.user.username
    //   });  
    //   res.send(post);
    // } catch (error) {
    //   next(error);
    // }
  });
