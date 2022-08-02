import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredients';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredients';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

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
