import React, { Component } from "react";

export default class AffichageUniversites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texte: props.texte,
    };
  }

  render() {
    return <div>{this.state.texte}...</div>;
  }
}
