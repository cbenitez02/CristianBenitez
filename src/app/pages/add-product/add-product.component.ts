import { Component, NgZone, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { formatDate } from '@angular/common';
import { Product } from '../../interfaces/products-response.interface';
import { ValidatorsService } from '../../services/validators.service';
import { IdValidator } from '../../services/idValidator.service';
import { Router } from '@angular/router';
import { NotificationToastService } from '../../services/notification-toast.service';

@Component({
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  private fb = inject( FormBuilder );
  private apiService = inject( ApiService );
  private notificationService = inject( NotificationToastService );
  private validatorsService = inject( ValidatorsService)
  private router = inject( Router );
  private ngZone = inject( NgZone );

  public today: Date = new Date();
  public config = {
    format: "DD-MM-YYYY",
    min:  formatDate(this.today, 'dd-MM-yyyy', 'en'),
  };

  public registerForm: FormGroup = this.fb.group({
    id: ['', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(10)],
      [new IdValidator()]
    ],
    name: ['', [
      Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(100)]
    ],
    description: ['', [
      Validators.required,
      Validators.minLength(10), 
      Validators.maxLength(200)]
    ],
    logo: ['https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg', [Validators.required]],
    date_release:   [formatDate(this.today, 'yyyy-MM-dd', 'en-US'), [Validators.required]],
    date_revision:  [formatDate(this.today, 'MM-dd-yyyy', 'en-US')],
  });

  onPrevent(event: any) {
    event.preventDefault();
  }

  register(){
    if( this.registerForm.invalid ) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const body: Product = {
      ...this.registerForm.value,
      date_revision: formatDate(this.registerForm.controls['date_revision'].value, 'yyyy-MM-dd', 'en-US')
    }
    
    this.apiService.saveProduct(body)
      .subscribe({
        next: () =>{ 
          this.notificationService.success('Guardado con éxito', 'Se registró correctamente')
          this.ngZone.run(() => {
            this.router.navigate(['/'])
          })
          this.registerForm.reset();
        },
        error: () => {
          this.notificationService.error('Ocurrio un error al guardar', 'No se pudo registrar')
        }
      })
  }

  isValidField ( field: string ) {
    return this.validatorsService.isValidField(this.registerForm, field);
  }

  getFieldError ( field: string): string | null {
    return this.validatorsService.getFieldError(this.registerForm, field);
  }

  onChangeDate() {
    const date = new Date(this.registerForm.controls['date_release'].value);
    const oneYear = new Date(date);
    oneYear.setFullYear(oneYear.getFullYear() + 1);
    this.registerForm.controls['date_revision'].setValue(this.stringFormat(oneYear));
  }

  stringFormat(date: Date) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
  
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
  }
}
