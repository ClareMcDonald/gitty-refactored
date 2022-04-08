const pool = require('../utils/pool');

module.exports = class User {
  username;
  photoUrl;

  constructor(row) {
    this.username = row.github_username;
    this.photoUrl = row.github_photo_url;
  }

  static insert({ username, photoUrl }) {
    return pool.query(
      `
      INSERT INTO
          users (github_username, github_photo_url)
      VALUES
          ($1, $2)
      RETURNING
          *
        `,
      [username, photoUrl]
    )
      .then(({ rows }) => new User(rows[0]));
    // const { rows } = await pool.query(
    //   `
    //     INSERT INTO
    //         users (github_username, github_photo_url)
    //     VALUES
    //         ($1, $2)
    //     RETURNING
    //         *
    //   `,
    //   [username, photoUrl]
    // );
    // return new User(rows[0]);
  }
    
  static findByUsername(username) {
    return pool.query(
      `
        SELECT
            *
        FROM
            users
        WHERE
            github_username=$1
      `,
      [username]
    )
      .then(({ rows }) => {
        if (!rows[0]) return null;
        new User(rows[0]);
      });
  }
};
// const { rows } = await pool.query(
//   `
//     SELECT
//         *
//     FROM
//         users
//     WHERE
//         github_username=$1
//   `,
//   [username]
// );
      
// if (!rows[0]) return null;
// return new User(rows[0]);
