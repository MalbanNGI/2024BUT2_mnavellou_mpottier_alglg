// gere les root //

const express = require("express");
const session = require("express-session");
const md5 = require("md5");
const app = express();
const userModel = require("./models/user.js");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: 'milo',
  resave: false,
  saveUninitialized: false
}))


// Liens vers les différentes pages

app.get("/", async function (req, res) {
  if(!req.session.userId) { // le ! veut dire : req.session.userId == false
    return res.redirect("/connexion"); // verif si l'accès est okay !!!!!! 
  }
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

app.get("/produit", function (req, res) { // chemin vers la page produit
  res.render("produit");
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


// connexion utilisateurs 
app.get("/connexion", function (req, res) {
  res.render("connexion", {error: null});
});
app.post("/connexion", async function (req, res) {
  let login = req.body.email;
  let mdp = req.body.password;
  mdp = md5(mdp);
  const user = await userModel.check_login(login);
  if(user != false && user.password == mdp) { 
    req.session.userId = user.id;  // Récupère les données
    req.session.role = user.type_utilisateur;
    return res.redirect("/");
  }
  else {
    res.render("login", {error: "Mauvais login/mdp"});
  }
});


// 
app.use(function (req, res) {
  res.status(404).render("404");
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
