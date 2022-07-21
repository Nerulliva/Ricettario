import {NgModule} from "@angular/core";
import {DropdownDirective} from "./dropdown.directive";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";

@NgModule({
  declarations: [
    DropdownDirective,
    PlaceholderDirective
  ],
  exports: [
    DropdownDirective,
    PlaceholderDirective
  ]
})
export class DirectivesModule{}
