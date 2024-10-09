# Aides en Node.js

### 1. Comment passer des données du fichier js (lui même en connexion avec la BDD) au html ? 

Il faut créer une **variable** dans la fonction qui **récupère** les resultats de la *BDD* : 

``` 
let data = {
    prenom : 'Bob',
    nom : 'Marley'
}
```
Pour le récupérer en html il faut donc **l'envoyer via le js** : 

``` 
res.render('index', {data});
```
Ensuite on le **récupère** via :
```
<h1><%- data.prenom -%></h1>
```