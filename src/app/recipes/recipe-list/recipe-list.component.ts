import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subscription} from "rxjs";
import * as fromApp from '../../store/app.reducer'
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[]
  subscription: Subscription

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipe')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) =>{
        this.recipes = recipes;
      });
    console.log(this.recipes);//debug
  }

  toNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
    //altrimenti '/server/new
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
