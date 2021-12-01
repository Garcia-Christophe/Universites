import React, { Component } from "react";
import { Button, Dropdown } from "react-bootstrap";
import "../style/SelectionFormation.css";

export default class SelectionFormation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Données de la BDD
      ufrs: [],
      departements: [],
      parcours: [],
      parcoursPossibles: [], // Liste adaptée pour le tri par département
      formations: [],

      // Identifiants choisis de chaque liste
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

  /**
   * Méthode exécutée une seule fois après le 1er render.
   */
  componentDidMount() {
    // Récupère tous les UFRs
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

    // Récupère tous les départements
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

    // Récupère toutes les formations
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

    // Récupère tous les parcours
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
  }

  /**
   * Ajoute une formation dans la liste des formations choisies.
   */
  ajouterFormation() {
    // On vérifie si le parcours et la formation ont bien été choisies
    if (this.state.idParcoursChoisi === -1) {
      // Alerte l'utilisateur de la non sélection du parcours
      alert("Veuillez choisir le parcours.");
    } else if (this.state.idFormationChoisie === -1) {
      // Alerte l'utilisateur de la non sélection de la formation
      alert("Veuillez choisir la formation.");
    } else {
      // Appelle la méthode du composant parent (Effectif) pour transmettre
      // les identifians du parcours et de la formation choisis
      this.props.callback(
        this.state.idParcoursChoisi,
        this.state.idFormationChoisie
      );
    }
  }

  /**
   * Met à jour les identifiants choisis.
   * @param {*} e évènement (clic)
   * @param {*} id l'identifiant de l'UFR sélectionné
   */
  choisirUfr(e, id) {
    this.setState({
      idUfrChoisi: id,
      idDepartementChoisi: -1,
      idParcoursChoisi: -1,
      idFormationChoisie: -1,
      parcoursPossibles: [],
    });
  }

  /**
   * Met à jour les identifiants choisis et adapte la liste des parcours possible
   * suivant le département sélectionné.
   */
  choisirDepartement(e, id) {
    // On garde toutes les formations du departement choisi
    var listeFormations = this.state.formations.filter(
      (formation) => formation.Departement_idDepartement === id
    );

    // On garde juste les identifiants des parcours des formations choisies
    var idParcoursChoisis = [];
    for (let formation in listeFormations) {
      idParcoursChoisis.push(listeFormations[formation].Parcours_idParcours);
    }

    // On stocke les parcours qui correspondent aux identifiants des parcours des formations choisies
    var listeParcours = this.state.parcours.filter((parcours) =>
      idParcoursChoisis.includes(parcours.idParcours)
    );

    // Mise à jour des identifiants choisis et de la liste de parcours possibles
    this.setState({
      idDepartementChoisi: id,
      idParcoursChoisi: -1,
      idFormationChoisie: -1,
      parcoursPossibles: listeParcours,
    });
  }

  /**
   * Met à jour l'identifiant du parcours choisi
   * @param {*} e évènement (clic)
   * @param {*} id l'identifiant du parcours sélectionné
   */
  choisirParcours(e, id) {
    this.setState({ idParcoursChoisi: id, idFormationChoisie: -1 });
  }

  /**
   * Met à jour l'identifiant de la formation choisie
   * @param {*} e évènement (clic)
   * @param {*} id l'identifiant de la formation sélectionnée
   */
  choisirFormation(e, id) {
    this.setState({ idFormationChoisie: id });
  }

  render() {
    return (
      <div className="div-principal-selection-formation">
        {/* Titre de la page */}
        <div className="titre-selection-formations">
          <h2>Sélection formations</h2>
        </div>
        <br />

        {/* Toutes les listes déroulantes */}
        <div className="div-dropdowns">
          {/* Liste déroulante des UFRs */}
          <div className="div-selection">
            <p>UFR</p>
            <Dropdown>
              {/* Nom de l'UFR sélectionné */}
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.idUfrChoisi === -1
                  ? "UFR"
                  : this.state.ufrs.find(
                      (ufr) => ufr.idUFR === this.state.idUfrChoisi
                    ).nomUFR_Court}
              </Dropdown.Toggle>

              {/* Menu déroulant des UFRs */}
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

          {/* Liste déroulante des départements */}
          <div className="div-selection">
            <p>Departement</p>
            <Dropdown>
              {/* Nom du département sélectionné */}
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.idDepartementChoisi === -1
                  ? "Departement"
                  : this.state.departements.find(
                      (dept) =>
                        dept.idDepartement === this.state.idDepartementChoisi
                    ).nomDepartement_Court}
              </Dropdown.Toggle>

              {/* Menu déroulant des départements */}
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

          {/* Liste déroulante des parcours */}
          <div className="div-selection">
            <p>Parcours</p>
            <Dropdown>
              {/* Nom du parcours sélectionné */}
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.idParcoursChoisi === -1
                  ? "Parcours"
                  : this.state.parcours
                      .find(
                        (parcours) =>
                          parcours.idParcours === this.state.idParcoursChoisi
                      )
                      .nomParcours.split("(")[1]
                      .split(")")[0]}
              </Dropdown.Toggle>

              {/* Menu déroulant des parcours */}
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

          {/* Liste déroulante des formations */}
          <div className="div-selection">
            <p>Formation</p>
            <Dropdown>
              {/* Nom de la formation sélectionnée */}
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.idFormationChoisie === -1
                  ? "Formation"
                  : this.state.formations.find(
                      (formation) =>
                        formation.idFormation === this.state.idFormationChoisie
                    ).type +
                    " " +
                    this.state.formations.find(
                      (formation) =>
                        formation.idFormation === this.state.idFormationChoisie
                    ).niveau}
              </Dropdown.Toggle>

              {/* Menu déroulant des formations */}
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

        {/* Bouton permettant de finaliser l'ajout de la formation */}
        <div className="button-ajouter-formation">
          <Button variant="warning" onClick={this.ajouterFormation}>
            Ajouter une formation
          </Button>
        </div>
      </div>
    );
  }
}
