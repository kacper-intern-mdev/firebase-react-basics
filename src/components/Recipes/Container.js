import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import RecipeCardv2 from "./Recipev2";

import RecipeDetails from "./Details";

import { makeStyles } from "@material-ui/core/styles";

import { recipeDetailsOperations } from "../../store/reducers/recipes/recipeDetails";
import CenterMsg from "../CenterMsg";
import { Button, Grid } from "@material-ui/core";
import { searchOperations } from "../../store/reducers/search";
import { ErrorActions } from "../../store/reducers/error";

import UserCardContainer from "../UserCard/UserCard.Container";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 1em",
  },
  recipesContainer: {
    margin: "5px auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: "2em",
  },
}));

const RecipesContainer = ({ selectOp, msg, getOp, storeSrc }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const recipes = useSelector(selectOp);
  if (recipes.error) dispatch(ErrorActions.set(recipes.error.message));

  useEffect(() => {
    (async () => {
      if (getOp) dispatch(getOp());
    })();
  }, [dispatch, getOp]);

  const handleCardClick = (e, recipe) => {
    dispatch(recipeDetailsOperations.get(recipe));
  };

  const handleMoreClick = (e) => {
    dispatch(searchOperations.search(recipes.query, true));
  };

  const mappedRecipes =
    recipes.data?.length > 0
      ? recipes.data.map((recipe) => (
          <RecipeCardv2
            key={recipe.id}
            {...recipe}
            storeSrc={storeSrc}
            handleClick={(e) => handleCardClick(e, recipe)}
          />
        ))
      : [];

  const users = recipes.users?.filter((user) => user !== null);

  return (
    <div className={classes.root}>
      {recipes.pending ? (
        <Loader isLoading={recipes.pending} />
      ) : (
        <div>
          {users?.length > 0 && <UserCardContainer users={recipes.users} />}
          {mappedRecipes.length > 0 ? (
            <div className={classes.recipesContainer}>{mappedRecipes}</div>
          ) : (
            <CenterMsg msg={msg} gutter={20} variant="h5" />
          )}
          <Grid container>
            <Grid item xs={12} style={{ textAlign: "center", margin: "20px" }}>
              {recipes.next && mappedRecipes.length > 0 && (
                <Button onClick={handleMoreClick} variant="outlined">
                  Show More
                </Button>
              )}
            </Grid>
          </Grid>

          <RecipeDetails />
        </div>
      )}
    </div>
  );
};

export default RecipesContainer;
