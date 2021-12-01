import React, { Component } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Image,
  Dropdown,
} from "react-bootstrap";
import "../style/Departement.css";
import retirer from "../data/retirer.png";

export default class Departement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Si true affiche le formulaire, sinon le cache
      ajoutEnCours: false,

      // Données de la BDD
      ufrs: [],
      departements: [],

      // Informations du département en cours d'ajout
      departementTmp: {
        id: -1,
        nom: "",
        nomCourt: "",
        UFR_idUFR: -1,
      },
    };

    this.ajouterDepartement = this.ajouterDepartement.bind(this);
    this.retirerDepartement = this.retirerDepartement.bind(this);
  }

  /**
   * Met à jour la liste des départements (récupère depuis la base de données).
   */
  getDepartements() {
    fetch("http://localhost:8080/departement")
      .then((res) => res.json())
      .then(
        (result) => {
          // Conversion des données pour mieux les manipuler
          var listeDepartements = [];
          result.map((dept) => {
            listeDepartements.push({
              id: dept.idDepartement,
              nom: dept.nomDepartement,
              nomCourt: dept.nomDepartement_Court,
              UFR_idUFR: dept.UFR_idUFR,
            });
          });

          // Mise à jour de la liste des départements
          // Remise à zéro des informations du département en cours de création
          // Mise à jour de l'état de la création
          this.setState({
            departements: listeDepartements,
            departementTmp: {
              id: -1,
              nom: "",
              nomCourt: "",
              UFR_idUFR: -1,
            },
            ajoutEnCours: false,
          });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );
  }

  /**
   * Méthode exécutée une seule fois après le 1er render.
   */
  componentDidMount() {
    // Récupère tous les départements de la base
    this.getDepartements();

    // Récupère tous les UFRs de la base
    fetch("http://localhost:8080/ufr")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ ufrs: result });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );
  }

  /**
   * Ajoute un département dans la base de données.
   */
  ajouterDepartement() {
    // On vérifie si l'identifiant n'est pas déjà pris par un autre département (celui-ci doit être unique dans la base)
    let idOK = true;
    let IDs = "";
    for (let i = 0; i < this.state.departements.length; i++) {
      if (this.state.departementTmp.id === this.state.departements[i].id) {
        idOK = false;
      }
      IDs += " " + this.state.departements[i].id;
    }

    // On vérifie li l'ID est unique, poisitif, et si la saisie du nom, du nom court et de l'UFR ont été faites
    if (
      idOK &&
      this.state.departementTmp.id > 0 &&
      this.state.departementTmp.nom.length > 0 &&
      this.state.departementTmp.nomCourt.length > 0 &&
      this.state.departementTmp.UFR_idUFR > 0
    ) {
      // Envoie une requête d'insertion à l'API
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idDepartement: this.state.departementTmp.id,
          nomDepartement: this.state.departementTmp.nom,
          nomDepartement_Court: this.state.departementTmp.nomCourt,
          UFR_idUFR: this.state.departementTmp.UFR_idUFR,
        }),
      };
      fetch("http://localhost:8080/departement", requestOptions).then(
        this.getDepartements()
      );
    } else {
      // Sinon alerte l'utilisateur d'une information manquante/gênante
      alert(
        "Vérifiez la saisie du nom, du nom court, de l'identifiant (doit être strictement positif et unique) et de l'UFR.\nIDs existants :" +
          IDs +
          "."
      );
    }
  }

  /**
   * Supprime le département de la base de données
   * @param {*} idDept l'identifiant du département à supprimer
   */
  retirerDepartement(idDept) {
    // Envoie une requête de suppression à l'API
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8080/departement/" + idDept, requestOptions).then(
      (res) => {
        this.getDepartements();
      }
    );
  }

  render() {
    return (
      <div className="principal-departement">
        {/* Titre de la page */}
        <h1>Liste des départements</h1>

        {/* Affichage de la liste des départements avec un bouton pour pouvoir les supprimer et leur nom */}
        <ul className="liste-affichage-departements">
          {this.state.departements.map((dept) => {
            return (
              <li className="item-liste-affichage-departements">
                <button
                  className="button-affichage-departements"
                  onClick={() => this.retirerDepartement(dept.id)}
                >
                  <Image
                    src={retirer}
                    style={{ height: "20px", width: "20px" }}
                  />
                </button>
                <p className="text-affichage-departements">
                  {dept.nom} ({dept.nomCourt})
                </p>
              </li>
            );
          })}
        </ul>

        {/* Bouton permettant d'afficher le formulaire d'ajout d'un nouveau département */}
        <Button
          variant="warning"
          onClick={() => this.setState({ ajoutEnCours: true })}
        >
          Ajouter un département
        </Button>

        {/* Formulaire d'ajout d'un nouveau département */}
        {this.state.ajoutEnCours && (
          <div>
            <br />
            {/* Saisie de lidentifiant */}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">ID</InputGroup.Text>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(event) => {
                  this.setState({
                    departementTmp: {
                      id: parseInt(event.target.value),
                      nom: this.state.departementTmp.nom,
                      nomCourt: this.state.departementTmp.nomCourt,
                      UFR_idUFR: this.state.departementTmp.UFR_idUFR,
                    },
                  });
                }}
                value={
                  this.state.departementTmp.id
                    ? this.state.departementTmp.id
                    : ""
                }
              />
            </InputGroup>

            {/* Saisie du nom */}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">Nom</InputGroup.Text>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(event) => {
                  this.setState({
                    departementTmp: {
                      id: this.state.departementTmp.id,
                      nom: event.target.value,
                      nomCourt: this.state.departementTmp.nomCourt,
                      UFR_idUFR: this.state.departementTmp.UFR_idUFR,
                    },
                  });
                }}
                value={
                  this.state.departementTmp.nom
                    ? this.state.departementTmp.nom
                    : ""
                }
              />
            </InputGroup>

            {/* Saisie du nom court */}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Nom court
              </InputGroup.Text>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(event) => {
                  this.setState({
                    departementTmp: {
                      id: this.state.departementTmp.id,
                      nom: this.state.departementTmp.nom,
                      nomCourt: event.target.value,
                      UFR_idUFR: this.state.departementTmp.UFR_idUFR,
                    },
                  });
                }}
                value={
                  this.state.departementTmp.nomCourt
                    ? this.state.departementTmp.nomCourt
                    : ""
                }
              />
            </InputGroup>

            {/* Saisie de l'UFR */}
            <div className="div-selection-ufr">
              <p>UFR</p>
              <Dropdown>
                <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                  {this.state.departementTmp.UFR_idUFR === -1
                    ? "UFR"
                    : this.state.ufrs.find(
                        (ufr) =>
                          ufr.idUFR === this.state.departementTmp.UFR_idUFR
                      ).nomUFR_Court}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.state.ufrs.map((ufr) => {
                    return (
                      <Dropdown.Item
                        onClick={(event) =>
                          this.setState({
                            departementTmp: {
                              id: this.state.departementTmp.id,
                              nom: this.state.departementTmp.nom,
                              nomCourt: this.state.departementTmp.nomCourt,
                              UFR_idUFR: ufr.idUFR,
                            },
                          })
                        }
                      >
                        {ufr.nomUFR_Court}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Bouton validant la création du département */}
            <Button variant="warning" onClick={this.ajouterDepartement}>
              Valider
            </Button>
          </div>
        )}
      </div>
    );
  }
}
