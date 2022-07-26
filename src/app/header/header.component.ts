import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {Route, Router} from "@angular/router";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {map, Subscription} from "rxjs";
import * as fromApp from '../store/app.reducer'
import {Store} from "@ngrx/store";
import * as AuthActions from '../auth/store/auth.actions'

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user))
      .subscribe(user =>{
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }



}
