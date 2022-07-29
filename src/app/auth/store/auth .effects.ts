import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from './auth.actions'
import {catchError, map, of, switchMap, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

//effects osserva gli observable delle action

export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects{

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          map(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return (new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate
              })
            );
          }),
          catchError(error => {
            return of(new AuthActions.LoginFailure(error));
          })
        );
      }),
    )
  );

  /*authSuccess$ = createEffect(() => {
    this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      tap(() => {
        this.router.navigate(['/']);
      }))
  });*/

  // simbolo $ usato per indicare che e' un observable
  constructor(private actions$ : Actions, private http: HttpClient, private router: Router) {
  }
}
