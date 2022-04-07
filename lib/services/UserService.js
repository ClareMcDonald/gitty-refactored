const User = require('../models/User');
const { exchangeCodeForToken, getUserProfile } = require('../utils/github');

module.exports = class UserService {
  static create(code) {
    let githubProfile;
    return exchangeCodeForToken(code)
      .then((token) => getUserProfile(token))
      .then((profile) => {
        githubProfile = profile;
        return User.findByUsername(profile.username);
      })
      .then((user) => {
        if (!user) {
          return User.insert(githubProfile);
        } else {
          return user;
        }
      });
  }
};
// static async create(code) {
//   const token = await exchangeCodeForToken(code);
    
//   const { username, photoUrl } = await getUserProfile(token);
    
//   let user = await User.findByUsername(username);

//   if (!user) {
//     user = await User.insert({ username, photoUrl });

//   }
//   return user;
// }
