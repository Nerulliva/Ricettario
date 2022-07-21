import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert/alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {CommonModule} from "@angular/common";
import {DirectivesModule} from "./directives.module";

@NgModule({
  declarations:[
    AlertComponent,
    LoadingSpinnerComponent,

  ],
  imports:[
    CommonModule,
    DirectivesModule
  ],
  exports:[
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    CommonModule,
    DirectivesModule

  ]
})
export class SharedModule{}
