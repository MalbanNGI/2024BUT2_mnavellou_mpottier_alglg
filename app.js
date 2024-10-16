const express = require("express");
const session = require("express-session");
const md5 = require("md5");
const app = express();
const userModel = require("./models/user.js");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'milo',
  resave: false,
  saveUninitialized: false
}));

// Middleware pour rendre la session disponible dans les vues
app.use(function (req, res, next) {
  if (req.session.userId){
    
    res.locals.isAuth = true;
    res.locals.id = req.session.userId;
    res.locals.name = req.session.userId; // toujours mettre le else !!!
  }
  else {
    res.locals.isAuth = false;
    res.locals.id = null;
    res.locals.name = null; 
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

app.get("/compte", function (req, res) {
  if(res.locals.isAuth) {
    res.render("compte");
  }
  else {
    res.render("/")
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

