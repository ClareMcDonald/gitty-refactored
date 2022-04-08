const { Router } = require('express');
const QuoteService = require('../services/QuoteService');

module.exports = Router()
  .get('/api/v1/quotes', (req, res, next) => {
    QuoteService.get()
      .then((quotes) => res.send(quotes))
      .catch((error) => next(error));
  });
