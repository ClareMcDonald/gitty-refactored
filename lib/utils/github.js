const fetch = require('cross-fetch');
const { response } = require('express');

const exchangeCodeForToken = (code) => {
  fetch('https://github.co/login/oauthk/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
    })
  })
    .then((access_token) => response.json(access_token));
  
  // const resp = await fetch('https://github.co/login/oauthk/access_token', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     client_id: process.env.CLIENT_ID,
  //     client_secret: process.env.CLIENT_SECRET,
  //     code
  //   })
  // });
  // const { access_token } = await resp.json();
  // return access_token;
};

const getUserProfile = (token) => {
  const profileResp = fetch('https://api.github.com/user', {
    headers: {
      Authorizaton: `token ${token}`
    }
  })
    .then(({ avatar_url, login }) => profileResp.json({ avatar_url, login }));
  
  // const profileResp = await fetch('https://api.github.com/user', {
  //   headers: {
  //     Authorizaton: `token ${token}`
  //   }
  // });

  // const { avatar_url, login } = await profileResp.json();
  // return { username: login, photoUrl: avatar_url };

};

module.exports = { exchangeCodeForToken, getUserProfile };
