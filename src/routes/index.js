import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../views/home";
import CiudadDetail from "../views/CiudadDetails";
import Historial from "../views/historial";

export default function Routes() {
  return (
    <Router>
      <Route path="/" exact>  
      <Home></Home>      
      </Route>
      <Route path="/historial" exact>
        <Historial></Historial>
      </Route>
      <Route path="/ciudad/:id">
        <CiudadDetail />
      </Route>
    </Router>
  );
}
