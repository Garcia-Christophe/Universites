import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import "../style/AffichageEffectifs.css";

export default class AffichageEffectifs extends Component {
  constructor(props) {
    super(props);
    let dates = [2016, 2017, 2018, 2019, 2020, 2021];

    this.state = {
      formations: this.props.formationsChoisies,
      dates: dates,
      dateDebut: dates[0],
      dateFin: dates[dates.length - 1],
      dataBar: {
        labels: dates,
        datasets: [
          {
            label: "nombre d'étudiants",
            data: [12, 19, 3, 5, 2, 3, 7, 14, 18],
            backgroundColor: [
              "rgba(255, 134, 159, 0.4)",
              "rgba(98,  182, 239, 0.4)",
              "rgba(255, 218, 128, 0.4)",
              "rgba(113, 205, 205, 0.4)",
              "rgba(170, 128, 252, 0.4)",
              "rgba(255, 177, 101, 0.4)",
              "rgba(113, 205, 205, 0.4)",
              "rgba(170, 128, 252, 0.4)",
              "rgba(255, 177, 101, 0.4)",
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)",
            ],
          },
          {
            label: "nombre d'étudiants",
            data: [12, 19, 3, 5, 2, 3, 7, 14, 18],
            backgroundColor: [
              "rgba(255, 134, 159, 0.4)",
              "rgba(98,  182, 239, 0.4)",
              "rgba(255, 218, 128, 0.4)",
              "rgba(113, 205, 205, 0.4)",
              "rgba(170, 128, 252, 0.4)",
              "rgba(255, 177, 101, 0.4)",
              "rgba(113, 205, 205, 0.4)",
              "rgba(170, 128, 252, 0.4)",
              "rgba(255, 177, 101, 0.4)",
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)",
            ],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  }

  changerDate(debut, date) {
    let dateD = debut ? date : this.state.dateDebut;
    let dateF = debut ? this.state.dateFin : date;

    let labels = [];
    for (let i = dateD; i <= dateF; i++) {
      labels.push(i);
    }

    let newDataBar = this.state.dataBar;
    newDataBar.labels = labels;
    this.setState({ dataBar: newDataBar, dateDebut: dateD, dateFin: dateF });
  }

  render() {
    return (
      <div className="div-principal-affichage-effectifs">
        <div className="titre-effectifs">
          <h2>Effectifs</h2>
        </div>
        <br />

        <div className="dates">
          <div className="div-dates">
            <p>Date de début</p>
            <Dropdown>
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.dateDebut}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.dates
                  .filter((date) => this.state.dateFin >= date)
                  .map((date) => {
                    return (
                      <Dropdown.Item
                        onClick={(event) => this.changerDate(true, date)}
                      >
                        {date}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="div-dates">
            <p>Date de fin</p>
            <Dropdown>
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.dateFin}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.dates
                  .filter((date) => this.state.dateDebut <= date)
                  .map((date) => {
                    return (
                      <Dropdown.Item
                        onClick={(event) => this.changerDate(false, date)}
                      >
                        {date}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <br />

        <MDBContainer className="graphique">
          {/* utiliser this.props.data... directement */}
          <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
        </MDBContainer>
      </div>
    );
  }
}
