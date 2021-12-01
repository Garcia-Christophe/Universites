import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "../style/FormationsChoisies.css";
import retirer from "../data/retirer.png";

export default class FormationsChoisies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // liste des formations récupérées par le composant parent en propriétés
      formations: this.props.formationsChoisies,
    };
  }

  render() {
    return (
      <div className="div-principal-formations-choisies">
        {/* Titre de la page */}
        <div className="titre-formations-choisies">
          <h2>Formations choisies</h2>
        </div>
        <br />

        {/* Liste des formations choisies */}
        <ul className="liste-selection-formations">
          {this.props.formationsChoisies.map((formation) => {
            return (
              <li className="item-liste-selection-formations">
                {/* Bouton de suppression de la formation */}
                <button
                  className="button-formations-choisies"
                  onClick={() =>
                    this.props.retirerFormation(formation.idFormation)
                  }
                >
                  <Image
                    src={retirer}
                    style={{ height: "20px", width: "20px" }}
                  />
                </button>

                {/* Checkbox de la formation */}
                <input
                  className="input-liste-selection-formations"
                  checked={formation.cochee}
                  onChange={() =>
                    this.props.cocherFormation(
                      formation.idFormation,
                      !formation.cochee
                    )
                  }
                  type="checkbox"
                />

                {/* Nom de la formation */}
                <p className="text-formations-choisies">
                  {formation.type} {formation.niveau} - {formation.nomParcours}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
