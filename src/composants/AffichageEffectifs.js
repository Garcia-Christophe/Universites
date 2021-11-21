import React, { Component } from "react";
import "../style/AffichageEffectifs.css";

export default class AffichageEffectifs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="div-principal-affichage-effectifs">
        <h2>Effectifs</h2>
        <p>Affichage du tableau ou du graphique...</p>
      </div>
    );
  }
}
