import React, { Component } from "react";

export default class AffichageDepartements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departements: props.departements,
    };
  }

  render() {
    const listeDepartements = this.state.departements.map((d) => (
      <li key={d.id}>
        {d.nom} {d.nomCourt}
      </li>
    ));

    return (
      <div>
        <ul>{listeDepartements}</ul>
      </div>
    );
  }
}
