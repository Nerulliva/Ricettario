import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {LoggingService} from "../logging.service";
import {Store} from "@ngrx/store";
import * as formShoppingList from "./store/shopping-list.reducer";
import * as ShoppingListActions from "./store/shopping-list.action";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients:  Ingredient[]}>;
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private loggingService: LoggingService,
              private store: Store<formShoppingList.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    /*this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredient: Ingredient[]) =>{
        this.ingredients = ingredient;
      }
    );*/
    console.log(this.ingredients);
    //this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number){
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }


}
