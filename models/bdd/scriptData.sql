INSERT INTO utilisateur (login, password, nom, prenom, ddn, email, type_utilisateur) 
VALUES 
("jdupont", "81dc9bdb52d04dc20036dbd8313ed055", "Dupont", "Jean", '1990-05-12', "jdupont@example.com", "client"),
("sleclerc", "81dc9bdb52d04dc20036dbd8313ed055", "Leclerc", "Sophie", '1985-09-21', "sleclerc@example.com", "client"),
("plefebvre", "81dc9bdb52d04dc20036dbd8313ed055", "Lefebvre", "Pierre", '1988-12-05', "plefebvre@example.com", "client"),
("mleroy", "81dc9bdb52d04dc20036dbd8313ed055", "Leroy", "Marie", '1995-07-18', "mleroy@example.com", "client"),
("amartin", "81dc9bdb52d04dc20036dbd8313ed055", "Martin", "Alex", '1982-03-28', "amartin@example.com", "agent"),
("lpetit", "81dc9bdb52d04dc20036dbd8313ed055", "Petit", "Laura", '1989-11-15', "lpetit@example.com", "agent"),
("adufrene", "81dc9bdb52d04dc20036dbd8313ed055", "Dufrène", "Alice", '1975-01-01', "adufrene@example.com", "admin");

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Haltères', 'Haltères ajustables de 5 à 40 kg, parfaits pour la musculation à domicile.', 'Bowflex', 'SelectTech 552', 15.0, 'Neuf', 'SelectTech_.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Rameur', 'Rameur à résistance magnétique, idéal pour un entraînement complet du corps.', 'Concept2', 'Model D', 25.0, 'Très bon état', 'Model_D.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Vélo d\'appartement', 'Vélo d\'intérieur avec résistance réglable, écran connecté.', 'Peloton', 'Bike+', 30.0, 'Neuf', 'Bike.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Tapis de course', 'Tapis de course pliable avec amortissement avancé, vitesse max 20 km/h.', 'NordicTrack', 'Commercial 1750', 35.0, 'Bon état', 'Commercial.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Banc de musculation', 'Banc inclinable pour divers exercices de musculation.', 'Domyos', 'Training Bench 500', 10.0, 'Très bon état', 'Training_Bench.png');
