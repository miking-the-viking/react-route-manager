CREATE OR REPLACE VIEW followable_users AS
SELECT u.id "user_id", f.id "followable_id"
FROM users u
         LEFT JOIN users f ON u.id != f.id
WHERE NOT EXISTS(SELECT * FROM followers WHERE follower_id = u.id AND user_id = f.id);
