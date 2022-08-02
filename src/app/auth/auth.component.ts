import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  //per alert
  @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective;
  //per alert
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
   this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    }
    else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    }
    form.reset();
  }

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError());
    //this.error = null;
  }

  // ulteriore pulizia alla chiusura dell'alert
  ngOnDestroy() {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  // secondo modo per alert dinamico
  private showErrorAlert(message: string){
    //contenitore component
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    // istanza component
    const alert = hostViewContainerRef.createComponent(AlertComponent);
    alert.instance.message = message;
    this.closeSub = alert.instance.close.subscribe(() =>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
/*
 showErrorAlert chiedere come non farla chiudere al click esterno
 */
