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
      formationsChoisies: [],
    };

    this.ajouterFormation = this.ajouterFormation.bind(this);
  }

  ajouterFormation(idParcours, idFormation) {
    console.log("test");
  }

  render() {
    return (
      <div className="principal-effectif">
        <div className="panels-formation">
          <FormationsChoisies
            formations={this.state.formationsChoisies}
            ajouterFormation={this.ajouterFormation}
          />
          <AffichageEffectifs />
          <SelectionFormation />
        </div>
      </div>
    );
  }
}
