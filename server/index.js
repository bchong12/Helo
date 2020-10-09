require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const ctrl = require("./Controllers");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db is connected");
});

app.use(express.json());

app.post("/auth/register", ctrl.register);
app.post("/auth/login", ctrl.login);
app.post("/auth/logout", ctrl.logout);
app.get("/api/auth/me", ctrl.currentUser);

app.listen(SERVER_PORT, console.log(`The server is running on ${SERVER_PORT}`));
