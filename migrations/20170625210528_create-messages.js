exports.up = function (knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments()
    table.integer('from_id').references('users.id')
    table.integer('to_id').references('users.id')
    table.string('text')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('messages')
}
