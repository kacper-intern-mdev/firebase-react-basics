import * as actions from "./actions";

import firebase from "../../../Firebase";

export const get = () => async (dispatch, getState) => {
  const state = getState();

  try {
    const uid = state.session.authUser?.uid;
    if (!uid) throw "User not found!";

    dispatch(actions.fetchPending());

    const recipes = await firebase
      .userRecipes(uid)
      .get()
      .then((dbRes) => dbRes.docs.map((doc) => doc.data()));

    dispatch(actions.fetchSuccess(recipes));
  } catch (error) {
    console.log(error);
    dispatch(actions.fetchFailure(error));
  }
};

export const set = (recipe) => async (dispatch, getState) => {
  const {
    sesion: { authUser },
  } = getState();

  dispatch(actions.setPending());
  try {
    firebase
      .setRecipe()
      .set({
        ...recipe,
      })
      .then((data) => {
        console.log(data);
        const recipeKey = `recipes.${recipe.uid}`;
        firebase.user(authUser.uid).update({
          [recipeKey]: recipe.uid,
        });
      })
      .then(() => actions.setSuccess());
  } catch (error) {
    dispatch(actions.setFailure(error));
  }
};