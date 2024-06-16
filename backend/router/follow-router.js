const express          = require('express');
const router           = express.Router();
const db = require('./../db-config');
const validation   = require('./../common/validation');
const bcrypt = require('bcryptjs');
const uuidGenerator = require("uuid");

router.post('/follow',  async (req, res) => {
  const uuid = uuidGenerator.v4();
  const insertQuery = 'INSERT INTO follow (id,status, followerId, followedId) VALUES (? ,?, ?, ?)';
  const insertParams = [uuid, req.body.status, req.body.followerId, req.body.followedId];

          db.query(insertQuery, insertParams, (err, result) => {
              if (err) {
                  console.error('Insert error:', err);
                  return res.status(500).send({message: "Error inserting follow data."});
              } else {
                const findQuery = 'SELECT * FROM follow WHERE id = ?';
                const params = [uuid];
                db.query(findQuery, params, async (err, findRes) => {
                  return res.status(201).send({message: "Create Follow war erfolgreich.", ...findRes[0]});
                })
              }
          });
});

//finde alle posts
router.get('/follow', async (req, res) => {
    db.query('SELECT * FROM follow', (err, results) => {
        if(err) {
            console.error('Database error:', err);
            return res.status(500).send({message: "Server error."});
        }
        res.status(200).send(results);
    });
});

router.get('/follower/:id', async (req, res) => {
  db.query('SELECT * FROM follow WHERE followedId = ?', [req.params.id], (err, results) => {
    if(err) {
      console.error('Database error:', err);
      return res.status(500).send({message: "Server error."});
    }
    res.status(200).send(results);
  });
});

router.get('/followed/:id', async (req, res) => {
  db.query('SELECT * FROM follow WHERE followerId = ?', [req.params.id], (err, results) => {
    if(err) {
      console.error('Database error:', err);
      return res.status(500).send({message: "Server error."});
    }
    res.status(200).send(results);
  });
});

//finde einen bestimmten user
router.get('/follow/:id', async (req, res) => {

    const query = 'SELECT * FROM follow WHERE id = ?';
    const params = [req.params.id];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database error:', err); // Fehler Protokoll
            return res.status(500).send({message: "Server error."});
        }
        if (results.length > 0) {
            res.status(200).send(results[0]);   // vllt keine eckige
        } else {
            res.status(404).send({message: "follow not found."});
        }
    });
});

// delete follow
router.delete('/follow/:id', async (req, res) => {

    const query = 'DELETE FROM follow WHERE id = ?';
    const values = [req.params.id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({message: "Server error."});
        }
        if (result.affectedRows > 0) {
            res.status(200).send({message: "follow deleted successfully."});
        } else {
            res.status(404).send({message: "follow not found."});
        }
    });
});

router.delete('/follow/:followerId/:followedId', async (req, res) => {

  const query = 'DELETE FROM follow WHERE followerId = ? AND followedId = ?';
  const values = [req.params.followerId, req.params.followedId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({message: "Server error."});
    }
    if (result.affectedRows > 0) {
      res.status(200).send({message: "follow deleted successfully."});
    } else {
      res.status(404).send({message: "follow not found."});
    }
  });
});



module.exports = router;
