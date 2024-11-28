

#### 2024BUT2_mnavellou_mpottier_alglg

# Compte rendu SAE 3.O1 : Création du site LocFit

<p align="center">
    <img src="public/img/logolocfit.png" alt="Logo de FitLoc" width="100">
</p>

---

Notre équipe, composée d'**Annaëlle Le Guénic Le Gall**, **Milo Navellou** et **Maël Pottier**, a réalisé un site de location de matériel sportif, **Locfit**, dans le cadre de la **SAE 3.O1**.  
*Objectif : Développer des parcours utilisateur et intégrer des interfaces utilisateur au sein d'un système d'information.*

> **Note :** Il est nécessaire d'exécuter le script de la BDD situé dans le dossier `/models/bdd` pour initialiser les données.

### Scripts BDD
- Le fichier **`scriptTable.sql`** : Crée trois tables :
  - Table `utilisateur`
  - Table `produit`
  - Table `location`
- **`scriptData.sql`** : Insère des données dans la base de données. (Attention : aucune réservation n'est enregistrée initialement).

---

## Description du site

Le site propose une navigation fluide à travers différentes pages accessibles sans connexion préalable :
- **Accueil**
- **Catalogue**
- **Détail des produits**
- **Contact**
- **Connexion** / **Inscription**
- **Aides**
- **Compte** : Permet de modifier ou supprimer son compte *(impossible si une location est en cours).*

### Rôles spécifiques

#### > Agent
En complément des pages standards :
- **Location(s)** : Voir et valider les locations des utilisateurs.
- **Produits** : Ajouter, modifier ou supprimer un produit (non supprimable si en location).

#### > Admin
En complément des pages standards :
- **Admin** : Création de comptes agents (sans possibilité de suppression).

#### > Client
En complément des pages standards :
- **Commandes** : Visualiser ses commandes en cours et terminées. Annuler une réservation possible si elle n’a pas encore commencé.
- **Panier** : Visualiser ses commandes en attente de validation. 

---

## Choix graphiques

Nous avons opté pour un design épuré, avec des **grandes polices** et des **images imposantes**, correspondant à la cible **Jacques Février**.  
### Couleur principale
- **Vert foncé** (#198900) : Symbolise la **nature**, la **santé**, et l'**espérance**, en accord avec la thématique sportive.

---

## Fonctionnalités futures
- Actuellement, lorsqu'on arrive sur la page d'un produit, peut importe le produit il aura toujours la même description avec les mêmes dimmensions. Dans une version futur, ces dimensions seront rajoutées dans la base de données pour correspondre à chaque produit. 


---

## Problèmes rencontrés

1. **Bug de date** : La date de naissance de l'utilisateur n'était pas correctement affichée après connexion.
2. **Ajout d'image produit** : Impossible d'importer une image pour un produit en respectant les règles BDD.

### Solutions apportées
- **Date** : Utilisation d'une fonction alternative pour corriger l'affichage.
- **Image** : Problème non résolu (nécessiterait l'utilisation de modules adaptés).

---

## Extensions et modules
Aucune extension ou module externe n’a été installé.

---

## Fonctionnement

### Le client

Le **client** se connecte, réserve du matérielsà des dates données. 
- Si il réserve moins de 3 jours il y a un message d'erreur.
- Si il réserve plus de 30 jours il y a un message d'erreur.

Autrement, ça **envoie** une demande de validation de commande à/aux agent(s). Le statut de la location est en wait.

### L'agent

L'**agent** se connecte, va dans l'onglet "Location(s)". 
Il peut voir les commandes à valider, les commandes en cours ainsi que les commandes terminées.

En validant la commande, le statut de la commande passe de "wait" à "progress". 
La commande passe donc dans la case *Location(s) en cours*. 

Pour valider le retour de la commande il doit cocher la case et remplir la date de retour effective.

Un fois le bouton *finaliser* cliqué, cela rajoute le prix du surcout en fonction du nombre de jour de retard (+20%/jrs).

### L'admin

L'admin via la page ADMIN peut créer un nouvel agent qui pourra s'occuper des commandes et des locations.

---

> **Merci de votre attention !**
