const settings = require("./settings");
const pg = require("pg");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  },
});

let firstName = process.argv[2].toString();
let lastName = process.argv[3].toString();
let DOB = process.argv[4].toString();

knex('famous_people').insert({'first_name': firstName, 'last_name': lastName, 'birthdate': DOB}).then(function (result) {
  console.log(result);
  knex.destroy();
})

console.log(firstName, lastName, DOB);