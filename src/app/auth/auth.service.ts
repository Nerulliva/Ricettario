import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "./user.model";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from "./store/auth.actions";

/*
  Le interfacce mi servone per definire il tipo di ritorno che
  abbiamo dalla chiamata. Infatti questa la metto davanti post:
  post<AuthResponseData>(...)
 */
export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{

  user = new BehaviorSubject<User>(null);//mi fa fare accesso al valore precedente
  private tokenExpirationTimer: any;

  constructor( private store: Store<fromApp.AppState>) {
  }

  setLogoutTimer(expirationDuration: number){
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() =>{
      this.store.dispatch(new AuthActions.Logout());
    },expirationDuration);
  }

  clearLogoutTimer(){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
