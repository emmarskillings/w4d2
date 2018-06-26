
exports.up = function(knex, Promise) {
  return knex.schema.table('milestones', table => {
    table.integer('famous_person_id');
    table
      .foreign('famous_person_id')
      .references('id')
      .on('famous_people')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('milestones', table => {
    table.dropColuml('famous_person_id');
  });
};
