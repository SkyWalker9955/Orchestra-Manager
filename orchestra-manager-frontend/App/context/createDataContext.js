//the file named with the lower case cuz it exports a plain function by convetion;
import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === { addEnsemble: (dispatch) => { return () => {} }
    const boundActions = {};
    for (let key in actions) {
      // key === 'addEnsemble'
        boundActions[key] = actions[key](dispatch);
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
