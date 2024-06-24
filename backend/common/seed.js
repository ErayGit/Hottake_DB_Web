function addPost(
  text,
  musicUrl,
  color,
  emoji,
  creatorId,
  fileId,
  musicArtist,
  musicTitle
) {
  const uuid = uuidGenerator.v4();
  const insertQuery =
    "INSERT INTO post (id, text, musicUrl, color, emoji, creatorId, fileId, musicArtist, musicTitle) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?)";
  const insertParams = [
    uuid,
    text,
    musicUrl,
    color,
    emoji,
    creatorId,
    fileId,
    musicArtist,
    musicTitle,
  ];

  db.query(insertQuery, insertParams, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).send({ message: "Error inserting post data." });
    } else {
      const findQuery = "SELECT * FROM post WHERE id = ?";
      const params = [uuid];
      db.query(findQuery, params, async (err, findRes) => {
        websocket.notifyFollowers(req.body.creatorId, findRes[0]);
        return res
          .status(201)
          .send({ message: "Create Post war erfolgreich.", ...findRes[0] });
      });
    }
  });
}

function addUser() {
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
            const insertQuery =
              "INSERT INTO follow (id,status, followerId, followedId) VALUES (? ,?, ?, ?)";
            const insertParams = [
              followuuid,
              "pending",
              findRes[0].user.id,
              findRes[0].user.id,
            ];
          });
        }
      });
    }
  });
}
