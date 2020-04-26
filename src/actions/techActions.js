import {
  GET_TECHS,
  TECHS_ERROR,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
} from "./types";

//Set Loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

//Get Techs from server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/techs");
    const data = await res.json();
    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//Delete Techs from server
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`/techs/${id}`, {
      method: "delete",
    });
    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//Add New Tech
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/techs", {
      body: JSON.stringify(tech),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};
