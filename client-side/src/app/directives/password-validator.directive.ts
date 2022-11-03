import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}
  ]
})
export class PasswordValidatorDirective {
  
  constructor() { }

  validate(control: AbstractControl):{[key: string] : any} | void{
      if(control.value == ""){
        return {noPassword: true}
      }
      if(control.value){
        if(control.value.length < 3){
          return {weakPassword: true}
        }
      }
      
  }

}
