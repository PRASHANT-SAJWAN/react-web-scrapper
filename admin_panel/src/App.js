import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ArticlePage from './View/ArticlePage';
import Search from './View/Search';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/:article">
            <ArticlePage />
          </Route>
          <Route path="/" exact>
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
