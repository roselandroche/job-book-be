exports.up = async function(knex) {
  await knex.schema.createTable("users", table => {
    table.increments("id");
    table
      .string("username", 128)
      .notNull()
      .unique();
    table.string("password", 128).notNull();
    table
      .string("email")
      .notNull()
      .unique();
  });

  await knex.schema.createTable("jobPosts", table => {
    table.increments("id");
    table
      .string("jobTitle")
      .notNull()
      .unique();
    table.string("url").notNull();
    table
      .integer("users_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("jobPosts");
  await knex.schema.dropTableIfExists("users");
};
