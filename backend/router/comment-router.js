const express          = require('express');
const router           = express.Router();
const db = require('./../db-config');
const validation   = require('./../common/validation');
const bcrypt = require('bcryptjs');
const uuidGenerator = require("uuid");

router.post('/comment', validation.validatePostComment, async (req, res) => {
  const uuid = uuidGenerator.v4();
  const insertQuery = 'INSERT INTO comment (id, text, emoji, creatorId, postId) VALUES (?, ?, ?, ?, ?)';
  const insertParams = [uuid, req.body.text, req.body.emoji, req.body.creatorId, req.body.postId];

          db.query(insertQuery, insertParams, (err, result) => {
              if (err) {
                  console.error('Insert error:', err);
                  return res.status(500).send({message: "Error inserting Comment data."});
              } else {
                const findQuery = 'SELECT * FROM comment WHERE id = ?';
                const params = [uuid];
                db.query(findQuery, params, async (err, findRes) => {
                  return res.status(201).send({message: "Create Post war erfolgreich.", ...findRes[0]});
                })
              }
          });
});

//finde alle posts
router.get('/comment', async (req, res) => {
    db.query('SELECT * FROM comment', (err, results) => {
        if(err) {
            console.error('Database error:', err);
            return res.status(500).send({message: "Server error."});
        }
        res.status(200).send(results);
    });
});

//finde einen bestimmten user
router.get('/comment/:id', async (req, res) => {

    const query = 'SELECT * FROM comment WHERE id = ?';
    const params = [req.params.id];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database error:', err); // Fehler Protokoll
            return res.status(500).send({message: "Server error."});
        }
        if (results.length > 0) {
            res.status(200).send(results[0]);   // vllt keine eckige
        } else {
            res.status(200).send([]);
        }
    });
});

router.get('/comment/:id/post', async (req, res) => {

  const query = 'SELECT * FROM comment WHERE postId = ?';
  const params = [req.params.id];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Database error:', err); // Fehler Protokoll
      return res.status(500).send({message: "Server error."});
    }
    if (results.length > 0) {
      res.status(200).send(results);   // vllt keine eckige
    } else {
      res.status(200).send([]);
    }
  });
});

// delete user
router.delete('/comment/:id', async (req, res) => {

    const query = 'DELETE FROM comment WHERE id = ?';
    const values = [req.params.id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({message: "Server error."});
        }
        if (result.affectedRows > 0) {
            res.status(200).send({message: "comment deleted successfully."});
        } else {
            res.status(404).send({message: "comment not found."});
        }
    });
});



module.exports = router;
