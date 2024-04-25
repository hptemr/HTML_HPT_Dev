import { AbstractControl, ValidationErrors, ValidatorFn,FormControl, Validators  } from '@angular/forms';
// setup simple regex for white listed characters
const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;

// create your class that extends the angular validator class
export class CustomValidators extends Validators {

  static noWhitespaceValidator(control:FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };    
  }

  static test(control: FormControl) {
    if (control.value && control.value.length > 0) {
      const matches = control.value.match(validCharacters);
      return matches 
      && matches.length ? { 'not_allowed_characters': matches } : null;
    } else {
      return null;
    }
  }
}