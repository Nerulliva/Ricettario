import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {map, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";
import * as fromApp from '../store/app.reducer'
import {Store} from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>) {}

  // con Urltree mi rindirizza in auth se provo a inserire in url /recipes senza login
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    //return this.authService.user.pipe
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(user =>{
      const isAuth = !!user;
      if(isAuth){
        return true
      }
      return this.router.createUrlTree(['/auth']);
    }));
  }

}

/*
//cosi se inserisco manualmente url mi riporta su localhost:4200
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
  return this.authService.user.pipe(map(user =>{
    return !!user;
  }));
}*/
