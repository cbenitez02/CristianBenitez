import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/interfaces/products-response.interface';
import { ModalService } from '../../services/modal.service';
import { NotificationToastService } from '../../services/notification-toast.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private apiService = inject( ApiService );
  private notificationService = inject( NotificationToastService );
  private modalService = inject( ModalService );
    
  public products:Product[] = [];
  public productsAll:Product[] = [];

  public isLoading = false;

  ngOnInit(){
    this.getProducts();
    this.getSearchTerm();
  }

  get productsLength () {
    return this.productsAll.length;
  }

  getSearchTerm() {
    this.apiService.dispachSearchTerm
    .subscribe( term => this.filterTermHandler(term))
  }

  filterTermHandler ( term: string ){
    this.products = this.productsAll
      .filter( 
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)  
      )
  }

  getProducts() {
    this.isLoading = true;
    this.apiService.getProducts()
    .subscribe({
      next: (products) => {
        this.productsAll = products;
        this.products = this.productsAll.slice(0,5);
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.error('Error al cargar los productos', 'No se pudieron cargar los productos')
        this.isLoading = false;
      },
    });
  }

  openDelete(product: Product) {
    this.modalService.openModal(product);
    this.modalService.onConfirm$
      .pipe(take(1))
      .subscribe((id: string) => {
        this.deleteService(id);
      });
  }

  deleteService(id:string){
    this.apiService.deleteProduct(id)
    .subscribe({
      error:  (err) => {
        if(err == 200){
          this.notificationService.success('Eliminado con éxito', 'Se eliminó correctamente')
          this.getProducts();
        } 
        else this.notificationService.error('Error al eliminar', 'No se pudo eliminar el producto')
      }
    })
  }

  onChangeSelect( value:string) {
    this.products = this.productsAll.slice(0,+value)
  }
}
