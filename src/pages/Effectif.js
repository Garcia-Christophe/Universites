import React, { Component } from "react";
import AffichageEffectifs from "../composants/AffichageEffectifs.js";
import FormationsChoisies from "../composants/FormationsChoisies.js";
import SelectionFormation from "../composants/SelectionFormation.js";
import "../style/Effectif.css";

export default class Effectif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Données récupérées depuis la base
      formations: [],
      parcours: [],
      effectifs: [],
      demographie: [],

      // Liste des identifiants parcours/formations choisis
      idsParcoursFormations: [],
      formationsChoisies: [],

      // Nombre incrémenté à chaque besoin de mise à jour du graphique
      nbMajAFaire: 0,
    };
  }

  /**
   * Méthode exécutée une seule fois après le 1er render.
   */
  componentDidMount() {
    // Récupérer tous les parcours
    fetch("http://localhost:8080/parcours")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ parcours: result });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );

    // Récupérer toutes les formations
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

    // Récupérer tous les effectifs
    fetch("http://localhost:8080/effectif")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ effectifs: result });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );

    // Récupérer toutes les démographies
    fetch("http://localhost:8080/demographie")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ demographie: result });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );
  }

  /**
   * Méthode appelée par un composant enfant lorsque son formulaire a été rempli.
   * @param {*} idParcours l'identifiant du parcours choisi
   * @param {*} idFormation l'identifiant de la formation choisie
   */
  callbackAjouterFormation = (idParcours, idFormation) => {
    // On vérifie si la formation n'a pas déjà été ajoutée
    let listeIds = this.state.idsParcoursFormations;
    let formationDejaExistante = false;
    for (let i = 0; !formationDejaExistante && i < listeIds.length; i++) {
      if (
        listeIds[i].idParcours === idParcours &&
        listeIds[i].idFormation === idFormation
      ) {
        formationDejaExistante = true;
      }
    }
    // Si la formation n'a pas encore été ajoutée, l'ajoute
    if (!formationDejaExistante) {
      // Mise à jour de la liste des identifiants parcours/formations
      listeIds.push({
        idParcours: idParcours,
        idFormation: idFormation,
      });

      // On récupère toutes les informations nécessaires de la nouvelle formation grâce à son ID
      let listeFormationsChoisies = this.state.formationsChoisies;
      let nouvelleFormation = null;
      for (let i = 0; i < this.state.formations.length; i++) {
        for (let j = 0; j < listeIds.length; j++) {
          if (
            this.state.formations[i].idFormation === idFormation &&
            this.state.formations[i].Parcours_idParcours === idParcours
          ) {
            nouvelleFormation = {
              cochee: false,
              idFormation: this.state.formations[i].idFormation,
              type: this.state.formations[i].type,
              niveau: this.state.formations[i].niveau,
              nomParcours: this.state.parcours.find(
                (parcours) => parcours.idParcours === listeIds[j].idParcours
              ).nomParcours,
            };
          }
        }
      }
      listeFormationsChoisies.push(nouvelleFormation);

      // On met à jour la liste des formations choisies
      this.setState({
        idsParcoursFormations: listeIds,
        formationsChoisies: listeFormationsChoisies,
      });
    }
  };

  /**
   * Informe le graphique s'il faut afficher ou non la formation lors du clic sur la checkbox.
   * @param {*} id l'identifiantde la formation cochée/décochée
   * @param {*} cochee true si l'utilisateur a coché, false sinon
   */
  cocherFormation = (id, cochee) => {
    // Mise à jour de l'état de la formation (cochée/décochée)
    var listeAJour = this.state.formationsChoisies;
    listeAJour.find((formation) => formation.idFormation === id).cochee =
      cochee;

    // Mise à jour de la liste des formations, et incrémentation du nombre de mises à jour du graphique
    this.setState({
      formationsChoisies: listeAJour,
      nbMajAFaire: this.state.nbMajAFaire + 1,
    });
  };

  /**
   * Supprime la formation des formations choisies, et informe le graphe de cette suppression.
   * @param {*} id l'identifiant de la formation à supprimer
   */
  retirerFormation = (id) => {
    // Suppression de la formation de la liste des formations choisies
    var listeFormationsAJour = this.state.formationsChoisies.filter(
      (formation) => formation.idFormation !== id
    );

    // Suppression de la formation de la liste des identifiants parcours/formations
    var listeIds = this.state.idsParcoursFormations.filter(
      (element) => element.idFormation !== id
    );

    // Mise à jour des 2 listes, et demande au graphe de tenir compte de cette suppression
    this.setState({
      formationsChoisies: listeFormationsAJour,
      idsParcoursFormations: listeIds,
      nbMajAFaire: this.state.nbMajAFaire + 1,
    });
  };

  render() {
    return (
      <div className="principal-effectif">
        <div className="panels-formation">
          {/* Composant enfant : liste des formations ajoutées */}
          <FormationsChoisies
            formationsChoisies={this.state.formationsChoisies}
            cocherFormation={this.cocherFormation}
            retirerFormation={this.retirerFormation}
          />

          {/* Composant enfant : affichage des effectifs (graphique) uniquement si la liaison avec la BDD s'est bien passée */}
          {this.state.effectifs.length > 0 &&
            this.state.demographie.length > 0 && (
              <AffichageEffectifs
                effectifs={this.state.effectifs}
                demographie={this.state.demographie}
                formationsChoisies={this.state.formationsChoisies}
                nbMajAFaire={this.state.nbMajAFaire}
              />
            )}

          {/* Composant enfant : formulaire d'ajout des formations */}
          <SelectionFormation callback={this.callbackAjouterFormation} />
        </div>
      </div>
    );
  }
}
