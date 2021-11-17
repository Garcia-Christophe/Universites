import React, { Component } from "react";
import AffichageEffectifs from "../composants/AffichageEffectifs.js";
import FormationsChoisies from "../composants/FormationsChoisies.js";
import SelectionFormation from "../composants/SelectionFormation.js";
import "../style/Effectif.css";

export default class Effectif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      affichage: true,
      formations: [
        {
          idFormation: 0,
          type: null,
          niveau: null,
        },
      ],
    };
  }

  componentDidMount() {
    var listeParcours = [];
    fetch("http://localhost:8080/parcours")
      .then((res) => res.json())
      .then(
        (result) => {
          listeParcours = result;
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );

    fetch("http://localhost:8080/formation")
      .then((res) => res.json())
      .then(
        (result) => {
          var listeFormations = [];
          result.map((formation) => {
            listeFormations.push({
              idFormation: formation.idFormation,
              type: formation.type,
              niveau: formation.niveau,
              nomParcours: listeParcours.find(
                (p) => p.idParcours === formation.Parcours_idParcours
              ).nomParcours,
              cochee: false,
            });
          });
          this.setState({ formations: listeFormations });
        },
        (error) => {
          console.log("Erreur : " + error);
        }
      );
  }

  render() {
    return (
      <div className="principal-effectif">
        <div className="panels-formation">
          {this.state.formations[0].idFormation !== 0 && (
            <FormationsChoisies
              style={{ width: "33%" }}
              formations={this.state.formations}
            />
          )}
          <AffichageEffectifs style={{ width: "33%" }} />
          <SelectionFormation style={{ width: "33%" }} />
        </div>
      </div>
    );
  }
}
