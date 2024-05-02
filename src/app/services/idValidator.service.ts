import { Injectable, inject } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { ApiService } from './api.service';


@Injectable({ providedIn: 'root'})
export class IdValidator implements AsyncValidator {
  private apiService = inject( ApiService );

  // Validates the control value by checking if the ID is taken
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const id = control.value;
    
    return this.callGetCheckId(id)
  }

  // Calls the API service to check if the ID is taken
  callGetCheckId(id:string) {
    return this.apiService.getCheckId(id)
      .pipe(
        map(resp => resp 
            ? { idTaken: true} // return an error if the ID is taken
            : null //return null if the ID is not taken
        )
      )
  }
}