import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ 
  selector: '[appChangesLR]'
})
export class ChangesLRDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
    ) { }

}