const express          = require('express');
const router           = express.Router();
const db = require('./../db-config');
const validation   = require('./../common/validation');
const bcrypt = require('bcryptjs');

router.post('/register', validation.validateRegister, async (req, res) => {
  db.query(`SELECT * FROM user WHERE LOWER(email) = LOWER(${db.escape(req.body.email)})`, async (err, result) => {
    if(err) {
      return res.status(500)
    } else {
      if(result.length > 0) {
        return res.status(400).send({message: "Diese Email-Adresse ist bereits registriert."});
      } else {
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(req.body.password, salt);
        db.query(`INSERT INTO user (name, bio, stadt, email, password, firstName, lastName) VALUES(${db.escape(req.body.name)},${db.escape(req.body.bio)},${db.escape(req.body.stadt)},${db.escape(req.body.email)},'${hashedPassword}',${db.escape(req.body.firstName)},${db.escape(req.body.lastName)})`,
          (err, result) => {
            if(err){
              // Wenn Fehler beim Einfügen in die Datenbank: Status 500 -> Internal Server Error
              return res.status(500).send({message: err});
            }else{
              // Wenn neuer Nutzer erstellt, Registrierung abgeschlossen: Status 201 -> Created
              return res.status(201).send({message: "Die Registrierung war erfolgreich."});
            }
          });
      }
    }
  })
});

module.exports = router;
