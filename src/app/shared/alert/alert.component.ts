import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent{
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose(){
    this.close.emit();
  }
}

/*
  ci sono due metodi per crearlo.
  Il primo è quello di chiamare il component nell' html di interesse tipo auth.model
   <!--<app-alert [message]="error" *ngIf="error" (close)="onHandleError()"></app-alert>-->

   Secondo modo

   Creare una direttiva come placeHolder, associarla all' html di interesse
   <ng-template appPlaceHolder></ng-template> e scrivere il codice nel ts del component
   di interesse
 */
