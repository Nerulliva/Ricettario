import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'STAR_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

//azione 1
export class AddIngredient implements Action{
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

//azione 2
export class AddIngredients implements Action{
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

//azione 3
export class UpdateIngredient implements Action{
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

//azione 4
export class DeleteIngredient implements Action{
  readonly type = DELETE_INGREDIENT;
}

//azione 5
export class StartEdit implements Action{
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

//azione 6
export class StopEdit implements Action{
  readonly type = STOP_EDIT;
}

//export del type delle azioni
export type ShoppingListActions =
  AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
