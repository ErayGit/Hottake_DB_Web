const express          = require('express');
const router           = express.Router();
const db = require('./../db-config');
const validation   = require('./../common/validation');
const bcrypt = require('bcryptjs');

router.post('/register', validation.validateRegister, async (req, res) => {
  //  Abfrage, um nach einer Email zu suchen
  const emailQuery = 'SELECT * FROM user WHERE LOWER(email) = LOWER(?)';
  const emailParams = [req.body.email];

  db.query(emailQuery, emailParams, async (err, result) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).send({message: "Server error."});
      } else if (result.length > 0) {
          return res.status(400).send({message: "Diese Email-Adresse ist bereits registriert."});
      } else {
          let salt = await bcrypt.genSalt();
          let hashedPassword = await bcrypt.hash(req.body.password, salt);

          // Einfügen neuer Benutzerdaten
          const insertQuery = 'INSERT INTO user (name, bio, stadt, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?, ?, ?)';
          const insertParams = [req.body.name, req.body.bio, req.body.stadt, req.body.email, hashedPassword, req.body.firstName, req.body.lastName];

          db.query(insertQuery, insertParams, (err, result) => {
              if (err) {
                  console.error('Insert error:', err);
                  return res.status(500).send({message: "Error inserting user data."});
              } else {
                  // Wenn neuer Nutzer erstellt, Registrierung abgeschlossen: Status 201 -> Created
                  return res.status(201).send({message: "Die Registrierung war erfolgreich."});
              }
          });
      }
  });
});

module.exports = router;
