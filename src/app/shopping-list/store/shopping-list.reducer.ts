import {Ingredient} from "../../shared/ingredient.model";
import {Action} from "@ngrx/store";
import * as ShoppingListActions from "./shopping-list.action";

//Il reducer gestisce il cambiamento dello stato

export interface State{
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState{
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient("apple", 5),
    new Ingredient("tomatoes", 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState,
                                    action: ShoppingListActions.ShoppingListActions)
{
  switch(action.type){

    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex]; //prelievo ingrediente a pos index
      console.log("ingredient preso ");//debug
      console.log(ingredient) //debug
      const updatedIngredient = {
        ...ingredient, // elementi ingrediente originale
        ...action.payload //ingrediente preso dal form mandato come payload
      };
      console.log("ingrediente aggiornato "); //debug
      console.log(updatedIngredient) //debug
      const updatedIngredients = [...state.ingredients]; //array ingredienti attuale (prima della modifica)
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient; // inserimento dell'ingrediente aggiornato
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        })
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }

}
