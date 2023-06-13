const database = require("./database");
const joi = require("joi");

module.exports = {
  addItem: async function (req, res, next) {

    const schema = joi.object({
      itemID: joi.allow(null, ''),
      title: joi.string().required().min(2).max(50),
      description: joi.string().required().min(6).max(300),
      photo: joi.any().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(400).send("error add new item");
      return;
    }
    console.log("id", value.itemID);

    try {
       let sql = '';
 
      if (value.itemID) {
        sql = `UPDATE cards SET title='${value.title}', description='${value.description}', photo='${value.photo}' WHERE itemID='${value.itemID}'`;
       
      } else {
        sql = `INSERT INTO cards (title, description, photo) VALUES(?,?,?)`;

      }
      const result = await database.query(sql, [
        value.title,
        value.description,
        value.photo,
        value.itemID,
      ]);

      res.json({
        id: result[0].insertId,
        title: value.title,
        description: value.description,
        photo: value.photo,
      });
    } catch (err) {
      console.log(err.message);
      res.status(400).send("error add new item");
    }
  },

  getItems: async function (req, res, next) {

    const sql = `SELECT * FROM cards;`; // ORDER BY name ASC;`;

    try {
      const result = await database.query(sql);
      res.json(result[0]);
    } catch (err) {
      console.log(err);
      res.json(err);
    }

    // const sql2 = "SELECT * FROM favorites WHERE id=?;"


  },
};
