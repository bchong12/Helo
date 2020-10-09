const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body,
      db = req.app.get("db");

    const existingUser = await db.users.check_user({ username });

    if (existingUser[0]) {
      return res.status(400).send("Username already exists");
    }

    const salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt);

    const newUser = await db.users.register_user({ username, password: hash });

    req.session.user = newUser[0];

    res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    const { username, password } = req.body,
      db = req.app.get("db");

    const result = await db.users.check_user({ username });
    const existingUser = result[0];

    if (!existingUser) {
      return res.status(400).send("User does not exist");
    }

    const authenticated = bcrypt.compareSync(password, existingUser.password);

    if (!authenticated) {
      res.status(400).send("Password is incorrect");
    }

    delete existingUser.password;

    req.session.user = existingUser;

    res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();

    res.sendStatus(200);
  },
  currentUser: (req, res) => {
    return res.status(200).send(req.session.user);
  },
};
