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
                  checked={formation.cochee}
                  onChange={() => {
                    var listeAJour = this.state.formations;
                    listeAJour.find(
                      (f) => f.idFormation === formation.idFormation
                    ).cochee = !formation.cochee;
                    this.setState({ formations: listeAJour });
                  }}
                  type="checkbox"
                />
                <p>
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
