const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Quote = require('../models/Quote');
const QuoteService = require('../services/QuoteService');

module.exports = Router()
  .get('/api/v1/quotes', (req, res, next) => {
    QuoteService.create()
})