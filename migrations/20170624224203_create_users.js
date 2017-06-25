exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.timestamps()
    table.string('username')
    table.string('password_hash')
    table.unique('username')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
