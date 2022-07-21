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

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService,
              private recipesService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();

    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    }
    else{
      return recipes;
    }
  }

}
