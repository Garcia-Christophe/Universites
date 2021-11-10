import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./composants/Navigation";
import Accueil from "./pages/Accueil";
import Effectif from "./pages/Effectif";
import Universite from "./pages/Universite";
import Departement from "./pages/Departement";

function App() {
  return (
    <div>
      <Navigation />
      <Router>
        <Switch>
          <Route exact path="/">
            <Accueil />
          </Route>
          <Route path="/effectifs">
            <Effectif />
          </Route>
          <Route path="/universites">
            <Universite />
          </Route>
          <Route path="/departements">
            <Departement />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
