import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class SelectionFormation extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.ajouterFormation = this.ajouterFormation.bind(this);
  }

  ajouterFormation() {
    // code
  }

  render() {
    return (
      <div>
        <h2>Sélection formations</h2>
        <p>des selects...</p>
        <Button variant="warning" onClick={() => this.ajouterFormation}>
          Ajouter une formation
        </Button>
      </div>
    );
  }
}
