const database = require('./database');
const joi = require('joi');
const bcrypt = require("bcrypt");


module.exports = {
    getUser: async function (req, res, next) {
        const sql = `SELECT * FROM users;`; // ORDER BY name ASC;`;
        console.log(sql);
        try {
            const result = await database.query(sql);
            res.json(result[0]);

        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    },

    registerUser: async function (req, res, next) {
        const schema = joi.object({
            name: joi.string().required().min(2).max(50),
            email: joi.string().required().min(6).max(255).email().regex(/^\w+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/),
            phone: joi.string().required().min(8).max(10),
            password: joi.string().min(8)
               .regex(/(.*\d.*){4,}/).regex(/[A-Z]/).regex(/[a-z]/).regex(/([!@#$%^&*-_])/).required(),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).send('error sign up new customer');
            return;
        }

        const sql = `INSERT INTO users (name, email, phone, password) VALUES(?,?,?,?)`;

        try {
            const hash = await bcrypt.hash(value.password, 10);
            const result = await database.query(sql, [
                value.name,
                value.email,
                value.phone,
                hash
            ]);

            res.json({
                id: result[0].insertId,
                name: value.name,
                email: value.email,
                phone: value.phone,
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send('error sign up new customer');
        }
    },
    // updateCustomer: async function (req, res, next) {
    //     const schema = joi.object({
    //         first_name: joi.string().required().min(2).max(50),
    //         last_name: joi.string().required().min(2).max(50),
    //         email: joi.string().required().email().min(6).max(255),
    //         phone: joi.string().required().min(7).max(13),
    //         id: joi.required()
    //     });

    //     const { error, value } = schema.validate(req.body);

    //     if (error) {
    //         console.log(error.details[0].message);
    //         res.status(400).send('error sign up new customer');
    //         return;
    //     }

    //     const sql = `UPDATE customers SET first_name='${value.first_name}', last_name='${value.last_name}', email='${value.email}', phone='${value.phone}' WHERE id=${value.id}`;

    //     try {
   
    //         const result = await database.query(sql
    //         //     , 
    //         //     [
    //         //     value.first_name,
    //         //     value.last_name,
    //         //     value.email,
    //         //     value.phone,
    //         // ]
    //         );

    //         res.json({
    //             id: value.id,
    //             first_name: value.first_name,
    //             last_name: value.last_name,
    //             email: value.email,
    //             phone: value.phone,
    //         })
    //     }
    //     catch (err) {
    //         console.log(err.message);
    //         res.status(400).send('error update customer');
    //     }
    // },

    // deleteCustomer: async function (req, res, next) {
      
    //     const sql = `DELETE FROM customers WHERE id=?;` 
    //     console.log(sql);
    //     try {
    //         const result = await database.query(sql, req.params.id);
    //         res.json(result[0]);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         res.json(err);
    //     }
    // },
  
}