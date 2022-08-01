import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "./shared/data-storage.service";
import {AuthService} from "./auth/auth.service";
import {Store} from "@ngrx/store";
import * as AuthActions from './auth/store/auth.actions'
import * as fromApp from './store/app.reducer'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor( private authService: AuthService,
               private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    //this.authService.autoLogin();
    //this.dataStorageService.fetchRecipes();
  }


}
