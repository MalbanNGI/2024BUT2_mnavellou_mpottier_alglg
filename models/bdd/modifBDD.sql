ALTER TABLE location ADD status VARCHAR(50);

UPDATE location SET status = "finished" WHERE utilisateur_id = 1 AND produit_id = 1;
UPDATE location SET status = "progress" WHERE utilisateur_id = 2 AND produit_id = 2;
UPDATE location SET status = "wait" WHERE utilisateur_id = 3 AND produit_id = 3;
UPDATE location SET status = "progress" WHERE utilisateur_id = 4 AND produit_id = 4;