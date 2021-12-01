import React, { Component } from "react";
import "../style/Parcours.css";

export default class Parcours extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="principal-parcours">
        {/* Titre de la page */}
        <h1>Liste de tous les parcours</h1>

        {/* Texte temporaire */}
        <p>Affichage des parcours...</p>
      </div>
    );
  }
}
