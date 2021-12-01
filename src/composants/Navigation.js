import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "../data/logo.png";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          {/* Logo et Nom de l'application */}
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Universités
          </Navbar.Brand>

          {/* Reste de la barre de navigation */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Pages secondaires */}
            <Nav className="me-auto">
              <Nav.Link href="/effectifs">Effectifs</Nav.Link>
              <Nav.Link href="/departements">Départements</Nav.Link>
              <Nav.Link href="/parcours">Parcours</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Sites</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">UFRs</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Formations
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Démographies
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Barre de recherche */}
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Chercher"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Chercher</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
