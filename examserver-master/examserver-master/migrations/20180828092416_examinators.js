
exports.up = (knex, Promise) => {
    return knex.schema.createTable('Examinators', table => {
        table.increments();
        table.string('name');
        table.string('password').notNullable();
        table.string('email').unique().notNullable();
        table.string('phoneNr');
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('Examinators');
};
