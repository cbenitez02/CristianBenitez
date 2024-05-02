import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  // Checks if a form field is valid
  public isValidField (form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  // Returns the error message for a form field
  public getFieldError (form: FormGroup, field: string) {
    if ( !form.controls[field] ) return null;
    const errors = form.controls[field].errors || {};

    for(const key of Object.keys(errors)) {    
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength} caracteres`
        case 'maxlength':
          return `Máximo ${ errors['maxlength'].requiredLength} caracteres`
        case 'idTaken':
          return `El ID ya no esta disponible`
      }
    }
    return null
  }
}
