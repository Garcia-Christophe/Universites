import React, { Component } from "react";
import AffichageUniversites from "../composants/AffichageUniversites.js";
import "../style/Universite.css";

export default class Universite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      affichage: true,
    };
  }

  render() {
    return (
      <div className="principal-universite">
        <h1>Universités de Bretagne</h1>
        <AffichageUniversites texte="Affichage des universités" />
      </div>
    );
  }
}
