import React, { Component } from "react";
import logo from "../data/logo.png";
import "../style/Accueil.css";

export default class Accueil extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="principal-accueil">
        {/* Logo de l'image animé sur la page d'accueil */}
        <img src={logo} className="logo" alt="logo" />
        <br />

        {/* Titre de bienvenue */}
        <h3>Bienvenue sur l'application web des universités !</h3>
      </div>
    );
  }
}
