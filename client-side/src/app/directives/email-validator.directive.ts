import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true
    }
  ]
})
export class EmailValidatorDirective {

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | void{
      if(control.value == ""){
        return({isRequired: true})
      }
      if(control.value.indexOf("@.") == -1){
        return {notValid: true}
      }
  }

}
