import { TestBed } from '@angular/core/testing';
import { ValidatorsService } from './validators.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IdValidator } from './idValidator.service';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ValidatorsService;
  let apiService : ApiService;
  let idValidator: IdValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ IdValidator, ApiService ]
    });
    service = TestBed.inject(ValidatorsService);
    apiService = TestBed.inject(ApiService);
    idValidator = TestBed.inject(IdValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getFieldError()', () => {
    const form = new FormBuilder().group({
      name:['', Validators.required]
    });
    service.getFieldError(form, "name");
    expect(service.getFieldError(form, "name")).toBe('Este campo es requerido');
    expect(service.getFieldError(form, "")).toBe(null);
  });

  it('should getFieldError() minLeng', () => {
    const formV = new FormBuilder().group({
      name:['', [Validators.minLength(3)]]
    });
    formV.controls['name'].setValue('cs');
    service.getFieldError(formV, "name");
    expect(service.getFieldError(formV, "name")).toBe('Mínimo 3 caracteres');
  });

  it('should getFieldError() maxLeng', () => {
    const formV = new FormBuilder().group({
      name:['', Validators.maxLength(10)]
    });
    formV.controls['name'].setValue('Máximo 10 caracteres')
    service.getFieldError(formV, "name");
    expect(service.getFieldError(formV, "name")).toBe('Máximo 10 caracteres');
  });

});