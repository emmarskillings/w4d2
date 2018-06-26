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
let queryParam = getArgument()
let index = 1;
knex.select('first_name', 'last_name', 'birthdate').from('famous_people').where('first_name', queryParam).orWhere('last_name', queryParam).then(function(result) {
  for (let i = 0; i < result.length; i++) {
      console.log('Searching ...');
      index += 1;
      var birthdayString = result[i].birthdate.toString()
      var year = birthdayString.slice(11, 15)
      var month = birthdayString.slice(4, 7)
      var day = birthdayString.slice(8, 10);
      console.log('-' + (i + 1) + ': ' + result[i].first_name + ' ' + result[i].last_name + ', born ' + year + '-' + month + '-' + day);
  }
  knex.destroy();
});

function getArgument() {
  return process.argv.slice(2).toString();
}