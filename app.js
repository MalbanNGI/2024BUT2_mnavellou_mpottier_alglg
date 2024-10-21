const express = require("express");
const session = require("express-session");

const md5 = require("md5");

const app = express();
const userModel = require("./models/user.js");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));




app.use(
  session({
    secret: "milo",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware pour rendre la session disponible dans les vues
app.use(function (req, res, next) {
  if (req.session.userId) {
    res.locals.isAuth = true;
    res.locals.id = req.session.userId;
    res.locals.name = req.session.prenomCLient; // toujours mettre le else !!!
    res.locals.role = req.session.role;
  } else {
    res.locals.isAuth = false;
    res.locals.id = null;
    res.locals.name = null;
    res.locals.role = null;
  }
  next();
});

// Routes
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/catalogue", async function (req, res) {
  try {
    const products = await userModel.show_product();
    res.render("catalogue", { products });
  } catch (error) {
    console.error("Erreur dans la liste des produits:", error);
    res.status(500).send("Erreur dans la liste des produits");
  }
});

app.get("/produit/:id", async function (req, res) {
  const productId = req.params.id;
  console.log(productId);

  try {
    const product = await userModel.show_productById(productId);
    console.log(product);
    if (product) {
      res.render("produit", { product });
    } else {
      res.status(404).render("404");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("An error occurred");
  }
});

app.get("/help", function (req, res) {
  res.render("help");
});

app.get("/validation", function (req, res) {
  res.render("validation");
});

app.get("/inscriptionadmin", function (req, res) {
  res.render("inscriptionadmin");
});
app.post("/inscriptionadmin", async function (req, res) {
  if (res.locals.isAuth) {
    try {
      let nom = req.body.name;
      let prenom = req.body.surname;
      let email = req.body.email;
      let ddn = req.body.ddn;
      let mdp = req.body.password;
      mdp = md5(mdp);

      const user = await userModel.createAgent(mdp, nom, prenom, ddn, email);
      console.log("Utilisateur créé avec succès : ", user);

      res.render("index");
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      res.status(500).send("Erreur lors de l'inscription");
    }
  } else {
    res.render("index");
  }
});

app.get("/inscription", function (req, res) {
  res.render("inscription");
});
app.post("/inscription", async function (req, res) {
  try {
    let nom = req.body.name;
    let prenom = req.body.surname;
    let email = req.body.email;
    let ddn = req.body.ddn;
    let mdp = req.body.password;
    mdp = md5(mdp);

    const user = await userModel.createClient(mdp, nom, prenom, ddn, email);
    console.log("Utilisateur créé avec succès : ", user);

    res.render("index");
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).send("Erreur lors de l'inscription");
  }
});

app.get("/compte", async function (req, res) {
  if (res.locals.isAuth) {
    try {
      const userInfos = await userModel.getUserById(res.locals.id);
      console.log("ceci est userInfos :", userInfos);
      res.render("compte", { userInfos });
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des infos utilisateur :",
        err
      );

      res.status(500).send("Erreur interne");
    }
  } else {
    res.render("connexion", { error: null });
  }
});

app.get("/delete-acount", function (req, res) {
  res.render("index");
});

app.post("/delete-account", async function (req, res) {
  try {
    const userId = res.locals.id;

    // Milo vérifie si l'utilisateur a des locations en cours !!!!!!!
    const loc = await userModel.verifResa(userId);

    if (loc.length > 0) {
      res.status(400).send("Vous ne pouvez pas supprimer votre compte, car vous avez des locations en cours. Veuillez revenir en arrière. ");
    } else {
      const user = await userModel.deleteClient(userId);
      console.log("Client supprimé avec succès", user);
      req.session.destroy(function (err) {
        if (err) return res.redirect("/");
        res.redirect("/connexion");
      });
    }
  } catch (err) {
    console.error("Erreur lors de la suppression du compte :", err);
    res.status(500).send("Erreur lors de la suppression du compte");
  }
});


app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/panier", function (req, res) {
  res.render("panier");
});

app.get("/addProduct", function (req, res) {
  res.render("addProduct", { error: null });
});
app.post("/addProduct", async function (req, res) {
  try {
      let prix = req.body.prix;
      prix = parseInt(prix)
      let type = req.body.type;
      let description = req.body.description;
      let marque = req.body.marque;
      let modele = req.body.modele;
      let etat = req.body.productCondition;
      const values = [type, description, marque, modele, prix, etat];
      console.log("ceci est values : ", values);
  
      const user = await userModel.addProduct(type, description, marque, modele, prix, etat);
      console.log("Produit créé avec succès : ", user);
  
      res.render("index");
  } catch (err) {
      console.error("Erreur lors de l'ajout du produit :", err);
      res.status(500).send("Erreur lors de l'ajout du produit");
  }
});


app.get("/connexion", function (req, res) {
  res.render("connexion", { error: null });
});

app.post("/connexion", async function (req, res) {
  let login = req.body.email;
  let mdp = req.body.password;
  mdp = md5(mdp);

  const user = await userModel.check_login(login);

  if (user && user.password === mdp) {
    req.session.userId = user.id;
    req.session.name = user.nom;
    req.session.prenomCLient = user.prenom;
    req.session.role = user.type_utilisateur; // on peut rajouter ce qu'on veut !!!!!
    return res.redirect("/");
  } else {
    res.render("connexion", { error: "Mauvais login/mdp" });
  }
});

app.get("/deconnexion", function (req, res) {
  req.session.destroy(function (err) {
    if (err) return res.redirect("/");
    res.redirect("/connexion");
  });
});

app.use(function (req, res) {
  res.status(404).render("404");
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
