import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Product } from '../../interfaces/products-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ValidatorsService } from '../../services/validators.service';
import { NotificationToastService } from '../../services/notification-toast.service';

@Component({
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent  implements OnInit{
  private route = inject( ActivatedRoute );
  private apiService = inject( ApiService );
  private fb = inject( FormBuilder );
  private notificationService = inject( NotificationToastService );
  private validatorsService = inject( ValidatorsService )
  private router = inject( Router );

  public product:Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  };
  
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

  public config = {
    format: "YYYY-MM-DD",
    min:  '',
  };

  public updateForm: FormGroup = this.fb.group({
    id: [this.product.id, [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(10)]
    ],
    name: [this.product.name, [
      Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(100)]
    ],
    description: [this.product.description, [
      Validators.required,
      Validators.minLength(10), 
      Validators.maxLength(200)]
    ],
    logo: [this.product.logo, [Validators.required]],
    date_release:  [this.product.date_release, [Validators.required]],
    date_revision: [this.product.date_revision],
  });

  ngOnInit(): void {
    this.config.min = this.today;
    this.route.params
      .pipe(
        switchMap( ({ id }) => this.apiService.getProductId(id))
      )
      .subscribe( (product) => {
        this.product = product[0]; 

        this.today = this.product.date_release;

        this.updateForm.reset({
          id: this.product.id,
          name: this.product.name,
          description: this.product.description,
          logo: this.product.logo,
          date_release: formatDate(this.product.date_release, 'yyyy-MM-dd', 'en-US'),
          date_revision: formatDate(this.product.date_revision, 'MM-dd-yyyy', 'en-US')
        })
      })
  }

  resetForm() {
    this.updateForm.reset({
      id: this.product.id,
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });
    
  }

  isValidField ( field: string ) {
    return this.validatorsService.isValidField(this.updateForm, field);
  }

  getFieldError ( field: string): string | null {
    return this.validatorsService.getFieldError(this.updateForm, field);
  }

  onChangeDate() {
    const date = this.updateForm.controls['date_release'].value;
    const oneYear = new Date(date);
    oneYear.setFullYear(oneYear.getFullYear() + 1);
    this.updateForm.controls['date_revision'].setValue(this.stringFormat(oneYear));
  }

  stringFormat(date: Date) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
  
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
  }

  updateProductSer(){
    if( this.updateForm.invalid ) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const body: Product = {
      ...this.updateForm.value,
      date_revision: formatDate(this.updateForm.controls['date_revision'].value, 'yyyy-MM-dd', 'en-US')
    }
    
    this.apiService.updateProduct(body)
      .subscribe({
        next:  () => {
          this.router.navigate(['/']);
          this.notificationService.success('Editado con éxito', 'Se editó correctamente')
        },
        error: () => this.notificationService.error('Error al editar', 'No se pudo editar el producto')
      })
  }

}
