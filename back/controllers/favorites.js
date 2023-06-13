const database = require('./database');

module.exports = {
    getFav: async function(req, res, next){
        console.log('get favorites');
        const sql =  `SELECT favorites.*, cards.itemID, cards.title, cards.description, cards.photo FROM favorites INNER JOIN users ON favorites.id = users.id INNER JOIN cards ON favorites.itemID = cards.itemID WHERE users.id = ?;`;
           console.log(req.query.id);
        try {
                  
            const result = await database.query(sql, [
                req.query.id,
                // req.body.itemID,
                        
            ]);

            //res.status(200).send('Succsessfuly add to favorites!')
          if (result.length>0) res.json(result[0]) ;
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send('error get favorites');
        }
    },

    addToFav: async function (req, res, next) {
        console.log(req.body);
                const sql =  `INSERT INTO favorites (id, itemID) VALUES(?,?)`;
               
                try {
                  
                    const result = await database.query(sql, [
                        req.body.id,
                        req.body.itemID,
                                
                    ]);
        
                    //  res.status(200).send('Succsessfuly add to favorites!')
                    res.json({
                        // id: result[0].insertId,
                        // title: value.title,
                        // description: value.description,
                        // photo: value.photo,
        
                    })
                }
                catch (err) {
                    console.log(err.message);
                    if(err.message.startsWith("Duplicate entry")) res.status(409).send("Item already in favorites");
                    else res.status(400).send('error add to favorites');
                }
            },
            
    deleteFromFav: async function (req, res, next) {
                const sql =  `DELETE FROM favorites WHERE id=? AND itemID=?`;
               
                try {
                    const result = await database.query(sql, [
                        req.body.id,
                        req.body.itemID,
                                
                    ]);
        
                    res.json({});
                }

                catch (err) {
                    console.log(err.message);
                    res.status(400).send('error delete from favorites');
                }
            }
}