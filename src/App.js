import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Universite from "./pages/Universite";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Accueil />
        </Route>
        <Route path="/universites">
          <Universite />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
