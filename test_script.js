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
      let birthdayString = result.rows[i].birthdate.toString()
      let birthday = birthdayString.slice(0, 16);
      console.log((i + 1) + ': ' + result.rows[i].first_name + ' ' + result.rows[i].last_name + ', born ' + birthday);
    }
    client.end();
  });
});

module.exports = {
  client
};