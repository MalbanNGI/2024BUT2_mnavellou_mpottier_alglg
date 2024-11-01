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
    const sql = "SELECT * FROM utilisateur U JOIN location L ON U.id = L.utilisateur_id WHERE L.utilisateur_id = ? AND L.status = 'progress'";

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
    const sql = "SELECT * FROM produit P JOIN location L ON P.id = L.produit_id WHERE L.produit_id = ? AND L.status = 'progress'"; 
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

async function verifResaProductByDate(id, date) {
    const sql = "SELECT * FROM produit P JOIN location L ON P.id = L.produit_id WHERE L.produit_id = ? AND L.status = 'progress' AND date"; 
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

async function updateUser(id, nom, prenom, password, ddn, email) {
    const sql = "UPDATE utilisateur SET nom = ?, prenom = ?, password = ?, ddn = ?, email = ? WHERE id = ?";
    const values = [nom, prenom, password, ddn, email, id];
  
    return new Promise((resolve, reject) => {
      bdd.query(sql, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
  

  async function HowManyDaysWhenPrice(idProduct, idClient) {
    const sql = "SELECT * FROM utilisateur U JOIN location L ON U.id = L.utilisateur_id JOIN produit P ON L.produit_id = P.id WHERE P.id = ? AND U.id = ?"; //  AND L.date_retour_effective IS NOT NULL
    const values = [idProduct, idClient];

    return new Promise((resolve, reject) => {
        bdd.query(sql, values, (err, results) => {
            if (err) {
                return reject(err);
            }

            if (results.length > 0) {
                const { date_debut, date_retour_prevue} = results[0];

                const dateDebut = new Date(date_debut);
                const dateRetourEffective = new Date(date_retour_prevue);
                const timeDiff = Math.abs(dateRetourEffective - dateDebut); // fonction qui calcule le nb de jours entre les 2 dates
                const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                resolve( diffDays);
            } else {
                resolve(null); 
            }
        });
    });
};

function calculateTotalPrice(nbjours, basePrice) {
    let totalPrice = 0;

    if (nbjours <= 3) {
        totalPrice = basePrice; // les 3 premiers jours sont egals au prix de base de location
    } else if (nbjours > 3 && nbjours <= 7) {
        totalPrice = basePrice + (basePrice * 0.04 * (nbjours - 3));
    } else if (nbjours > 7 && nbjours <= 14) {
        totalPrice = basePrice + (basePrice * 0.04 * 4) + (basePrice * 0.02 * (nbjours - 7));
    } else if (nbjours > 14 && nbjours <= 30) {
        totalPrice = basePrice + (basePrice * 0.04 * 4) + (basePrice * 0.02 * 7) + (basePrice * 0.01 * (nbjours - 14));
    }

    // si ya plus de 7 jours on enleve 10%
    if (nbjours > 7) {
        totalPrice *= 0.9;
    }

    // si ya plus de 30 jours on rajoute 20%
    if (nbjours > 30) {
        totalPrice += basePrice * 0.2;
    }
    // Milo arrondi ! 
    return Math.round(totalPrice * 100) / 100; // on arrondi pour facilité l'affichage
}


async function addPanier(idProduct, idClient, dateDebut, dateRetourPrevue) {
    const sql = `
      INSERT INTO location (produit_id, utilisateur_id, date_debut, date_retour_prevue, status)
      VALUES (?, ?, ?, ?, 'progress')
    `;
    
    const values = [idProduct, idClient, dateDebut, dateRetourPrevue];
  
    return new Promise((resolve, reject) => {
      bdd.query(sql, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
};

 
  async function VerifDateDeResa(idProduct, dateDebut, dateRetourPrevue) {
    const sql = `
      SELECT * FROM location
      WHERE produit_id = ?
      AND (
        (date_debut <= ? AND date_retour_prevue >= ?)  -- Si la nouvelle date de début est comprise dans une location existante
        OR
        (date_debut <= ? AND date_retour_prevue >= ?)  -- Si la nouvelle date de fin est comprise dans une location existante
        OR
        (date_debut >= ? AND date_retour_prevue <= ?)  -- Si la nouvelle location est totalement incluse dans une location existante
      )
    `;
  
    const values = [
      idProduct, 
      dateDebut, dateDebut,  // Vérification de la date de début
      dateRetourPrevue, dateRetourPrevue,  // Vérification de la date de retour
      dateDebut, dateRetourPrevue  // Vérification si les dates sont incluses dans une location existante
    ];
  
    return new Promise((resolve, reject) => {
      bdd.query(sql, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        // Si le résultat est vide, cela signifie que les dates ne sont pas chevauchées et donc disponibles
        if (results.length > 0) {
          resolve(false);  // Les dates sont déjà prises
        } else {
          resolve(true);  // Les dates sont disponibles
        }
      });
    });
  };

  async function showPanier(idClient) {
    const sql = `
      SELECT * FROM location WHERE utilisateur_id = ? 
    `;
    const values = [idClient];
  
    return new Promise((resolve, reject) => {
      bdd.query(sql, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
};
  
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
    deleteProduct,
    updateUser,
    verifResaProductByDate,
    HowManyDaysWhenPrice,
    calculateTotalPrice,
    addPanier,
    VerifDateDeResa,
    showPanier
};
