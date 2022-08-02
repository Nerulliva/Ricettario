import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer'
import {ActionReducerMap} from "@ngrx/store";

 //inserisco qui tutti gli altri reducer

export interface AppState{
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipe: fromRecipes.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipe: fromRecipes.recipeReducer
};
