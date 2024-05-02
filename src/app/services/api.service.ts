import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../interfaces/products-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Output() dispachSearchTerm =  new EventEmitter<string>();

  private readonly baseUrl: string = environment.baseUrl;
  private readonly authorId: string = environment.authorId;

  private http = inject( HttpClient );
  private headers = new HttpHeaders()
    .set( 'authorId', this.authorId );

  constructor() {}

  // Fetches all products from the API
  getProducts (): Observable<Product[]> {
    const url = `${this.baseUrl}/bp/products`;
    return this.http.get<Product[]>(url, { headers: this.headers })
  }

  // Fetches a specific product by its ID from the API
  getProductId ( id:string ): Observable<Product[]> {
    const url = `${this.baseUrl}/bp/products`;
    return this.http.get<Product[]>(url, { headers: this.headers })
      .pipe(
        map( (products) => products.filter(product => product.id === id )),
        catchError(err => throwError(() => err.error.message))
      )
  }

  // Checks if a product ID exists in the API
  getCheckId ( id:string ): Observable<boolean> {
    const url = `${this.baseUrl}/bp/products/verification`;
    const params = new HttpParams()
      .set('id', id);
    return this.http.get<boolean>(url, { params } );
  }

  // Sends a new product to be saved in the API
  saveProduct( body:Product ) {
    const url = `${this.baseUrl}/bp/products`;    
    return this.http.post(url, body, { headers: this.headers });
  }

  // Sends an updated product to be saved in the API
  updateProduct( body:Product ) {
    const url = `${this.baseUrl}/bp/products`; 
    return this.http.put(url, body, { headers: this.headers });
  }

  // Deletes a specific product by its ID from the API
  deleteProduct( id:string ) {
    const url = `${this.baseUrl}/bp/products`;
    const params = new HttpParams()
      .set('id', id);
    const options = {
      params,
      headers: this.headers
    }
    return this.http.delete( url, options )
      .pipe(
        catchError(err => throwError(() => err.status))
      )
  }
}
