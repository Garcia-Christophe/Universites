import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import "../style/AffichageEffectifs.css";

export default class AffichageEffectifs extends Component {
  constructor(props) {
    super(props);
    let dates = [2016, 2017, 2018, 2019, 2020, 2021];

    // On récupère tous les âges existants (de façon unique) dans la BDD
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
      // Données récupérées par le composant parent
      effectifs: this.props.effectifs,
      formations: this.props.formationsChoisies,

      // Liste des âges
      ages: ages,
      age: ages[0],

      // Nombre de mise à jour à faire, permet de re-render lorsqu'il est différent
      // de ((Effectif) parent).nbMajAFaire
      nbMajFaites: 0,

      // Les années (axe X)
      dates: dates,
      dateDebut: dates[0],
      dateFin: dates[dates.length - 1],

      // Les différents types de graphiques
      typesGraphique: ["En barres", "En lignes", "Multi-lignes"],
      typeGraphiqueChoisi: "En barres",

      // Liste des couleurs des courbes (arrière-plan et contours)
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

      // Données du graphique
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

      // Options du graphique
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
          x: {
            title: {
              display: true,
              text: "Années",
            },
          },
          yLeft: {
            type: "linear",
            position: "left",
            display: true,
            title: {
              display: true,
              text: "Effectif des formations",
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
              text: "Effectif des démographies",
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

  /**
   * Change la plage de valeurs de l'axe X (les années).
   * @param {*} debut année de début
   * @param {*} date année de fin
   */
  changerDate(debut, date) {
    let dateD = debut ? date : this.state.dateDebut;
    let dateF = debut ? this.state.dateFin : date;

    // Recalcul des années à présenter sur l'axe X
    let labels = [];
    for (let i = dateD; i <= dateF; i++) {
      labels.push(i);
    }

    // Mise à jour des données du graphique
    let newDataBar = this.state.dataBar;
    newDataBar.labels = labels;
    this.setState({ dataBar: newDataBar, dateDebut: dateD, dateFin: dateF });
  }

  /**
   * Mise à jour de l'âge sélectionné, et demande de mise à jour du graphique
   * @param {*} age age sélectionné
   */
  changerAge(age) {
    this.setState({ age: age, nbMajFaites: this.state.nbMajFaites - 1 });
  }

  /**
   * Mise à jour du type de graphique sélectionné, et demande au graphique de se mettre à jour
   * @param {*} type type de graphique choisi par l'utilisateur
   */
  changerTypeGraphique(type) {
    // Affiche le 2e axe Y (axe droit des effectifs des démographies)
    // seulement si le type "Multi-lignes" est choisi
    let newOptions = this.state.barChartOptions;
    if (type === this.state.typesGraphique[2]) {
      newOptions.scales.yRight.display = true;
    } else {
      newOptions.scales.yRight.display = false;
    }

    // Mise à jour du type de graphique choisi, des options du graphique, et demande de sa mise à jour
    this.setState({
      typeGraphiqueChoisi: type,
      barChartOptions: newOptions,
      nbMajFaites: this.state.nbMajFaites - 1,
    });
  }

  /**
   * Met à jour le graphique.
   */
  miseAJourEffectifs() {
    let datasets = [];
    let demographiesAvecBonAge = [];
    let data = [];
    let data2 = [];

    // On garde les démographies correspondant à l'âge sélectionné si sélectionné,
    // sinon garde toutes les démographies
    for (let i = 0; i < this.props.demographie.length; i++) {
      if (
        this.state.age === -1 ||
        this.props.demographie[i].ageDemographie === this.state.age
      ) {
        demographiesAvecBonAge.push(this.props.demographie[i]);
      }
    }

    // Si aucun âge n'est sélectionné
    if (this.state.age === -1) {
      let effectif = 0;
      // Pour toutes les formations sélectionnées cochées
      for (let i = 0; i < this.props.formationsChoisies.length; i++) {
        if (this.props.formationsChoisies[i].cochee) {
          data = [];
          data2 = [];
          // Et pour chacun des années de l'axe X du graphique
          for (let j = this.state.dateDebut; j <= this.state.dateFin; j++) {
            // Et pour chacune des démographies (toutes)
            for (let k = 0; k < demographiesAvecBonAge.length; k++) {
              // Et pour chacun des effectifs
              for (let l = 0; l < this.state.effectifs.length; l++) {
                // On ajoute l'effectif correspondant au niveau et au type de la formation choisie
                // et dont l'âge de la démographie correspond à l'âge normal de la formation
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

            // Pour chacun des effectifs, calcule le nombre de personnes de la formation (tout âge confondu)
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

          // Place les données de la première courbe dans chacune des formations
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

          // Place les données de la seconde courbe dans chacune des formations
          // (si le type du graphique choisi est "multi-lignes")
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
    // Si un âge est sélectionné
    else {
      let ancienneDate = -1;
      let dateCourante = this.state.dateDebut;

      // Pour toutes les formations sélectionnées cochées
      for (let i = 0; i < this.props.formationsChoisies.length; i++) {
        if (this.props.formationsChoisies[i].cochee) {
          data = [];
          data2 = [];

          // Et pour chacun des effectifs correspondant à la formation choisie
          for (let j = 0; j < this.state.effectifs.length; j++) {
            if (
              this.state.effectifs[j].Formation_idFormation ===
              this.props.formationsChoisies[i].idFormation
            ) {
              // Et pour chacune des démographies correspondant à l'âge sélectionné et à l'effectif en cours,
              // on ajoute l'effectif de la formation pour l'axe Y gauche, et l'effectif de la démographie pour l'axe Y droit
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

          // Place les données de la première courbe dans chacune des formations
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

          // Place les données de la seconde courbe dans chacune des formations
          // (si le type du graphique choisi est "multi-lignes")
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

    // Met à jour les données du graphique, et demande au graphique de se redessiner
    let dataBar = this.state.dataBar;
    dataBar.datasets = datasets;
    this.setState({
      nbMajFaites: this.state.nbMajFaites + 1,
      dataBar: dataBar,
    });
  }

  render() {
    // Fait une mise à jour du graphique à chaque modification importante
    if (this.props.nbMajAFaire !== this.state.nbMajFaites) {
      this.miseAJourEffectifs();
    }
    return (
      <div className="div-principal-affichage-effectifs">
        {/* Titre de la page */}
        <div className="titre-effectifs">
          <h2>Effectifs</h2>
        </div>
        <br />

        {/* Options du graphiques pour l'utilisateur */}
        <div className="dates">
          {/* Liste déroulante de la date de début */}
          <div className="div-dates">
            <p>Date de début</p>
            <Dropdown>
              {/* Date de début sélectionnée */}
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.dateDebut}
              </Dropdown.Toggle>

              {/* Menu déroulant des dates inférieures à la date de fin */}
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

          {/* Liste déroulante de la date de fin */}
          <div className="div-dates">
            <p>Date de fin</p>
            <Dropdown>
              {/* Date de fin sélectionnée */}
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.dateFin}
              </Dropdown.Toggle>

              {/* Menu déroulant des dates suppérieures à la date de début */}
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

          {/* Liste déroulante de l'âge */}
          <div className="div-dates">
            <p>Âge</p>
            <Dropdown>
              {/* Âge sélectionné */}
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.age === -1 ? "Tout âge" : this.state.age}
              </Dropdown.Toggle>

              {/* Menu déroulant des âges disponibles */}
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

          {/* Liste déroulante du type de graphique */}
          <div className="div-dates">
            <p>Graphique</p>
            <Dropdown>
              {/* Type de graphique sélectioné */}
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                {this.state.typeGraphiqueChoisi}
              </Dropdown.Toggle>

              {/* Menu déroulant des types de graphique */}
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

        {/* Graphique en barre si le type est "En barres" */}
        {this.state.typeGraphiqueChoisi === this.state.typesGraphique[0] && (
          <MDBContainer className="graphique">
            <Bar
              data={this.state.dataBar}
              options={this.state.barChartOptions}
            />
          </MDBContainer>
        )}

        {/* Graphique en ligne si le type est "En lignes" ou "Multi-lignes" */}
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
