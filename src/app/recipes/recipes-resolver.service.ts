/*classe che risolve i dati prima che venga caricato una route
recipe-detail da errore senza questo
il resolver va applicato all'url della const appRoutes che ci interessa. (app-routing)
Quindi quando carico una pagina se non trova degli attributi devo usare questo
*/
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Recipe } from './recipe.model'
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {map, of, switchMap, take} from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService,
              private recipesService: RecipeService,
              private store: Store<fromApp.AppState>,
              private action$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipe').pipe(
      take(1),
      map(recipesState =>{
      return recipesState.recipes;
    }),
      switchMap(recipes => {
        if(recipes.length === 0){
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.action$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );



  }

}
