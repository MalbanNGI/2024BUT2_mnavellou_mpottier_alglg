const express = require('express');
const app = express();
const userModel = require("./models/user.js");


app.set('view engine', 'ejs');

app.use(express.static('public'));

// app.get('/', function (req, res) { // exemple     async si await
   //  res.render('index');
// })

app.get('/', async function (req, res) { // {param}
    try {
        const user = await userModel.getUserById(2); // chiffre a recup normalement
        res.render('testing', {user});
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la recu des données !');
    }
})


app.use(function (req, res) {
    res.statut(404).render("404");
})

app.listen(3000, function () {
    console.log('Server running on port 3000');
});