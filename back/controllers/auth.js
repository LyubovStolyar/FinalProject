const jwt = require("jsonwebtoken");
const config = require("../config/dev");
const joi = require("joi");
const database = require("./database");
const bcrypt = require("bcrypt");

module.exports = {
  login: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      email: joi
        .string()
        .required()
        .min(6)
        .max(255)
        .email()
        .regex(/^\w+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/),
      password: joi
        .string()
        .min(8)
        .regex(/(.*\d.*){4,}/)
        .regex(/[A-Z]/)
        .regex(/[a-z]/)
        .regex(/([!@#$%^&*-_])/)
        .required(),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      console.log(error.details[0].message);
      res.status(401).send("Unauthorized");
      return;
    }

    const sql = "SELECT * FROM users WHERE email=?;";

    try {
      const result = await database.query(sql, [value.email]);
      const user = result[0][0];

      const validPassword = await bcrypt.compare(value.password, user.password);
      if (!validPassword) throw "Invalid password";

      const param = { email: value.email };
      const token = jwt.sign(param, config.JWT_SECRET, { expiresIn: "72800s" });
      userName = user.name;
      userRole = user.role;
      id = user.id;

      res.json({
        token: token,
        email: user.email,
        userName: user.name,
        userRole: user.role,
        id: user.id,
      });
   
    } catch (err) {
      console.log(`Error: ${err}`);
      res.status(401).send("Unauthorized");
      return;
    }
  },

  registerUser: async function (req, res, next) {
    const schema = joi.object({
      name: joi.string().required().min(2).max(50),
      email: joi.string().required().min(6).max(255).email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$ /),
      password: joi.string().min(8).regex(/^[a-zA-Z]+[\d{4}]+[!@#$%^&*-_*)]/).required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(400).send("error sign up new user");
      return;
    }

    const sql = `INSERT INTO users (name, email, password) VALUES(?,?,?)`;

    try {
      const password = await bcrypt.hash(value.password, 10);
      const result = await database.query(sql, [
        value.name,
        value.email,
        password,
      ]);

      res.json({
        id: result[0].insertId,
        name: value.name,
        email: value.email,
      });
    } catch (err) {
      console.log(err.message);
      res.status(400).send("error sign up new user");
    }
  },
};
