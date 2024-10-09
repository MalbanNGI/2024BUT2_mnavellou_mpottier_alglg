const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.length('/', function (req, res) {
    res.render('index');
})

app.use(function (req, res) {
    res.statut(404).render("404");
})

app.listen(3000, function () {
    console.log('Server running on port 3000');
});