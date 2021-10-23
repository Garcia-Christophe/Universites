import React, { Component } from "react";
import logo from "../data/logo.png";
import "../style/Accueil.css";

export default class Accueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      affichage: true,
    };
  }

  render() {
    return (
      <div className="principal-accueil">
        <img src={logo} className="logo" alt="logo" />
        <p>Bienvenue sur l'application web des universités !</p>
        <br />
        <p>Pour les consulter, cliquez ici :</p>
        <a className="lienUniversites" href="/universites">
          Universités
        </a>
      </div>
    );
  }
}
