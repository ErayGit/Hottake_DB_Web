const db = require('./../db-config');
module.exports = {

    // Validierung vom Register Formular:
    // email mind. 5 Zeichen, name mind. 5 Zeichen, password mind. 5 Zeichen, password == password-repeat
    validateRegister: (req, res, next) => {

        // email mind. 5 Zeichen,
        if(req.body.email.length === 0){
            // Abbruch + bad-request: der Benutzer hat eine Fehlerhafte Anfrage gesendet + message mit genauer Fehlerbeschreibung
            return res.status(400).send({message: "Server-Error: Es wurde keine gültige Email Adresse eingegeben."});
        }
        // name nicht 0 Zeichen,
        if(req.body.name.length === 0){
            // Abbruch + bad-request: der Benutzer hat eine Fehlerhafte Anfrage gesendet + message mit genauer Fehlerbeschreibung
            return res.status(400).send({message: "Server-Error: Es wurde kein Name eingegeben."});
        }
        // password mind. 5 Zeichen
        if(req.body.password.length < 5){
            // Abbruch + bad-request: der Benutzer hat eine Fehlerhafte Anfrage gesendet + message mit genauer Fehlerbeschreibung
            return res.status(400).send({message: "Server-Error: Das Passwort ist zu kurz, nutze bitte mind. 5 Zeichen."});
        }
        // Falls Validierung erfolgreich war, weiter fortfahren
        next();
    },
    validateLogin: (req, res, next) => {
        // email mind. 5 Zeichen,
        if(req.body.email.length === 0){
            // Abbruch + bad-request: der Benutzer hat eine Fehlerhafte Anfrage gesendet + message mit genauer Fehlerbeschreibung
            return res.status(400).send({message: "Server-Error: Es wurde keine gültige Email Adresse eingegeben."});
        }
        // password mind. 5 Zeichen
        if(req.body.password.length < 5){
            // Abbruch + bad-request: der Benutzer hat eine Fehlerhafte Anfrage gesendet + message mit genauer Fehlerbeschreibung
            return res.status(400).send({message: "Server-Error: Das Passwort ist zu kurz, nutze bitte mind. 5 Zeichen."});
        }

        // Falls Validierung erfolgreich war, weiter fortfahren
        next();
    },
    validatePostComment: (req, res, next) => {
      let query = 'SELECT * FROM comment WHERE postId = ? AND creatorId = ? AND emoji = ?';
      let params = [req.body.postId, req.body.creatorId, req.body.emoji];
      db.query(query, params, (err, results) => {
        if(err) {
          console.error(err)
        } else {
          console.log(results.length > 0);
          if(results.length > 0) {
            return res.status(400).send({message: "Server-Error: Post wurde schon mit dem Emoji kommentiert"});
          }
          next();
        }
      });
    }
}
