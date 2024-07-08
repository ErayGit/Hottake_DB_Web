const uuidGenerator = require('uuid');
const express          = require('express');
const router           = express.Router();
const db = require('./../db-config');
const websocket        = require('./websocket.js');

router.post('/post',  async (req, res) => {
  const uuid = uuidGenerator.v4();
  const insertQuery = 'INSERT INTO post (id, text, musicUrl, color, emoji, creatorId, fileId, musicArtist, musicTitle) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?)';
  const insertParams = [uuid, req.body.text, req.body.musicUrl, req.body.color, req.body.emoji, req.body.creatorId, req.body.fileId, req.body.musicArtist, req.body.musicTitle];

          db.query(insertQuery, insertParams, (err, result) => {
              if (err) {
                  console.error('Insert error:', err);
                  return res.status(500).send({message: "Error inserting post data."});
              } else {
                const findQuery = 'SELECT * FROM post WHERE id = ?';
                const params = [uuid];
                db.query(findQuery, params, async (err, findRes) => {
                  websocket.notifyFollowers(req.body.creatorId, findRes[0])
                  return res.status(201).send({message: "Create Post war erfolgreich.", ...findRes[0]});
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

router.get('/post/:id/feed', async (req, res) => {
  //Don't join OneToMany because of strange behavior concerning joins and limit -Maxim :)
  let findQuery = 'SELECT * FROM post LEFT JOIN user ON post.creatorId = user.id WHERE post.id = ANY(SELECT poster.id FROM(SELECT post.id FROM post WHERE creatorId = ANY(SELECT followedId FROM follow WHERE followerId = ?) ORDER BY createdAt DESC) poster) ORDER BY post.createdAt DESC LIMIT ? OFFSET ?';
  const params = [req.params.id, 100, 0];
  if(req.query.limit) {
    try {
      if(isNaN(req.query.limit)) {
        params[1] = parseInt(req.query.limit);
      }
      params[1] = parseInt(req.query.limit);
    } catch(err) {
      params[1] = req.query.limit;
    }
  }
  if(req.query.skip) {
    try {
      if(isNaN(req.query.skip)) {
        params[2] = parseInt(req.query.skip);
      }
        params[2] = parseInt(req.query.skip);
    } catch(err) {
        params[2] = req.query.skip;
    }
  }
  db.query(findQuery, params, (err, results) => {
    if(err) {
      console.error('Database error:', err);
      return res.status(500).send({message: "Server error."});
    }
    const postsMap = {};
    results.forEach(item => {
      const { post, user, comment } = item;

      if (!postsMap[post.id]) {
        postsMap[post.id] = {
          ...post,
          user,
          comments: []
        };
      }

      if (comment && comment.id != null) {
        postsMap[post.id].comments.push(comment);
      }
    });

    const returnArray = [];

    Object.keys(postsMap).forEach((key) => {
      returnArray.push(postsMap[key]);
    })
    res.status(200).send(returnArray);
  });
})

router.get('/post/:id/countfeed', async (req, res) => {
  //Don't join OneToMany because of strange behavior concerning joins and limit -Maxim :)
  let findQuery = 'SELECT COUNT(post.id) as count FROM post WHERE post.id = ANY(SELECT poster.id FROM(SELECT post.id FROM post WHERE creatorId = ANY(SELECT followedId FROM follow WHERE followerId = ?) ORDER BY createdAt DESC) poster)';
  const params = [req.params.id];
  db.query(findQuery, params, (err, results) => {
    if(err) {
      console.error('Database error:', err);
      return res.status(500).send({message: "Server error."});
    }
    console.log(results[0].count);
    res.status(200).send(results[0]['']);
  });
})


router.get('/post/:id/user', async (req, res) => {
  //Don't join OneToMany because of strange behavior concerning joins and limit -Maxim :)
  let findQuery = 'SELECT * FROM post LEFT JOIN user ON post.creatorId = user.id WHERE post.id = ANY(SELECT poster.id FROM(SELECT post.id FROM post WHERE creatorId = ?) poster) ORDER BY post.createdAt DESC LIMIT ? OFFSET ?';
  const params = [req.params.id, 100, 0];
  if(req.query.limit) {
    try {
      if(isNaN(req.query.limit)) {
        params[1] = parseInt(req.query.limit);
      }
      params[1] = parseInt(req.query.limit);
    } catch(err) {
      params[1] = req.query.limit;
    }
  }
  if(req.query.skip) {
    try {
      if(isNaN(req.query.skip)) {
        params[2] = parseInt(req.query.skip);
      }
      params[2] = parseInt(req.query.skip);
    } catch(err) {
      params[2] = req.query.skip;
    }
  }
  db.query(findQuery, params, (err, results) => {
    if(err) {
      console.error('Database error:', err);
      return res.status(500).send({message: "Server error."});
    }
    const postsMap = {};
    results.forEach(item => {
      const { post, user, comment } = item;

      if (!postsMap[post.id]) {
        postsMap[post.id] = {
          ...post,
          user,
          comments: []
        };
      }

      if (comment && comment.id != null) {
        postsMap[post.id].comments.push(comment);
      }
    });

    const returnArray = [];

    Object.keys(postsMap).forEach((key) => {
      returnArray.push(postsMap[key]);
    })
    res.status(200).send(returnArray);
  });
})

router.get('/post/:id/countuser', async (req, res) => {
  //Don't join OneToMany because of strange behavior concerning joins and limit -Maxim :)
  let findQuery = 'SELECT COUNT(post.id) as count FROM post WHERE post.id = ANY(SELECT poster.id FROM(SELECT post.id FROM post WHERE creatorId = ?) poster)';
  const params = [req.params.id];
  db.query(findQuery, params, (err, results) => {
    if(err) {
      console.error('Database error:', err);
      return res.status(500).send({message: "Server error."});
    }
    console.log(results[0].count);
    res.status(200).send(results[0]['']);
  });
})

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
