import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./composants/Navigation";
import Accueil from "./pages/Accueil";
import Effectif from "./pages/Effectif";
import Parcours from "./pages/Parcours";
import Departement from "./pages/Departement";

function App() {
  return (
    <div>
      {/* Ajout de la barre de navigation sur toute l'application */}
      <Navigation />

      {/* Gestion de l'ensemble des liens (redirections) de l'application */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Accueil />
          </Route>
          <Route path="/effectifs">
            <Effectif />
          </Route>
          <Route path="/departements">
            <Departement />
          </Route>
          <Route path="/parcours">
            <Parcours />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
