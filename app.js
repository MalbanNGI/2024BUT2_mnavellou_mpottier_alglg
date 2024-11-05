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

app.get("/commandes-client", async function (req, res) {
  if (res.locals.role == "client") {
    try {
      const userId = res.locals.id;
      const panier = await userModel.showCommandesPRO(userId);
      const panier2 = await userModel.showCommandesEND(userId);
      res.render("commandes-client", { panier, panier2 });
    } catch (error) {
      console.error("Erreur dans la liste des produits:", error);
      res.status(500).send("Erreur dans la liste des produits");
    }
  }
  else {
    res.render("index");
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

app.get("/delete-product/:id", async function (req, res) {
  try {
    const idProduct = req.params.id;
    console.log(idProduct);

    // Vérification des locations en cours pour ce produit
    const loc = await userModel.verifResaProduct(idProduct);
    console.log("res de idProduct", loc);
    console.log("longueur de loc", loc.length);

    if (loc.length > 0) {
      // Si le produit est en cours de location, envoyer une erreur
      return res
        .status(400)
        .send(
          "Vous ne pouvez pas supprimer ce produit car il est actuellement loué."
        );
    } else {
      console.log("Apres le else");
      // Si aucune location n'est en cours, supprimer le produit
      const product = await userModel.deleteProduct(idProduct);
      console.log("Produit supprimé avec succès", product);

      // Récupérer la liste des produits après suppression et rendre la vue
      const products = await userModel.show_product();
      return res.render("catalogue", { products });
    }
  } catch (err) {
    console.error("Erreur lors de la suppression du produit :", err);
    return res.status(500).send("Erreur lors de la suppression du produit.");
  }
});

app.get("/help", function (req, res) {
  res.render("help");
});

app.get("/delete-commande", function (req, res) {
  res.render("index");
});
app.get("/accept-commande", function (req, res) {
  res.render("index");
});

app.post("/accept-commande", async function (req, res) {
  try {
    let idProduct = req.body.id_product;
    let idUser = req.body.id_user;
    const user = await userModel.acceptCommande(idProduct, idUser);
    const locations_wait = await userModel.locations_Wait();
    res.render("verif-commandes", { locations_wait });
    res.render("verif-commandes");
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit :", err);
    res.status(500).send("Erreur lors de l'ajout du produit");
  }
});
app.post("/delete-commande", async function (req, res) {
  try {
    let idProduct = req.body.id_product;
    let idUser = req.body.id_user;
    const user = await userModel.deleteCommande(idProduct, idUser);
    const locations_wait = await userModel.locations_Wait();
    res.render("verif-commandes", { locations_wait });
    res.render("verif-commandes");
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit :", err);
    res.status(500).send("Erreur lors de l'ajout du produit");
  }
});


app.get("/verif-commandes", async function (req, res) {
  if (res.locals.role == 'agent') {
    try {
      const locations_wait = await userModel.locations_Wait();
      const locations_progress = await userModel.locations_Progress();
      const locations_end = await userModel.locations_End();
      res.render("verif-commandes", { locations_wait, locations_progress, locations_end  });
    }
    catch (err) {
      console.error("Erreur  :", err);
      res.status(500).send("Erreur ");
    }
  }
  else {
    res.render("index");
  }

});

app.get("/validation", function (req, res) {

  if (res.locals.role == "agent") {
    res.render("validation");
  }
  res.render("index");
});

app.get("/inscriptionadmin", function (req, res) {
  if (req.locals.role == "admin") {
    res.render("inscriptionadmin");
  }
  else[
    res.render("index")
  ]

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
app.get("/modif-account", function (req, res) {
  if (res.locals.isAuth) {
    res.render("modif-account");
  } else {
    res.render("index");
  }
});

app.post("/modif-account", async function (req, res) {
  const { nom, prenom, password, ddn, email } = req.body;
  const userId = res.locals.id;
  const mdp = md5(password);

  try {
    const result = await userModel.updateUser(
      userId,
      nom,
      prenom,
      mdp,
      ddn,
      email
    );

    if (result.affectedRows > 0) {
      console.log("Compte modifié avec succès");
      res.status(200).send("Votre compte a été modifié avec succès.");
      res.render("compte");
    } else {
      return res.status(400).send("Erreur lors de la modification du compte.");
    }
  } catch (err) {
    console.error("Erreur lors de la modification du compte :", err);
    return res
      .status(500)
      .send("Erreur serveur lors de la modification du compte.");
  }
});

app.get("/delete-acount", function (req, res) {
  res.render("index");
});

app.post("/delete-account", async function (req, res) {
  try {
    const userId = res.locals.id;

    // Milo vérifie si l'utilisateur a des locations en cours !!!!!!!
    const loc = await userModel.verifResaClient(userId);

    if (loc.length > 0) {
      res
        .status(400)
        .send(
          "Vous ne pouvez pas supprimer votre compte, car vous avez des locations en cours. Veuillez revenir en arrière. "
        );
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

app.get("/panier", async function (req, res) {
  if (res.locals.isAuth === true) {
    try {
      const userId = req.session.userId; // Utiliser l'ID de l'utilisateur connecté
      const panier = await userModel.showPanier(userId); // Récupérer les éléments du panier pour cet utilisateur
      console.log("Voici le panier sous forme de table dans /panier")
      console.log(panier)
      const user = await userModel.getUserById(userId);

      res.render("panier", { panier }); // Passer le panier à la vue pour affichage
    } catch (error) {
      console.error("Erreur lors de la récupération du panier :", error);
      res.status(500).send("Erreur lors de la récupération du panier");
    }
  } else {
    res.render("index");
  }
});

app.post("/deleteProductToPanier", async function (req, res) {
  if (res.locals.isAuth === true) {
    try {
      const userId = req.session.userId; // Utiliser l'ID de l'utilisateur connecté
      const { productId } = req.body;

      const suppr = await userModel.deleteToPanier(productId, userId);
      if (suppr == true) {
        const panier = await userModel.showPanier(userId); // Récupérer les éléments du panier pour cet utilisateur
        console.table(panier)
        res.render("panier", { panier }); // Passer le panier à la vue pour affichage
      }
      else {
        console.error("Erreur lors de la supression d'un produit du panier :");
        res.status(500).send("Erreur lors de la supression d'un produit du panier");
      }
    } catch (error) {
      console.error("Erreur lors de la supression d'un produit du panier :", error);
      res.status(500).send("Erreur lors de la supression d'un produit du panier");
    }
  } else {
    res.render("index");
  }
});

// app.post("/panier", async function (req, res) {
//   try {
//     const userId = res.locals.id; // ID de l'utilisateur connecté
//     const { id_product, start, end } = req.body; // ID du produit et les dates sélectionnées
//     console.log("coucou", id_product, start, end );

//     // Vérifier si les dates de location sont disponibles pour le produit
//     const isAvailable = await userModel.VerifDateDeResa(id_product, start, end );
//     console.log("ceci est isAvailable :", isAvailable);

//     if (new Date(start) >= new Date(end)) {
//       return res.status(400).send("La date de début doit être avant la date de fin.");
//     }

//     if (isAvailable == true) {
//       // Si les dates sont disponibles, ajouter la location au panier
//       console.log('aaaaaaaaaa')
//       const days = await userModel.HowManyDaysWhenPrice(id_product, userId);
//       console.log("ceci est", days);
//       const prix = await userModel.calculateTotalPrice(days, 15); // on part dans l'idée que c'est le meme prix pour tout le matos

//       await userModel.addPanier(id_product, userId, start, end, prix);

//       // Récupérer le panier mis à jour après l'ajout
//       res.render("panier");

//     } else {
//       // Sinon, renvoyer un message que les dates ne sont pas disponibles
//       res.status(400).send("Les dates sélectionnées ne sont pas disponibles pour ce produit.");
//     }
//   } catch (err) {
//     console.error("Erreur lors de l'ajout au panier :", err);
//     res.status(500).send("Erreur lors de l'ajout au panier.");
//   }
// });

app.post('/addPanier', async (req, res) => {
  const { productId } = req.body;  // L'ID du produit à ajouter
  const userId = req.session.userId;  // ID de l'utilisateur connecté

  if (!userId) {
    return res.redirect('/login');  // Redirige vers la connexion si non connecté
  }

  try {
    const userId = res.locals.id; // ID de l'utilisateur connecté
    const { id_product, start, end } = req.body; // ID du produit et les dates sélectionnées
    console.log("coucou", id_product, start, end);

    // Vérifier si les dates de location sont disponibles pour le produit
    const isAvailable = await userModel.VerifDateDeResa(id_product, start, end);
    console.log("ceci est isAvailable :", isAvailable);

    if (new Date(start) >= new Date(end)) {
      return res.status(400).send("La date de début doit être avant la date de fin.");
    }

    if (isAvailable == true) {
      // Si les dates sont disponibles, ajouter la location au panier

      // const days = await userModel.HowManyDaysWhenPrice(id_product, userId);
      // const prix = await userModel.calculateTotalPrice(days, 15); // on part dans l'idée que c'est le meme prix pour tout le matos
      // console.log("/ADDPANIER - Milo voici le prix calculer apres la fonction calculateTotalPrice : ", prix, "et voici ensuite ke nombre de jour de location :", days)
      await userModel.addPanier(id_product, userId, start, end);
      const panier = await userModel.showPanier(userId);
      // Récupérer le panier mis à jour après l'ajout
      res.render("panier", { panier });

    } else {
      // Sinon, renvoyer un message que les dates ne sont pas disponibles
      res.status(400).send("Les dates sélectionnées ne sont pas disponibles pour ce produit.");
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout au panier :", err);
    res.status(500).send("Erreur lors de l'ajout au panier.");
  }
});



app.get("/addProduct", function (req, res) {
  res.render("addProduct", { error: null });
});

app.post("/addProduct", async function (req, res) {
  try {
    let prix = req.body.prix;
    prix = parseInt(prix);
    let type = req.body.type;
    let description = req.body.description;
    let marque = req.body.marque;
    let modele = req.body.modele;
    let etat = req.body.productCondition;
    const values = [type, description, marque, modele, prix, etat];
    console.log("ceci est values : ", values);

    const user = await userModel.addProduct(
      type,
      description,
      marque,
      modele,
      prix,
      etat
    );
    console.log("Produit créé avec succès : ", user);

    res.render("index");
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit :", err);
    res.status(500).send("Erreur lors de l'ajout du produit");
  }
});

app.get("/try", function (req, res) {
  res.render("try", { error: null });
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
