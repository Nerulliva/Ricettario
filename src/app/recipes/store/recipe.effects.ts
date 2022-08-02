import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RecipesActions from './recipe.actions'
import {map, pipe, switchMap} from "rxjs";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class RecipeEffects{

  fetchRecipes$ = createEffect(()=>
    this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>('https://recipe-book-db-ab882-default-rtdb.europe-west1.firebasedatabase.app/recipes.json');
      }),
      map(recipes =>{
        return recipes.map(recipe =>{
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
      })
    )
  )

  constructor(private actions$: Actions,
              private http: HttpClient) {}

}
