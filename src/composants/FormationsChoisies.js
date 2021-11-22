import React, { Component } from "react";
import "../style/FormationsChoisies.css";

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
                <p>
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
