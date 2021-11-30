import React, { Component } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Image,
  Dropdown,
} from "react-bootstrap";
import AffichageDepartements from "../composants/AffichageDepartements";
import "../style/Departement.css";
import retirer from "../data/retirer.png";

export default class Departement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ajoutEnCours: false,
      ufrs: [],
      departements: [],
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

  getDepartements() {
    fetch("http://localhost:8080/departement")
      .then((res) => res.json())
      .then(
        (result) => {
          var listeDepartements = [];
          result.map((dept) => {
            listeDepartements.push({
              id: dept.idDepartement,
              nom: dept.nomDepartement,
              nomCourt: dept.nomDepartement_Court,
              UFR_idUFR: dept.UFR_idUFR,
            });
          });
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

  componentDidMount() {
    this.getDepartements();

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

  ajouterDepartement() {
    let idOK = true;
    let IDs = "";
    for (let i = 0; i < this.state.departements.length; i++) {
      if (this.state.departementTmp.id === this.state.departements[i].id) {
        idOK = false;
      }
      IDs += " " + this.state.departements[i].id;
    }

    // Vérification de l'unicité de l'ID, de sa valeur positive, et de la saisie du nom, du nom court et de l'UFR
    if (
      idOK &&
      this.state.departementTmp.id > 0 &&
      this.state.departementTmp.nom.length > 0 &&
      this.state.departementTmp.nomCourt.length > 0 &&
      this.state.departementTmp.UFR_idUFR > 0
    ) {
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
      alert(
        "Vérifiez la saisie du nom, du nom court, de l'identifiant (doit être strictement positif et unique) et de l'UFR.\nIDs existants :" +
          IDs +
          "."
      );
    }
  }

  retirerDepartement(idDept) {
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
        <h1>Liste des départements</h1>
        <AffichageDepartements
          texte="Affichage des départements"
          departements={this.state.departements}
        />

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

        <Button
          variant="warning"
          onClick={() => this.setState({ ajoutEnCours: true })}
        >
          Ajouter un département
        </Button>
        {this.state.ajoutEnCours && (
          <div>
            <br />
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

            <Button variant="warning" onClick={this.ajouterDepartement}>
              Valider
            </Button>
          </div>
        )}
      </div>
    );
  }
}
