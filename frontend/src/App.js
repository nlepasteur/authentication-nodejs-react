import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Route from "./services/routes/Route";
import NotFound from "./components/NotFound/NotFound";

import Context from "./services/store/context";

import { reducer, initialState } from "services/store/reducer";
import { getRoutes } from "services/routes/routes";

import "./App.scss";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          {getRoutes().map((route, index) => {
            return <Route exact {...route} key={index} />;
          })}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
