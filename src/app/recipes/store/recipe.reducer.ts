import {Recipe} from "../recipe.model";
import * as RecipesAction from './recipe.actions'

export interface State{
  recipes: Recipe[]
}

const initialeState: State = {
  recipes: []
}

export function recipeReducer(state = initialeState, action: RecipesAction.RecipesActions){
  switch(action.type){
    case RecipesAction.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    default:
      return state;
  }
}
