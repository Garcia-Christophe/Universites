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
            <FormationsChoisies formations={this.state.formations} />
          )}
          <AffichageEffectifs />
          <SelectionFormation />
        </div>
      </div>
    );
  }
}
