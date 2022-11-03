import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPhoneNoValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: PhoneNoValidatorDirective, multi: true}
  ]
})
export class PhoneNoValidatorDirective {

  constructor() { }

  // validate(control: AbstractControl, [key= String] : any | void) {

  // }
  validate(control: AbstractControl) : {[key: string]: any} | void{
      // console.log(control);
      if(control.value){
        if(control.value.indexOf('+')== -1){
          return {noCountryCode: true}
        }
      if(control.value.indexOf('+') !== 0){
        return {notCorrect: true}
      }
    }
  }

}
