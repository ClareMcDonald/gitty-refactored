// I ultimately could have gotten the code working this way, but it is a lot of repeated code, and creates more work for myself. The way I wrote the quotes controller is instead of this service, and is a dry way to write the code.

// const fetch = require('cross-fetch');

// module.exports = class QuoteService {
//   static getQuotes() {
//     const programmingData = fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
//       .then((programmingResp) => programmingResp.json())
//       .then((programmingQuote) => ({
//         author: programmingData.author,
//         content: programmingData.en
//       }));
      
//     const futuramaData = fetch('https://futuramaapi.herokuapp.com/api/quotes/1')
//       .then((futuramaResp) => futuramaResp.json())
//       .then((futuramaQuote) => ({
//         author: futuramaData[0].character,
//         content: futuramaData[0].quote
//       }));

//     const randomData = fetch('');
    
//     const quotes = [programmingQuote, futuramaQuote, randomQuote];
//     return quotes;
//   }
// };
