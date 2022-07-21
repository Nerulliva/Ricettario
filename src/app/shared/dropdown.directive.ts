import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective{
  @HostBinding('class.open') isOpen = false;

 // @HostListener('click') toggleOpen(){
   // this.isOpen = !this.isOpen;
 // }

  //con questo quando clicco all'esterno il dropdown si chiude
  @HostListener('document:click',['$event']) toggleOpen(event: Event){
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    //console.log('ho cliccato');
}

  constructor(private elRef: ElementRef) { }
}
