const express          = require('express');
const router           = express.Router();
const db = require('./../db-config');
const multer = require('multer');
const uuidGenerator = require("uuid");
const upload = multer();
router.post('/file',  upload.single('file'), async (req, res) => {
  const uuid = uuidGenerator.v4();
  const insertQuery = 'INSERT INTO file SET ?';
  const values = {id: uuid, data: req.file.buffer, mimetype: req.file.mimetype, filename: req.file.originalname};
          db.query(insertQuery, values, (err, result) => {
              if (err) {
                  console.error('Insert error:', err);
                  return res.status(500).send({message: "Error inserting File data."});
              } else {
                const findQuery = 'SELECT * FROM file WHERE id = ?';
                const params = [uuid];
                db.query(findQuery, params, async (err, findRes) => {
                  return res.status(201).send({message: "Create File war erfolgreich.", ...findRes[0]});
                })
              }
          });
});

//finde alle posts
router.get('/file', async (req, res) => {
    db.query('SELECT id, filename, mimetype FROM file', (err, results) => {
        if(err) {
            console.error('Database error:', err);
            return res.status(500).send({message: "Server error."});
        }
        res.status(200).send(results);
    });
});

router.get('/file/:id/download', async (req, res) => {
  const query = 'SELECT * FROM file WHERE id = ?';
  const params = [req.params.id];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Database error:', err); // Fehler Protokoll
      return res.status(500).send({message: "Server error."});
    }
    if (results.length > 0) {
      res.status(200).set({'Content-Type': results[0].mimetype, 'Content-Disposition': `attachment; filename=${results[0].filename}`,}).end(results[0].data);   // vllt keine eckige
    } else {
      res.status(404).send({message: "file not found."});
    }
  });
});

//finde einen bestimmten user
router.get('/file/:id', async (req, res) => {

    const query = 'SELECT * FROM file WHERE id = ?';
    const params = [req.params.id];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database error:', err); // Fehler Protokoll
            return res.status(500).send({message: "Server error."});
        }
        if (results.length > 0) {
            res.status(200).send(results[0]);   // vllt keine eckige
        } else {
            res.status(404).send({message: "file not found."});
        }
    });
});

// delete user
router.delete('/file/:id', async (req, res) => {

    const query = 'DELETE FROM file WHERE id = ?';
    const values = [req.params.id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({message: "Server error."});
        }
        if (result.affectedRows > 0) {
            res.status(200).send({message: "file deleted successfully."});
        } else {
            res.status(404).send({message: "file not found."});
        }
    });
});



module.exports = router;
