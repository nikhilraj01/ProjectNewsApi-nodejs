var md5 = require("md5");

module.exports = [
  {
    email: "user1@indmail",
    password: "passwordind",
    key: md5("user1@indmailpasswordind"),
  },
  {
    email: "user2@ausmail",
    password: "passwordaus",
    key: md5("user2@ausmailpasswordaus"),
  },
  {
    email: "user3@usmail",
    password: "passwordus",
    key: md5("user3@usmailpasswordus"),
  },
];
