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

async function getUserById (name) {
    sql = "SELECT * FROM utilisateur WHERE name = ?"; // ? = la variable 1 ici id
    return new Promise((resolve, reject) => {
        bdd.query(sql, name, (err, results) => {  // test avec [id]
           if (err) {
            return reject(err)
           }
           resolve(results);

        });
    });   
};


async function getAllUsers () {
    sql = "SELECT * FROM utilisateur"; 
    return new Promise((resolve, reject) => {
        bdd.query(sql,(err, results) => {  // test avec [id]
           if (err) {
            return reject(err)
           }
           resolve(results);

        });
    });   
};



module.exports = { getUserById, getAllUsers};