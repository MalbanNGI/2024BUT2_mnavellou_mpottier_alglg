const bdd = require("./database.js");

async function getUserById (id) {
    sql = "SELECT * FROM utilisateur WHERE id = ?"; // ? = la variable 1 ici id
    return new Promise((resolve, reject) => {
        bdd.query(sql, id, (err, results) => {  // test avec [id]
           if (err) {
            return reject(err)
           }
           resolve(results);

        });
    });   
};


module.exports = { getUserById};