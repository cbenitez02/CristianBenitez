import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TableComponent } from './table.component';
import { ApiService } from '../../services/api.service';
import { Product } from '../../interfaces/products-response.interface';
import { DropdownService } from '../../services/dropdown.service';
import { ModalService } from '../../services/modal.service';
import { of, throwError } from 'rxjs';
import { TableSkeletonComponent } from '../table-skeleton/table-skeleton.component';
import { NotificationToastService } from '../../services/notification-toast.service';

const mockProduct: Product[] = [{
  id: 'tj-q1',
  name: 'Tarjetas',
  description: 'Tarjetas de crédito',
  logo: 'img.jpg',
  date_release: '2023-07-26',
  date_revision: '2024-07-26'
}];

const dropdownServiceMock = {
  showOptions$: of(false),
  currentProductId$: of(null),
  toggleDropdown: jest.fn(),
  closeDropdown: jest.fn(),
};

const modalServiceMock = {
  openModal: jest.fn(),
  onConfirm$: of('tj-q1'),
};

const notificationServiceMock = {
  success: jest.fn(),
  error: jest.fn(),
  getToast: jest.fn().mockReturnValue(of({}))
};

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let compiled: HTMLElement;
  let service: ApiService;
  let dropdownService: DropdownService;
  let modalService: ModalService;
  let notificationService: NotificationToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, TableSkeletonComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ApiService,
        { provide: DropdownService, useValue: dropdownServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: NotificationToastService, useValue: notificationServiceMock}
      ]
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    service = TestBed.inject( ApiService );
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    dropdownService = TestBed.inject(DropdownService);
    modalService = TestBed.inject(ModalService);
    notificationService = TestBed.inject(NotificationToastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //----------------------------------------------------------

  it('should set products and isLoading correctly when getProducts is successful', () => {
    const getProductsSpy = jest.spyOn(service, 'getProducts').mockReturnValue(of(mockProduct));

    component.getProducts();

    expect(getProductsSpy).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(component.productsAll).toEqual(mockProduct);
    expect(component.products).toEqual(mockProduct.slice(0, 5));
  });

  it('should set isLoading correctly and call notificationService.error when getProducts fails', () => {
    const errorResponse = new ErrorEvent('Network error');
    const getProductsSpy = jest.spyOn(service, 'getProducts').mockReturnValue(throwError(errorResponse));
    const notificationSpy = jest.spyOn(notificationService, 'error');

    component.getProducts();

    expect(getProductsSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith('Error al cargar los productos', 'No se pudieron cargar los productos');
    expect(component.isLoading).toBe(false);
  });
  
  //-------------------------------------------------------------------

  it('should filterTermHandler()', () => {
    const term = 'Tarjetas';
    component.productsAll = mockProduct;
    component.filterTermHandler(term);
    expect(component.products.length).toBeGreaterThanOrEqual(0);
  });

  it('should call getSearchTerm()', () => {
    const term = 'txt'
    const filter = jest.spyOn(component,'filterTermHandler')
    jest.spyOn(service.dispachSearchTerm, 'subscribe');
    component.productsAll = mockProduct;
    component.getSearchTerm()
    expect(component.products.length).toBeGreaterThanOrEqual(0);
    expect(component.products).toBeTruthy();
  });

  it('should call openDelete() and deleteService()', () => {
    const product = mockProduct[0];
    const openModalSpy = jest.spyOn(modalService, 'openModal');  
    const deleteServiceSpy = jest.spyOn(component, 'deleteService').mockImplementation(() => {});
    
    component.openDelete(product);
    
    expect(openModalSpy).toHaveBeenCalledWith(product);
    expect(deleteServiceSpy).toHaveBeenCalledWith(product.id);
  });

  it('should subscribe to onConfirm$ in openDelete()', () => {
    const product = mockProduct[0];
    const openModalSpy = jest.spyOn(modalService, 'openModal');
    const onConfirmSpy = jest.spyOn(modalService.onConfirm$, 'subscribe');
    const deleteServiceSpy = jest.spyOn(component, 'deleteService').mockImplementation(() => {});
    component.openDelete(product);
    expect(openModalSpy).toHaveBeenCalledWith(product);
    expect(onConfirmSpy).toHaveBeenCalled();
    expect(deleteServiceSpy).toHaveBeenCalledWith(product.id);
  });

  //testear el metodo deleteService

  it('should update products correctly in onChangeSelect()', () => {
    const value = "5";
    component.productsAll = mockProduct;
    component.onChangeSelect(value);
    expect(component.products.length).toBeLessThanOrEqual(+value);
  });
});
