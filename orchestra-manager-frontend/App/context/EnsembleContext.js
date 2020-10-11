//This component goes to App
import createDataContext from "./createDataContext";
import CreateEnsemble from "../Screens/CreateEnsemble";
import baseURL from "../components/baseURL";
////////////////////////////////////////////////////////////////////////
const ensembleReducer = (state, action) => {
  switch (action.type) {
    case "get_ensemble":
      //its a total source of trueth data in the API. so we are taking it for state 
      return action.payload;
    case "delete_ensemble":
      return state.filter((ensemble) => ensemble._id !== action.payload);
    case "edit_ensemble":
      return state.map((ensemble) => {
        return ensemble._id === action.payload._id ? action.payload : ensemble;
      });
    default:
      return state;
  }
};
////////////////////////////////////////////////////

getEnsemble = dispatch => {
  return async () => {
    const response = await baseURL.get('/ensemble/')
    //response.data === [{}, {}, {}]
    dispatch({ type: 'get_ensemble', payload: response.data })
  }
}

const addEnsemble = dispatch => {
  return async (chairs, title, callback) => {
    await baseURL.post('/ensemble/add', { title, chairs })
    if (callback) {
      callback();
    }
  };
};

const deleteEnsemble = (dispatch) => {
  return async (_id) => { 
    await baseURL.delete(`ensemble/delete/${_id}`)
    
    dispatch({ type: "delete_ensemble", payload: _id });
  };
};

const editEnsemble = (dispatch) => {
  return async (chairs, title, _id, callback) => {
    await baseURL.put(`/ensemble/edit/${_id}`, { chairs, title })

    dispatch({ type: "edit_ensemble", payload: { chairs, title, _id }});
    if (callback) {
      callback();
    }
  };
};

///////////////////////////////////////////////////////////
export const { Context, Provider } = createDataContext(
  ensembleReducer,
  { addEnsemble, deleteEnsemble, editEnsemble, getEnsemble },
  []
);
