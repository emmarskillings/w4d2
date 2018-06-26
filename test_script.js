const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function getArgument() {
  return process.argv.slice(2).toString();
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  let queryParam = getArgument()
  client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1 OR last_name = $1", [queryParam], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    for (let i = 0; i < result.rows.length; i++) {
      var birthdayString = result[i].birthdate.toString()
      var year = birthdayString.slice(11, 15)
      var month = birthdayString.slice(4, 7)
      var day = birthdayString.slice(8, 10);
      console.log((i + 1) + ': ' + result[i].first_name + ' ' + result[i].last_name + ', born ' + year + '-' + month + '-' + day);
    }
    client.end();
  });
});
