import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {exhaustAll, exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";


@Injectable({providedIn: 'root'})
export class DataStorageService{
  constructor(private http: HttpClient,
              private recipesService: RecipeService,
              private authService: AuthService){}

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
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
        });
      }),
        // questo observable viene catturato da header con -> this.dataStorageService.fetchRecipes().subscribe();
        // tap ritorna il risultato di un observable e poi ci faccio quel che voglio
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
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
