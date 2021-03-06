const mariadb = require("mariadb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Écoute du serveur
app.listen(8080, () => {
  console.log("Serveur à l'écoute");
});

// Connexion à la base de données
mariadb
  .createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PWD,
    // database: process.env.DB_NAME,
    host: "obiwan2.univ-brest.fr",
    user: "zgarciach",
    password: "h6wdk9yr",
    database: "zil3-zgarciach",
  })
  .then((conn) => {
    // ========================================
    // Méthodes GET
    // =========================================

    // Récupérer tous les UFRs
    app.get("/ufr", (req, res) => {
      const query = "select * from UFR";
      requete(conn, res, query);
    });

    // Récupérer tous les sites
    app.get("/siteuniv", (req, res) => {
      const query = "select * from SITE_UNIV";
      requete(conn, res, query);
    });

    // Récupérer tous les parcours
    app.get("/parcours", (req, res) => {
      const query = "select * from PARCOURS";
      requete(conn, res, query);
    });

    // Récupérer tous les formations
    app.get("/formation", (req, res) => {
      const query = "select * from FORMATION";
      requete(conn, res, query);
    });

    // Récupérer tous les effectifs
    app.get("/effectif", (req, res) => {
      const query = "select * from EFFECTIF";
      requete(conn, res, query);
    });

    // Récupérer tous les départements
    app.get("/departement", (req, res) => {
      const query = "select * from DEPARTEMENT";
      requete(conn, res, query);
    });

    // Récupérer tous les démographies
    app.get("/demographie", (req, res) => {
      const query = "select * from DEMOGRAPHIE";
      requete(conn, res, query);
    });

    // Récupérer un UFR en particulier
    app.get("/ufr/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from UFR where idUFR = " + id;
      requete(conn, res, query);
    });

    // Récupérer un site en particulier
    app.get("/siteuniv/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from SITE_UNIV where idSite = " + id;
      requete(conn, res, query);
    });

    // Récupérer un parcours en particulier
    app.get("/parcours/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from PARCOURS where idParcours = " + id;
      requete(conn, res, query);
    });

    // Récupérer une formation en particulier
    app.get("/formation/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from FORMATION where idFormation = " + id;
      requete(conn, res, query);
    });

    // Récupérer un effectif en particulier
    app.get("/effectif/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from EFFECTIF where idEffectif = " + id;
      requete(conn, res, query);
    });

    // Récupérer un département en particulier
    app.get("/departement/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from DEPARTEMENT where idDepartement = " + id;
      requete(conn, res, query);
    });

    // Récupérer une démographie en particulier
    app.get("/demographie/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from DEMOGRAPHIE where idDemographie = " + id;
      requete(conn, res, query);
    });

    // ========================================
    // Méthodes POST
    // =========================================

    // Insérer un nouvel UFR
    app.post("/ufr", (req, res) => {
      const query =
        "INSERT INTO UFR (idUFR, nomUFR, nomUFR_Court) VALUES ('" +
        req.body.idUFR +
        "', '" +
        req.body.nomUFR +
        "', '" +
        req.body.nomUFR_Court +
        "');";
      requete(conn, res, query);
    });

    // Insérer un nouveau site
    app.post("/siteuniv", (req, res) => {
      const query =
        "INSERT INTO SITE_UNIV (idSite, nomSite) VALUES ('" +
        req.body.idSite +
        "', '" +
        req.body.nomSite +
        "');";
      requete(conn, res, query);
    });

    // Insérer un nouveau parcours
    app.post("/parcours", (req, res) => {
      const query =
        "INSERT INTO PARCOURS (idParcours, nomParcours) VALUES ('" +
        req.body.idParcours +
        "', '" +
        req.body.nomParcours +
        "');";
      requete(conn, res, query);
    });

    // Insérer une nouvelle formation
    app.post("/formation", (req, res) => {
      const query =
        "INSERT INTO FORMATION (idFormation, type, niveau, Parcours_idParcours, Departement_idDepartement) VALUES ('" +
        req.body.idFormation +
        "', '" +
        req.body.type +
        "', '" +
        req.body.niveau +
        "', '" +
        req.body.Parcours_idParcours +
        "', '" +
        req.body.Departement_idDepartement +
        "');";
      requete(conn, res, query);
    });

    // Insérer unun nouvel effectif
    app.post("/effectif", (req, res) => {
      const query =
        "INSERT INTO EFFECTIF (anneeRef, effectif, Demographie_idDemographie, Formation_idFormation) VALUES ('" +
        req.body.anneeRef +
        "', '" +
        req.body.effectif +
        "', '" +
        req.body.Demographie_idDemographie +
        "', '" +
        req.body.Formation_idFormation +
        "');";
      requete(conn, res, query);
    });

    // Insérer un nouveau département
    app.post("/departement", (req, res) => {
      const query =
        "INSERT INTO DEPARTEMENT (idDepartement, nomDepartement, nomDepartement_Court, UFR_idUFR) VALUES ('" +
        req.body.idDepartement +
        "', '" +
        req.body.nomDepartement +
        "', '" +
        req.body.nomDepartement_Court +
        "', '" +
        req.body.UFR_idUFR +
        "');";
      requete(conn, res, query);
    });

    // Insérer une nouvelle démographie
    app.post("/demographie", (req, res) => {
      const query =
        "INSERT INTO DEMOGRAPHIE (idDemographie, ageDemographie, anneeDemographie, nbPersonnes) VALUES ('" +
        req.body.idDemographie +
        "', '" +
        req.body.ageDemographie +
        "', '" +
        req.body.anneeDemographie +
        "', '" +
        req.body.nbPersonnes +
        "');";
      requete(conn, res, query);
    });

    // ========================================
    // Méthodes PUT
    // =========================================

    // Mettre à jour les informations d'un UFR
    app.put("/ufr/:id", (req, res) => {
      const id = parseInt(req.params.id);
      var query = "";

      let nomUFR =
        req.body.nomUFR !== undefined
          ? " nomUFR = '" + req.body.nomUFR + "' "
          : "";

      let nomUFR_Court = "";
      if (req.body.nomUFR_Court !== undefined) {
        if (nomUFR !== "")
          nomUFR_Court = ", nomUFR_Court = '" + req.body.nomUFR_Court + "'";
        else nomUFR_Court = " nomUFR_Court = '" + req.body.nomUFR_Court + "'";
      }
      let idUFR = " WHERE idUFR = " + id + ";";

      if (nomUFR !== "" || nomUFR_Court !== "") {
        query = "UPDATE UFR SET" + nomUFR + nomUFR_Court + idUFR;
      }

      requete(conn, res, query);
    });

    // Mettre à jour les informations d'un site
    app.put("/siteuniv/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query =
        req.body.nomSite !== undefined
          ? "UPDATE SITE_UNIV SET nomSite = '" +
            req.body.nomSite +
            "' WHERE idSite = " +
            id +
            ";"
          : "";
      requete(conn, res, query);
    });

    app.put("/parcours/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query =
        req.body.nomParcours !== undefined
          ? "UPDATE PARCOURS SET nomParcours = '" +
            req.body.nomParcours +
            "' WHERE idParcours = " +
            id +
            ";"
          : "";
      requete(conn, res, query);
    });

    // Mettre à jour les informations d'une formation
    app.put("/formation/:id", (req, res) => {
      const id = parseInt(req.params.id);
      var query = "";

      let type =
        req.body.type !== undefined ? " type = '" + req.body.type + "' " : "";

      let niveau = "";
      if (req.body.niveau !== undefined) {
        if (type !== "") niveau = ", niveau = '" + req.body.niveau + "'";
        else niveau = " niveau = '" + req.body.niveau + "'";
      }

      let Parcours_idParcours = "";
      if (req.body.Parcours_idParcours !== undefined) {
        if (type !== "" && niveau !== "")
          Parcours_idParcours =
            ", Parcours_idParcours = '" + req.body.Parcours_idParcours + "'";
        else
          Parcours_idParcours =
            " Parcours_idParcours = '" + req.body.Parcours_idParcours + "'";
      }

      let Departement_idDepartement = "";
      if (req.body.Departement_idDepartement !== undefined) {
        if (type !== "" && niveau !== "" && Parcours_idParcours !== "")
          Departement_idDepartement =
            ", Departement_idDepartement = '" +
            req.body.Departement_idDepartement +
            "'";
        else
          Departement_idDepartement =
            " Departement_idDepartement = '" +
            req.body.Departement_idDepartement +
            "'";
      }

      let idFormation = " WHERE idFormation = " + id + ";";
      if (
        type !== "" ||
        niveau !== "" ||
        Parcours_idParcours !== "" ||
        Departement_idDepartement !== ""
      ) {
        query =
          "UPDATE FORMATION SET" +
          type +
          niveau +
          Parcours_idParcours +
          Departement_idDepartement +
          idFormation;
      }

      requete(conn, res, query);
    });

    // Mettre à jour les informations d'un effectif
    app.put("/effectif/:idFormation/:anneeRef", (req, res) => {
      const idFormation = parseInt(req.params.idFormation);
      const anneeRef = parseInt(req.params.anneeRef);
      var query = "";

      let effectif =
        req.body.effectif !== undefined
          ? " effectif = '" + req.body.effectif + "'"
          : "";

      let idDemographie = "";
      if (req.body.Demographie_idDemographie !== undefined) {
        if (effectif !== "")
          idDemographie =
            ", Demographie_idDemographie = '" +
            req.body.Demographie_idDemographie +
            "'";
        else
          idDemographie =
            " Demographie_idDemographie = '" +
            req.body.Demographie_idDemographie +
            "'";
      }

      let idEffectif =
        " WHERE idFormation = " +
        idFormation +
        " AND anneeRef = '" +
        anneeRef +
        "';";
      if (effectif !== "" || idDemographie !== "") {
        query = "UPDATE EFFECTIF SET" + effectif + idDemographie + idEffectif;
      }

      requete(conn, res, query);
    });

    // Mettre à jour les informations d'un département
    app.put("/departement/:id", (req, res) => {
      const id = parseInt(req.params.id);
      var query = "";

      let nomDepartement =
        req.body.nomDepartement !== undefined
          ? " nomDepartement = '" + req.body.nomDepartement + "'"
          : "";

      let nomDepartement_Court = "";
      if (req.body.nomDepartement_Court !== undefined) {
        if (nomDepartement !== "")
          nomDepartement_Court =
            ", nomDepartement_Court = '" + req.body.nomDepartement_Court + "'";
        else
          nomDepartement_Court =
            " nomDepartement_Court = '" + req.body.nomDepartement_Court + "'";
      }

      let idUFR = "";
      if (req.body.idUFR !== undefined) {
        if (nomDepartement !== "" || nomDepartement_Court !== "")
          idUFR = ", UFR_idUFR = '" + req.body.UFR_idUFR + "'";
        else idUFR = " UFR_idUFR = '" + req.body.UFR_idUFR + "'";
      }

      let idEffectif = " WHERE idDepartement = '" + id + "';";
      if (
        nomDepartement !== "" ||
        nomDepartement_Court !== "" ||
        idUFR !== ""
      ) {
        query =
          "UPDATE DEPARTEMENT SET" +
          nomDepartement +
          nomDepartement_Court +
          idUFR +
          idEffectif;
      }

      requete(conn, res, query);
    });

    // ========================================
    // Méthodes DELETE
    // =========================================

    // Supprimer un département
    app.delete("/departement/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query =
        "DELETE FROM DEPARTEMENT WHERE idDepartement = '" + id + "';";
      requete(conn, res, query);
    });
  })
  .catch((err) => {
    // En cas d'erreur : affiche l'erreur
    console.log(err);
  });

/**
 * La fonction permettant d'exécuter la requête sur la base de données.
 */
function requete(conn, res, query) {
  conn
    .query(query)
    .then((rows) => {
      res.status(200).json(rows);
      console.log(rows);
    })
    .catch((err) => {
      console.log(err);
    });
}
