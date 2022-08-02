import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';


@Injectable({providedIn: 'root'})
export class DataStorageService{
  constructor(private http: HttpClient,
              private recipesService: RecipeService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>){}

  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://recipe-book-db-ab882-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://recipe-book-db-ab882-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(recipes =>{
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients: []
          };
        });
      }),
        tap(recipes => {
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      )
  }

 /* fetchRecipes(){
    //
    return this.authService.user.pipe(take(1),
      exhaustMap(user =>{
        return this.http.get<Recipe[]>(
          'https://recipe-book-db-ab882-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients: []
          };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }*/
}
