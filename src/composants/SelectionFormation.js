import React, { Component } from "react";
import { Button, Dropdown } from "react-bootstrap";
import "../style/SelectionFormation.css";

export default class SelectionFormation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ufrs: [],
      departements: [],
      parcours: [],
      parcoursPossibles: [],
      formations: [],
      idUfrChoisi: -1,
      idDepartementChoisi: -1,
      idParcoursChoisi: -1,
      idFormationChoisie: -1,
    };

    this.ajouterFormation = this.ajouterFormation.bind(this);
    this.choisirUfr = this.choisirUfr.bind(this);
    this.choisirDepartement = this.choisirDepartement.bind(this);
    this.choisirParcours = this.choisirParcours.bind(this);
    this.choisirFormation = this.choisirFormation.bind(this);
  }

  componentDidMount() {
    // on récupère toutes les données pouvant être utiles
    // puis on affichera seulement celle qui corresponde au choix de l'utilisateur

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

    fetch("http://localhost:8080/departement")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ departements: result });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );

    fetch("http://localhost:8080/parcours")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ parcours: result, parcoursPossibles: result });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );

    fetch("http://localhost:8080/formation")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ formations: result });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );
  }

  ajouterFormation() {
    if (this.state.idParcoursChoisi === -1) {
      alert("Veuillez choisir le parcours.");
    } else if (this.state.idFormationChoisie === -1) {
      alert("Veuillez choisir la formation.");
    } else {
      //this.props.ajouterFormation();
    }
    // reussir à renvoyer la formation à FormationChoisies (passer par Effectif ? je sais pas)
  }

  choisirUfr(e, id) {
    this.setState({
      idUfrChoisi: id,
      idDepartementChoisi: -1,
      idParcoursChoisi: -1,
      idFormationChoisie: -1,
      parcoursPossibles: [],
    });
  }

  choisirDepartement(e, id) {
    // toutes les formations du departement choisi
    var listeFormations = this.state.formations.filter(
      (formation) => formation.Departement_idDepartement === id
    );

    // liste des ids des parcours choisis (liste des Parcours_idParcours de listeFormations (uniques))
    var idParcoursChoisis = [];
    for (let formation in listeFormations) {
      idParcoursChoisis.push(listeFormations[formation].Parcours_idParcours);
    }

    // tous les parcours de la listeFormations
    var listeParcours = this.state.parcours.filter((parcours) =>
      idParcoursChoisis.includes(parcours.idParcours)
    );

    this.setState({
      idDepartementChoisi: id,
      idParcoursChoisi: -1,
      idFormationChoisie: -1,
      parcoursPossibles: listeParcours,
    });
  }

  choisirParcours(e, id) {
    this.setState({ idParcoursChoisi: id, idFormationChoisie: -1 });
  }

  choisirFormation(e, id) {
    this.setState({ idFormationChoisie: id });
  }

  render() {
    return (
      <div className="div-principal-selection-formation">
        <h2>Sélection formations</h2>
        <br />

        <div className="div-dropdowns">
          <div className="div-selection">
            <p>UFR</p>
            <Dropdown>
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.idUfrChoisi === -1
                  ? "UFR"
                  : this.state.ufrs.find(
                      (ufr) => ufr.idUFR === this.state.idUfrChoisi
                    ).nomUFR_Court}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.ufrs.map((ufr) => {
                  return (
                    <Dropdown.Item
                      onClick={(event) => this.choisirUfr(event, ufr.idUFR)}
                    >
                      {ufr.nomUFR_Court}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="div-selection">
            <p>Departement</p>
            <Dropdown>
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.idDepartementChoisi === -1
                  ? "Departement"
                  : this.state.departements.find(
                      (dept) =>
                        dept.idDepartement === this.state.idDepartementChoisi
                    ).nomDepartement_Court}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.departements
                  .filter(
                    (dept) =>
                      this.state.idUfrChoisi === -1 ||
                      this.state.idUfrChoisi === dept.UFR_idUFR
                  )
                  .map((departement) => {
                    return (
                      <Dropdown.Item
                        onClick={(event) =>
                          this.choisirDepartement(
                            event,
                            departement.idDepartement
                          )
                        }
                      >
                        {departement.nomDepartement} (
                        {departement.nomDepartement_Court})
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="div-selection">
            <p>Parcours</p>
            <Dropdown>
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.idParcoursChoisi === -1
                  ? "Parcours"
                  : this.state.parcours.find(
                      (parcours) =>
                        parcours.idParcours === this.state.idParcoursChoisi
                    ).nomParcours}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.parcoursPossibles.map((parcours) => {
                  return (
                    <Dropdown.Item
                      onClick={(event) =>
                        this.choisirParcours(event, parcours.idParcours)
                      }
                    >
                      {parcours.nomParcours}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="div-selection">
            <p>Formation</p>
            <Dropdown>
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.idFormationChoisie === -1
                  ? "Formation"
                  : this.state.formations.find(
                      (formation) =>
                        formation.idFormation === this.state.idFormationChoisie
                    ).type +
                    this.state.formations.find(
                      (formation) =>
                        formation.idFormation === this.state.idFormationChoisie
                    ).niveau}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.formations
                  .filter(
                    (formation) =>
                      this.state.idParcoursChoisi ===
                      formation.Parcours_idParcours
                  )
                  .map((formation) => {
                    return (
                      <Dropdown.Item
                        onClick={(event) =>
                          this.choisirFormation(event, formation.idFormation)
                        }
                      >
                        {formation.type} {formation.niveau}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <br />

        <Button variant="warning" onClick={() => this.props.ajouterFormation()}>
          Ajouter une formation
        </Button>
      </div>
    );
  }
}
