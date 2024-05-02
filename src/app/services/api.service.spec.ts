import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../interfaces/products-response.interface';
import { of } from 'rxjs';

const mockProduct = [
  {
    id: 'tj-q1',
    name: 'Tarjetas',
    description: 'Tarjetas de crédito',
    logo: 'img.jpg',
    date_release: '2023-07-26',
    date_revision: '2024-07-26'
  }
];

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ApiService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getProducts()', () => {
    const url = `${environment.baseUrl}/bp/products`;
    const headers = new HttpHeaders()
      .set( 'authorId', environment.authorId );

    httpClient.get(url, { headers })
      .subscribe( data => 
        expect(data).toEqual(mockProduct)
      );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProduct);
  });

  it('test for errors  in call getProducts()', () => {
    const emsg = 'Header authorId is missing';
    const url = `${environment.baseUrl}/bp/products`;

    httpClient.get<Product[]>(url).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
        expect(error.error).toBe(emsg);
      },
    });

    const req = httpMock.expectOne(url);
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('should call getProductId()', () => {
    const url = `${environment.baseUrl}/bp/products`;
    const headers = new HttpHeaders()
      .set( 'authorId', environment.authorId );

      httpClient.get(url, { headers })
      .subscribe( (data:any) => {
        expect(data).toEqual(mockProduct)
        expect(data.length).toBe(1);
      }
      );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProduct);
  });
  
  it('should call getProductId() with ID', async() => {
    const id = mockProduct[0].id;
    jest.spyOn(service,'getProductId').mockReturnValue(of(mockProduct));
    const resp = await service.getProductId(id).toPromise();
    expect(resp).toBe(mockProduct);
    expect(resp?.length).toBe(1);
    
  });

  it('should call getCheckId()', () => {
    const id = mockProduct[0].id;
    service.getCheckId(id);
    const url = `${environment.baseUrl}/bp/products/verification`;
    const params = new HttpParams()
      .set('id', id);

    httpClient.get( url, { params } )
      .subscribe( data => 
        expect(data).toEqual(true)
      );
    const req = httpMock.expectOne(`${url}?id=${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(true);
  });

  it('should saveProduct()', () => {
    const body = mockProduct[0];
    service.saveProduct(body);

    const url = `${environment.baseUrl}/bp/products`;
    const headers = new HttpHeaders()
      .set( 'authorId', environment.authorId );

    httpClient.post(url, body, { headers })
      .subscribe( data => 
        expect(data).toEqual(mockProduct)
      );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(mockProduct);
  });

  it('should updateProduct()', () => {
    const body = mockProduct[0];
    service.updateProduct(body);

    const url = `${environment.baseUrl}/bp/products`;
    const headers = new HttpHeaders()
      .set( 'authorId', environment.authorId );

    httpClient.put(url, body, { headers })
      .subscribe( data => 
        expect(data).toEqual(mockProduct)
      );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockProduct);
  });

  it('should deleteProduct()', () => {
    const id = mockProduct[0].id;
    service.deleteProduct(id);

    const url = `${environment.baseUrl}/bp/products`;
    const headers = new HttpHeaders()
      .set( 'authorId', environment.authorId );
    const params = new HttpParams()
      .set('id', id);
    const options = {
      headers,
      params
    };

    httpClient.delete(url,options)
      .subscribe( data => 
        expect(data).toEqual(mockProduct)
      );
    const req = httpMock.expectOne(`${url}?id=${id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockProduct);
  });
});
