const express = require("express");
const router = express.Router();
const db = require("./../db-config");
const validation = require("./../common/validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { find } = require("rxjs");
const uuidGenerator = require("uuid");

router.post("/register", validation.validateRegister, async (req, res) => {
  //  Abfrage, um nach einer Email zu suchen
  const emailQuery = "SELECT * FROM user WHERE LOWER(email) = LOWER(?)";
  const emailParams = [req.body.email];
  db.query(emailQuery, emailParams, async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Server error." });
    } else if (result.length > 0) {
      return res
        .status(400)
        .send({ message: "Diese Email-Adresse ist bereits registriert." });
    } else {
      let salt = await bcrypt.genSalt();
      let hashedPassword = await bcrypt.hash(req.body.password, salt);
      // Einfügen neuer Benutzerdaten
      const insertQuery =
        "INSERT INTO user (id, name, bio, stadt, email, password, firstName, lastName, fileId) VALUES (UUID(),?, ?, ?, ?, ?, ?, ?, ?)";
      const insertParams = [
        req.body.name,
        req.body.bio,
        req.body.stadt,
        req.body.email,
        hashedPassword,
        req.body.firstName,
        req.body.lastName,
        req.body.fileId ?? null,
      ];

      db.query(insertQuery, insertParams, (err, result) => {
        if (err) {
          console.error("Insert error:", err);
          return res
            .status(500)
            .send({ message: "Error inserting user data." });
        } else {
          const findQuery = "SELECT * FROM user WHERE LOWER(email) = LOWER(?)";
          const params = [req.body.email];
          db.query(findQuery, params, async (err, findRes) => {

            const followuuid = uuidGenerator.v4();
            const insertQuery = 'INSERT INTO follow (id,status, followerId, followedId) VALUES (? ,?, ?, ?)';
            const insertParams = [followuuid, 'pending', findRes[0].user.id, findRes[0].user.id];

            db.query(insertQuery, insertParams, (err, result) => {
              if (err) {
                console.error('Insert error:', err);
                return res.status(500).send({message: "Error inserting follow data."});
              } else {
                const findQuery = 'SELECT * FROM follow WHERE id = ?';
                const params = [followuuid];
                db.query(findQuery, params, async (err, lol) => {
                 console.log("created Follow");
                })
              }
            });

            const token = jwt.sign({
                user: findRes[0],
              },
              'SECRETKEY', {
                expiresIn: '1d'
              }
            );

            return res
              .status(201)
              .send({
                message: "Die Registrierung war erfolgreich.",
                access_token: token,
                ...findRes[0],
              });
          });
          // Wenn neuer Nutzer erstellt, Registrierung abgeschlossen: Status 201 -> Created
        }
      });
    }
  });
});

router.post("/login", validation.validateLogin, async (req, res) => {
  const query = "SELECT * FROM user WHERE LOWER(email) = LOWER(?)";
  const params = [req.body.email];
  db.query(query, params, async (err, results) => {
    if (err) {
      console.error("Database error:", err); // Fehler code
      return res.status(500).send({ message: "Server error." });
    } else if (results.length > 0) {
      // passwort überprüfung (gehashed)
      const match = await bcrypt.compare(
        req.body.password,
        results[0].user.password
      );
      if (match) {
        const findQuery = "SELECT * FROM user WHERE LOWER(email) = LOWER(?)";
        const params = [req.body.email];
        db.query(findQuery, params, async (err, findRes) => {

          const token = jwt.sign({
              user: findRes[0],
            },
            'SECRETKEY', {
              expiresIn: '1d'
            }
          );

          return res
            .status(201)
            .send({
              message: "Login war erfolgreich.",
              access_token: token,
              ...findRes[0] });
        });
      } else {
        return res
          .status(401)
          .send({ message: "Incorrect email or password." });
      }
    } else {
      return res.status(404).send({ message: "User not found." });
    }
  });
});

//finde alle user
router.get("/user", async (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Server error." });
    }
    res.status(200).send(results);
  });
});

//finde alle user dem ein user folgt
router.get("/user/:id/followed", async (req, res) => {
  const query = "SELECT * FROM user WHERE id = ANY(SELECT followedId FROM follow WHERE followerId = ?)"
  const params = [req.params.id]
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Server error." });
    }
    res.status(200).send(results);
  });
});

router.get("/user/:id/notfollowed", async (req, res) => {
  const query = "SELECT * FROM user WHERE id != ANY(SELECT followedId FROM follow WHERE followerId = ?)"
  const params = [req.params.id]
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Server error." });
    }
    res.status(200).send(results);
  });
});

//finde einen bestimmten user
router.get("/user/:id", async (req, res) => {
  const query = "SELECT * FROM user WHERE id = ?";
  const params = [req.params.id];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Database error:", err); // Fehler Protokoll
      return res.status(500).send({ message: "Server error." });
    }
    if (results.length > 0) {
      const { password, ...userData } = results[0]; // userData anstatt result sicherer
      res.status(200).send(userData); // vllt keine eckige
    } else {
      res.status(404).send({ message: "User not found." });
    }
  });
});

// update user
router.put("/user/:id", async (req, res) => {
  const { name, bio, stadt, email, firstName, lastName } = req.body;

  const query =
    "UPDATE user SET name = ?, bio = ?, stadt = ?, email = ?, firstName = ?, lastName = ? WHERE id = ?";
  const values = [name, bio, stadt, email, firstName, lastName, req.params.id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err); // Fehler Protokoll
      return res.status(500).send({ message: "Server error." });
    }
    if (result.affectedRows > 0) {
      res.status(200).send({ message: "User updated successfully." });
    } else {
      res.status(404).send({ message: "User not found." });
    }
  });
});

// delete user
router.delete("/user/:id", async (req, res) => {
  const query = "DELETE FROM user WHERE id = ?";
  const values = [req.params.id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Server error." });
    }
    if (result.affectedRows > 0) {
      res.status(200).send({ message: "User deleted successfully." });
    } else {
      res.status(404).send({ message: "User not found." });
    }
  });
});

module.exports = router;
