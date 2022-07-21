//classe usata pe posizionare component dinamico come da secondo modo: guardare auth.component
import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appPlaceHolder]'
})
export class PlaceholderDirective{
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
