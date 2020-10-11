import React from "react";
import Navigator from "./App/Navigator";
import { Provider } from "./App/context/EnsembleContext";

const App = () => {
  return <Navigator />;
};

export default () => {
  return (
    <Provider>
      <App/>
    </Provider>
  );
};
