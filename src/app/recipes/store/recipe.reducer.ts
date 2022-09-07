import {Recipe} from "../recipe.model";
import * as RecipesAction from './recipe.actions'

export interface State{
  recipes: Recipe[]
}

const initialState: State = {
  recipes: []
}

export function recipeReducer(state = initialState, action: RecipesAction.RecipesActions){
  switch(action.type){
    case RecipesAction.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case RecipesAction.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RecipesAction.UPDATE_RECIPE:
      const updateRecipe = {
        ...state.recipes[action.payload.index],//copio vecchia
        ...action.payload.newRecipe //sovrascrivo con nuova
      };

      const updateRecipes = [...state.recipes];
      updateRecipes[action.payload.index] = updateRecipe;

      return {
        ...state,
        recipes: updateRecipes
      };

    case RecipesAction.DELETE_RECIPE:
      return{
        ...state,
        recipes:state.recipes.filter((recipe, index)=>{
          return index != action.payload;
        })
      };

    default:
      return state;
  }
}
