const pool = require('../utils/pool');

module.exports = class Quote {
  author;
  content;

  constructor(row) {
    this.author = row.author;
    this.content = row.content;
  }

  static getAll() {
    return pool.query(
      `
      SELECT
        *
      FROM
        quotes
      `
    )
      .then(({ rows }) => rows.map((row) => new Quote(row)));
  }
};
