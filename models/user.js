const bdd = require("./database.js");

async function getUserByName(name) {
    sql = "SELECT * FROM utilisateur WHERE name = ?"; // ? = la variable 1 ici id
    return new Promise((resolve, reject) => {
        bdd.query(sql, name, (err, results) => {
            // test avec [id]
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function getAllUsers() {
    sql = "SELECT * FROM utilisateur";
    return new Promise((resolve, reject) => {
        bdd.query(sql, (err, results) => {
            // test avec [id]
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function getUserById(id) {
    console.log("ceci est l'id envoyé dans la fonction getUserById :", id);
    const sql = "SELECT * FROM utilisateur WHERE id = ?"; // ? = la variable 1 ici id
    return new Promise((resolve, reject) => {
        bdd.query(sql, [id], (err, results) => {
            // Le paramètre doit être passé comme un tableau
            if (err) {
                return reject(err);
            }
            resolve(results[0]); // Résoudre la première ligne des résultats
        });
    });
}

async function check_login(mailing) {
    sql = "SELECT * FROM utilisateur WHERE email = ?"; // ? = la variable 1 ici id
    return new Promise((resolve, reject) => {
        bdd.query(sql, mailing, (err, results) => {
            // test avec [id]
            if (err) {
                return reject(err);
            }
            console.log("ceci est results", results);
            resolve(results[0]);
        });
    });
}

async function show_product() {
    const sql = "SELECT * FROM produit";
    return new Promise((resolve, reject) => {
        bdd.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results); // Return all products, not just the first one
        });
    });
}

async function show_productById(id) {
    const sql = "SELECT * FROM produit WHERE id = ?";
    return new Promise((resolve, reject) => {
        bdd.query(sql, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]); // Return the first (and only) product result
        });
    });
}

async function createClient(mdp, nom, prenom, ddn, email) {
    const login = prenom[0] + nom;
    const sql =
        "INSERT INTO utilisateur (login, password, nom, prenom, ddn, email, type_utilisateur) VALUES (?, ?, ?, ?, ?, ?, 'client')";
    const values = [login, mdp, nom, prenom, ddn, email];

    return new Promise((resolve, reject) => {
        bdd.query(sql, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function createAgent(mdp, nom, prenom, ddn, email) {
    const login = prenom[0] + nom;
    const sql =
        "INSERT INTO utilisateur (login, password, nom, prenom, ddn, email, type_utilisateur) VALUES (?, ?, ?, ?, ?, ?, 'agent')";
    const values = [login, mdp, nom, prenom, ddn, email];

    return new Promise((resolve, reject) => {
        bdd.query(sql, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function addProduct(type, description, marque, modele, prix, etat) {

    const sql =
        "INSERT INTO produit (type, description, marque, modele, prix_location, etat, image) VALUES (?, ?, ?, ?, ?, ?, 'on ne sait pas comment ajouter des images extérieurs :(')";
    const values = [type, description, marque, modele, prix, etat];
    return new Promise((resolve, reject) => {
        bdd.query(sql, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}
async function deleteClient(userId) {
    const sql = "DELETE FROM utilisateur WHERE id = ?";

    return new Promise((resolve, reject) => {
        bdd.query(sql, [userId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}


  async function verifResaClient(userId) {
    const sql = "SELECT * FROM utilisateur U JOIN location L ON U.id = L.utilisateur_id WHERE L.utilisateur_id = ?";

    return new Promise((resolve, reject) => {
        bdd.query(sql, [userId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function verifResaProduct(id) {
    const sql = "SELECT * FROM produit P JOIN location L ON P.id = L.produit_id WHERE L.produit_id = ?"; 
    const values = [id];

    return new Promise((resolve, reject) => {
        bdd.query(sql, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function deleteProduct(id) {
    const sql = "DELETE FROM produit WHERE id = ?";
    const values = [id];

    return new Promise((resolve, reject) => {
        bdd.query(sql, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

  

module.exports = {
    getUserById,
    getAllUsers,
    getUserByName,
    check_login,
    show_productById,
    show_product,
    createClient,
    createAgent,
    addProduct,
    deleteClient,
    verifResaClient,
    verifResaProduct,
    deleteProduct
};
