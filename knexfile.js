module.exports = {
  test: {
    client: 'pg',
    connection: {
      database: 'messenger_test'
    }
  },
  development: {
    client: 'pg',
    connection: {
      database: 'messenger_development'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
