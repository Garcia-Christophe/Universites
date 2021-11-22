import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "../style/FormationsChoisies.css";
import retirer from "../data/retirer.png";

export default class FormationsChoisies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formations: this.props.formationsChoisies,
    };
  }

  render() {
    return (
      <div className="div-principal-formations-choisies">
        <h2>Formations choisies</h2>
        <ul className="liste-selection-formations">
          {this.props.formationsChoisies.map((formation) => {
            return (
              <li className="item-liste-selection-formations">
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
                <p className="text-formations-choisies">
                  {formation.type} {formation.niveau} -{" "}
                  {formation.nomParcours.split("(")[1].split(")")[0]}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
