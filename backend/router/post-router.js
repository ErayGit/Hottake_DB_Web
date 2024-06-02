const uuidGenerator = require('uuid');
const express          = require('express');
const router           = express.Router();
const db = require('./../db-config');

router.post('/post',  async (req, res) => {
  const uuid = uuidGenerator.v4();
  const insertQuery = 'INSERT INTO post (id, text, musicUrl, color, emoji, creatorId) VALUES (? ,?, ?, ?, ?, ?)';
  const insertParams = [uuid, req.body.text, req.body.musicUrl, req.body.color, req.body.emoji, req.body.creatorId];

          db.query(insertQuery, insertParams, (err, result) => {
              if (err) {
                  console.error('Insert error:', err);
                  return res.status(500).send({message: "Error inserting post data."});
              } else {
                const findQuery = 'SELECT * FROM post WHERE id = ?';
                const params = [uuid];
                db.query(findQuery, params, async (err, findRes) => {
                  return res.status(201).send({message: "Create Comment war erfolgreich.", ...findRes[0]});
                })
              }
          });
});

//finde alle posts
router.get('/post', async (req, res) => {
    db.query('SELECT * FROM post', (err, results) => {
        if(err) {
            console.error('Database error:', err);
            return res.status(500).send({message: "Server error."});
        }
        res.status(200).send(results);
    });
});

//finde einen bestimmten user
router.get('/post/:id', async (req, res) => {

    const query = 'SELECT * FROM post WHERE id = ?';
    const params = [req.params.id];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database error:', err); // Fehler Protokoll
            return res.status(500).send({message: "Server error."});
        }
        if (results.length > 0) {
            res.status(200).send(results[0]);   // vllt keine eckige
        } else {
            res.status(404).send({message: "Post not found."});
        }
    });
});

// delete user
router.delete('/post/:id', async (req, res) => {

    const query = 'DELETE FROM post WHERE id = ?';
    const values = [req.params.id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({message: "Server error."});
        }
        if (result.affectedRows > 0) {
            res.status(200).send({message: "Post deleted successfully."});
        } else {
            res.status(404).send({message: "Post not found."});
        }
    });
});



module.exports = router;
