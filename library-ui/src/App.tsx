import React from "react";
import { Switch, Route } from "react-router-dom";
import Structure from "./components/Structure/Structure";
import Libraries from "./containers/Libraries/Libraries";
import "./App.css";
import VulnerabilityAnalysis from "./containers/analysis/VulnerabilityAnalysis";

function App() {
  return (
    <div className="App">
      <Structure>
        <Switch>
          {/* <Route path="/checkout" component={asyncCheckout} /> */}
          <Route path="/library/analysis" component={VulnerabilityAnalysis} />
          <Route path="/" component={Libraries} />
        </Switch>
      </Structure>
    </div>
  );
}

export default App;
