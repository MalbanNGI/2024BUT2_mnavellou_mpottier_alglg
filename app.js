// gere les root //

const express = require("express");
// const session = require("express-session");
const app = express();
const userModel = require("./models/user.js");

app.set("view engine", "ejs");

app.use(express.static("public"));

// app.use((req, res, next) => {
//   if (req.session && req.session.login) {
//     res.locals.isLoggedIn = true;
//     res.locals.login = req.session.login;
//     res.locals.role = req.session.role;
//     res.locals.nom = req.session.nom;
//   } else {
//     res.locals.isLoggedIn = false;
//   }
//   next();
// });

// app.use(
//   session({
//     secret: "MILO",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // À true si vous avez un HTTPS
//   })
// );
// // test session 
// app.get('/test-session', (req, res) => {
//     res.send(res.locals);
//   });

// Liens vers les différentes pages

app.get("/", function (req, res) {
  // exemple     async si await
  res.render("index");
});
app.get("/index", function (req, res) {
  res.render("index");
});

app.get("/catalogue", function (req, res) {
  //
  res.render("catalogue");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/inscription", function (req, res) {
  res.render("inscription");
});
app.get("/connexion", function (req, res) {
  res.render("connexion");
});

app.get("/test", async function (req, res) {
  // {param}
  try {
    const user = await userModel.getAllUsers(); // chiffre a recup normalement
    res.render("testing", { user });
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la recu des données !");
  }
});

// Données de session
app.get("/set-session/:name", async function (req, res) {
  // Correction du paramètre
  try {
    // Récupération de l'utilisateur par nom depuis la variable name
    const user = await userModel.getUserByName(req.params.name);

    if (user && user.length > 0) {
      // Vérifie si un utilisateur a été trouvé
      const userData = user[0]; // Supposons qu'il n'y ait qu'un utilisateur dans le tableau
      req.session.login = userData.login;
      req.session.role = userData.type_utilisateur;
      req.session.nom = userData.nom;

      // Rendre la vue 'index' avec les données utilisateur
      res.render("index", { user: userData });
      console.log(userData);
    } else {
      res.status(404).send("Utilisateur non trouvé");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données !");
  }
});

// Route pour récupérer la variable de session
app.get("/get-session", (req, res) => {
  if (req.session.login && req.session.role && req.session.nom) {
    // Renvoyer un objet avec toutes les informations de session
    res.json({
      login: req.session.login,
      role: req.session.role,
      nom: req.session.nom,
    });
  } else {
    res.send("Aucune session définie.");
  }
});

app.use(function (req, res) {
  res.status(404).render("404");
});


app.listen(3000, function () {
  console.log("Server running on port 3000");
});

