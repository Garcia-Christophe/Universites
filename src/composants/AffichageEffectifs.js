import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import "../style/AffichageEffectifs.css";

export default class AffichageEffectifs extends Component {
  constructor(props) {
    super(props);
    let dates = [2016, 2017, 2018, 2019, 2020, 2021];
    let ages = [];
    ages.push(-1);
    let existe = false;
    for (let i = 0; i < this.props.demographie.length; i++) {
      for (let j = 0; j < ages.length; j++) {
        if (ages[j] === this.props.demographie[i].ageDemographie) {
          existe = true;
        }
      }

      if (!existe) {
        ages.push(this.props.demographie[i].ageDemographie);
      }
    }

    this.state = {
      effectifs: this.props.effectifs,
      formations: this.props.formationsChoisies,
      ages: ages,
      nbMajFaites: 0,
      dates: dates,
      dateDebut: dates[0],
      dateFin: dates[dates.length - 1],
      age: ages[0],
      typesGraphique: ["En barres", "En lignes", "Multi-lignes"],
      typeGraphiqueChoisi: "En barres",
      backgroundColor: [
        "rgba(255, 134, 159, 0.4)",
        "rgba(98,  182, 239, 0.4)",
        "rgba(255, 218, 128, 0.4)",
        "rgba(113, 205, 205, 0.4)",
        "rgba(170, 128, 252, 0.4)",
        "rgba(255, 177, 101, 0.4)",
        "rgba(133, 137, 38, 0.4)",
        "rgba(38, 137, 60, 0.4)",
        "rgba(38, 73, 137, 0.4)",
        "rgba(126, 38, 137, 0.4)",
        "rgba(137, 38, 66, 0.4)",
        "rgba(137, 75, 38, 0.4)",
        "rgba(0, 0, 0, 0.4)",
        "rgba(255, 255, 255, 0.4)",
        "rgba(137, 38, 38, 0.4)",
        "rgba(137, 38, 111, 0.4)",
        "rgba(38, 43, 137, 0.4)",
        "rgba(137, 137, 137, 0.4)",
        "rgba(107, 137, 38, 0.4)",
        "rgba(237, 242, 59, 0.4)",
      ],
      borderColor: [
        "rgba(255, 134, 159, 1)",
        "rgba(98,  182, 239, 1)",
        "rgba(255, 218, 128, 1)",
        "rgba(113, 205, 205, 1)",
        "rgba(170, 128, 252, 1)",
        "rgba(255, 177, 101, 1)",
        "rgba(133, 137, 38, 1)",
        "rgba(38, 137, 60, 1)",
        "rgba(38, 73, 137, 1)",
        "rgba(126, 38, 137, 1)",
        "rgba(137, 38, 66, 1)",
        "rgba(137, 75, 38, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(255, 255, 255, 1)",
        "rgba(137, 38, 38, 1)",
        "rgba(137, 38, 111, 1)",
        "rgba(38, 43, 137, 1)",
        "rgba(137, 137, 137, 1)",
        "rgba(107, 137, 38, 1)",
        "rgba(237, 242, 59, 1)",
      ],
      dataBar: {
        labels: dates,
        datasets: [
          {
            label: "Aucune donnée",
            data: [],
            backgroundColor: null,
            borderWidth: 2,
            borderColor: null,
            yAxisID: "yLeft",
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: false,
            text: "Graphique des effectifs - Diagramme en barres",
          },
        },
        scales: {
          yLeft: {
            type: "linear",
            position: "left",
            display: true,
            title: {
              display: true,
              text: "Effectif formations",
            },
            ticks: {
              beginAtZero: true,
            },
          },
          yRight: {
            type: "linear",
            position: "right",
            display: false,
            title: {
              display: true,
              text: "Effectif démographies",
            },
            ticks: {
              beginAtZero: true,
            },
            grid: {
              drawOnChartArea: false,
            },
          },
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

  changerAge(age) {
    this.setState({ age: age, nbMajFaites: this.state.nbMajFaites - 1 });
  }

  changerTypeGraphique(type) {
    let newOptions = this.state.barChartOptions;
    if (type === this.state.typesGraphique[2]) {
      newOptions.scales.yRight.display = true;
    } else {
      newOptions.scales.yRight.display = false;
    }

    this.setState({
      typeGraphiqueChoisi: type,
      barChartOptions: newOptions,
      nbMajFaites: this.state.nbMajFaites - 1,
    });
  }

  miseAJourEffectifs() {
    let datasets = [];
    let demographiesAvecBonAge = [];
    let data = [];
    let data2 = [];

    for (let i = 0; i < this.props.demographie.length; i++) {
      if (
        this.state.age === -1 ||
        this.props.demographie[i].ageDemographie === this.state.age
      ) {
        demographiesAvecBonAge.push(this.props.demographie[i]);
      }
    }

    if (this.state.age === -1) {
      let effectif = 0;
      for (let i = 0; i < this.props.formationsChoisies.length; i++) {
        if (this.props.formationsChoisies[i].cochee) {
          data = [];
          data2 = [];
          for (let j = this.state.dateDebut; j <= this.state.dateFin; j++) {
            for (let k = 0; k < demographiesAvecBonAge.length; k++) {
              for (let l = 0; l < this.state.effectifs.length; l++) {
                if (
                  data2.length <= j - this.state.dateDebut &&
                  this.state.effectifs[l].Demographie_idDemographie ===
                    demographiesAvecBonAge[k].idDemographie &&
                  demographiesAvecBonAge[k].anneeDemographie === j &&
                  ((this.props.formationsChoisies[i].niveau === "1" &&
                    this.props.formationsChoisies[i].type === "Licence" &&
                    demographiesAvecBonAge[k].ageDemographie === 18) ||
                    (this.props.formationsChoisies[i].niveau === "2" &&
                      this.props.formationsChoisies[i].type === "Licence" &&
                      demographiesAvecBonAge[k].ageDemographie === 19) ||
                    (this.props.formationsChoisies[i].niveau === "3" &&
                      this.props.formationsChoisies[i].type === "Licence" &&
                      demographiesAvecBonAge[k].ageDemographie === 20) ||
                    (this.props.formationsChoisies[i].niveau === "1" &&
                      this.props.formationsChoisies[i].type === "Master" &&
                      demographiesAvecBonAge[k].ageDemographie === 21) ||
                    (this.props.formationsChoisies[i].niveau === "2" &&
                      this.props.formationsChoisies[i].type === "Master" &&
                      demographiesAvecBonAge[k].ageDemographie === 22))
                ) {
                  data2.push(demographiesAvecBonAge[k].nbPersonnes);
                }
              }
            }

            effectif = 0;
            for (let k = 0; k < this.state.effectifs.length; k++) {
              if (
                this.state.effectifs[k].Formation_idFormation ===
                  this.props.formationsChoisies[i].idFormation &&
                this.state.effectifs[k].anneeRef === j
              ) {
                effectif += this.state.effectifs[k].effectif;
              }
            }
            data.push(effectif);
          }
          datasets.push({
            label:
              this.props.formationsChoisies[i].type +
              " " +
              this.props.formationsChoisies[i].niveau +
              " - " +
              this.props.formationsChoisies[i].nomParcours
                .split("(")[1]
                .split(")")[0],
            data: data,
            backgroundColor: this.state.backgroundColor[datasets.length],
            borderWidth: 2,
            borderColor: this.state.borderColor[datasets.length],
            yAxisID: "yLeft",
          });

          if (this.state.typeGraphiqueChoisi === this.state.typesGraphique[2]) {
            datasets.push({
              label:
                this.props.formationsChoisies[i].type +
                " " +
                this.props.formationsChoisies[i].niveau +
                " - " +
                this.props.formationsChoisies[i].nomParcours
                  .split("(")[1]
                  .split(")")[0] +
                " (2)",
              data: data2,
              backgroundColor: this.state.backgroundColor[datasets.length],
              borderWidth: 2,
              borderColor: this.state.borderColor[datasets.length],
              yAxisID: "yRight",
            });
          }
        }
      }
    } else {
      let ancienneDate = -1;
      let dateCourante = this.state.dateDebut;
      for (let i = 0; i < this.props.formationsChoisies.length; i++) {
        if (this.props.formationsChoisies[i].cochee) {
          data = [];
          data2 = [];
          for (let j = 0; j < this.state.effectifs.length; j++) {
            if (
              this.state.effectifs[j].Formation_idFormation ===
              this.props.formationsChoisies[i].idFormation
            ) {
              for (let k = 0; k < demographiesAvecBonAge.length; k++) {
                if (
                  demographiesAvecBonAge[k].idDemographie ===
                  this.state.effectifs[j].Demographie_idDemographie
                ) {
                  data.push(this.state.effectifs[j].effectif);
                }

                if (
                  dateCourante !== ancienneDate &&
                  demographiesAvecBonAge[k].ageDemographie === this.state.age
                ) {
                  ancienneDate = dateCourante;
                  data2.push(demographiesAvecBonAge[k].nbPersonnes);
                }
                dateCourante++;
              }
            }
          }

          datasets.push({
            label:
              this.props.formationsChoisies[i].type +
              " " +
              this.props.formationsChoisies[i].niveau +
              " - " +
              this.props.formationsChoisies[i].nomParcours
                .split("(")[1]
                .split(")")[0],
            data: data,
            backgroundColor: this.state.backgroundColor[datasets.length],
            borderWidth: 2,
            borderColor: this.state.borderColor[datasets.length],
            yAxisID: "yLeft",
          });

          if (this.state.typeGraphiqueChoisi === this.state.typesGraphique[2]) {
            datasets.push({
              label:
                this.props.formationsChoisies[i].type +
                " " +
                this.props.formationsChoisies[i].niveau +
                " - " +
                this.props.formationsChoisies[i].nomParcours
                  .split("(")[1]
                  .split(")")[0] +
                " (2)",
              data: data2,
              backgroundColor: this.state.backgroundColor[datasets.length],
              borderWidth: 2,
              borderColor: this.state.borderColor[datasets.length],
              yAxisID: "yRight",
            });
          }
        }
      }
    }

    let dataBar = this.state.dataBar;
    dataBar.datasets = datasets;

    this.setState({
      nbMajFaites: this.state.nbMajFaites + 1,
      dataBar: dataBar,
    });
  }

  render() {
    if (this.props.nbMajAFaire !== this.state.nbMajFaites) {
      this.miseAJourEffectifs();
    }
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
                        onClick={() => this.changerDate(true, date)}
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
                        onClick={() => this.changerDate(false, date)}
                      >
                        {date}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="div-dates">
            <p>Âge</p>
            <Dropdown>
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.age === -1 ? "Tout âge" : this.state.age}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.ages.map((age) => {
                  return (
                    <Dropdown.Item onClick={() => this.changerAge(age)}>
                      {age === -1 ? "Tout âge" : age}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="div-dates">
            <p>Graphique</p>
            <Dropdown>
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.typeGraphiqueChoisi}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.typesGraphique.map((type) => {
                  return (
                    <Dropdown.Item
                      onClick={() => this.changerTypeGraphique(type)}
                    >
                      {type}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <br />

        {this.state.typeGraphiqueChoisi === this.state.typesGraphique[0] && (
          <MDBContainer className="graphique">
            <Bar
              data={this.state.dataBar}
              options={this.state.barChartOptions}
            />
          </MDBContainer>
        )}
        {(this.state.typeGraphiqueChoisi === this.state.typesGraphique[1] ||
          this.state.typeGraphiqueChoisi === this.state.typesGraphique[2]) && (
          <MDBContainer className="graphique">
            <Line
              data={this.state.dataBar}
              options={this.state.barChartOptions}
            />
          </MDBContainer>
        )}
      </div>
    );
  }
}
