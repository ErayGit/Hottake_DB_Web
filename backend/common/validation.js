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
        // password und password-repeat müssen gleich sein
        if(req.body.password !== req.body.passwordRepeat){
            // Abbruch + bad-request: der Benutzer hat eine Fehlerhafte Anfrage gesendet + message mit genauer Fehlerbeschreibung
            return res.status(400).send({message: "Server-Error: Passwort und Passwort-Wiederholung stimmen nicht überein"});
        }

        // Falls Validierung erfolgreich war, weiter fortfahren
        next();
    },
}
