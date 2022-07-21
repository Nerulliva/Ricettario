import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

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

  constructor(private http: HttpClient,private router: Router) {
  }

  //registrazione
  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKgyZ88oKMblHDn2xoUg0jNvp8LX2a1Vs',
      {
      email: email,
      password: password,
      returnSecureToken: true
    }
    )
    .pipe(catchError(this.handleError), tap(respData => {
      this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)//ritorna user
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKgyZ88oKMblHDn2xoUg0jNvp8LX2a1Vs',
      {
      email: email,
      password: password,
      returnSecureToken: true
    }
    )
      .pipe(catchError(this.handleError), tap(respData => {
        this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)//ritorna user
      }));
  }

  //recupero dei dati dalla memoria locale
  autoLogin(){
    const userData:{
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() =>{
      this.logout();
    },expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user)); // mi salvo nello storage del browser l'utente per ritornare connesso in caso di refresh
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(() => errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'password incorrect!';
    }
    return throwError(() => errorMessage);
  }
}
