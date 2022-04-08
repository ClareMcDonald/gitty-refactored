const fetch = require('cross-fetch');

module.exports = class QuoteService {
  static async getQuotes() {
    const programmingResp = await fetch('https://programming-quotes-api.herokuapp.com/quotes/random');
    const programmingData = await programmingResp.json();
    const programmingQuote = {
      author: programmingData.author,
      content: programmingData.en
    };
      
    const futuramaResp = await fetch('https://futuramaapi.herokuapp.com/api/quotes/1');
    const futuramaData = await futuramaResp.json();
    const futuramaQuote = {
      author: futuramaData[0].character,
      content: futuramaData[0].quote
    };
      
    const randomResp = await fetch('https://api.quotable.io/random');
    const randomData = await randomResp.json();
    const randomQuote = {
      author: randomData.author,
      content: randomData.content
    };
    
    const quotes = [programmingQuote, futuramaQuote, randomQuote];
    return quotes;
  }
};
