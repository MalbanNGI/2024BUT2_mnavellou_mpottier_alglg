const bdd = require("./database.js");


async function getUserByName (name) {
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


async function check_login (mailing) {
    sql = "SELECT * FROM utilisateur WHERE email = ?"; // ? = la variable 1 ici id
    return new Promise((resolve, reject) => {
        bdd.query(sql, mailing, (err, results) => {  // test avec [id]
           if (err) {
            return reject(err)
           }
           console.log("ceci est results", results)
           resolve(results[0]);

        });
    });   
};



module.exports = { getUserById, getAllUsers, getUserByName, check_login};