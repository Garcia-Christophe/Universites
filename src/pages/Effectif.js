import React, { Component } from "react";
import AffichageEffectifs from "../composants/AffichageEffectifs.js";
import FormationsChoisies from "../composants/FormationsChoisies.js";
import SelectionFormation from "../composants/SelectionFormation.js";
import "../style/Effectif.css";

export default class Effectif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formations: [],
      parcours: [],
      effectifs: [],
      idsParcoursFormations: [],
      formationsChoisies: [],
    };
  }

  componentDidMount() {
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

    fetch("http://localhost:8080/effectif")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ effectifs: result });
          console.log("test");
          console.log(result);
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );
  }

  callbackAjouterFormation = (idParcours, idFormation) => {
    let listeIds = this.state.idsParcoursFormations;
    let formationDejaExistante = false;
    for (let i = 0; !formationDejaExistante && i < listeIds.length; i++) {
      if (
        (listeIds[i].idParcours === idParcours && listeIds[i].idFormation) ===
        idFormation
      ) {
        formationDejaExistante = true;
      }
    }
    if (!formationDejaExistante) {
      listeIds.push({
        idParcours: idParcours,
        idFormation: idFormation,
      });
    }

    let listeFormationsChoisies = [];
    for (let i = 0; i < this.state.formations.length; i++) {
      for (let j = 0; j < listeIds.length; j++) {
        if (this.state.formations[i].idFormation === listeIds[j].idFormation) {
          listeFormationsChoisies.push({
            cochee: false,
            idFormation: this.state.formations[i].idFormation,
            type: this.state.formations[i].type,
            niveau: this.state.formations[i].niveau,
            nomParcours: this.state.parcours.find(
              (parcours) => parcours.idParcours === listeIds[j].idParcours
            ).nomParcours,
          });
        }
      }
    }

    this.setState({
      idsParcoursFormations: listeIds,
      formationsChoisies: listeFormationsChoisies,
    });
  };

  cocherFormation = (id, cochee) => {
    var listeAJour = this.state.formationsChoisies;
    listeAJour.find((formation) => formation.idFormation === id).cochee =
      cochee;
    this.setState({ listeFormationsChoisies: listeAJour });
  };

  render() {
    return (
      <div className="principal-effectif">
        <div className="panels-formation">
          <FormationsChoisies
            formationsChoisies={this.state.formationsChoisies}
            cocherFormation={this.cocherFormation}
          />
          <AffichageEffectifs
            formationsChoisies={this.state.formationsChoisies}
          />
          <SelectionFormation callback={this.callbackAjouterFormation} />
        </div>
      </div>
    );
  }
}
