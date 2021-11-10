import React, { Component } from "react";
import AffichageDepartements from "../composants/AffichageDepartements";
import "../style/Departement.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";

export default class Departement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ajoutEnCours: false,
      departements: [],
      departementTmp: {
        nom: "",
        nomCourt: "",
      },
    };

    this.ajouterDepartement = this.ajouterDepartement.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8080/departement")
      .then((res) => res.json())
      .then(
        (result) => {
          var listeDepartements = [];
          result.map((dept) => {
            listeDepartements.push({
              nom: dept.nomDepartement,
              nomCourt: dept.nomDepartement_Court,
            });
          });
          this.setState({ departements: listeDepartements });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );
  }

  ajouterDepartement() {
    console.log("ajout d'un département...");
    var nouvelleListe = this.state.departements;
    nouvelleListe.push({
      nom: this.state.departementTmp.nom,
      nomCourt: this.state.departementTmp.nomCourt,
    });
    this.setState({
      ajoutEnCours: false,
      departements: this.state.departements.concat(this.state.departementTmp),
      departementTmp: {
        nom: "",
        nomCourt: "",
      },
    });
  }

  render() {
    return (
      <div className="principal-departement">
        <h1>Liste des départements</h1>
        <AffichageDepartements
          texte="Affichage des départements"
          departements={this.state.departements}
        />
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
              <InputGroup.Text id="inputGroup-sizing-sm">Nom</InputGroup.Text>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(event) => {
                  this.setState({
                    departementTmp: {
                      nom: event.target.value,
                      nomCourt: this.state.departementTmp.nomCourt,
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
                      nom: this.state.departementTmp.nom,
                      nomCourt: event.target.value,
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
            <Button variant="outline-warning" onClick={this.ajouterDepartement}>
              Valider
            </Button>
          </div>
        )}
      </div>
    );
  }
}
