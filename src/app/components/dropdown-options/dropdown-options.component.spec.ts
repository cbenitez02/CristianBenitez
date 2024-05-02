import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownOptionsComponent } from './dropdown-options.component';
import { DropdownService } from '../../services/dropdown.service';
import { Subscription, of } from 'rxjs';
import { Product } from 'src/app/interfaces/products-response.interface';
import { RouterTestingModule } from '@angular/router/testing';

const dropdownServiceMock = {
  showOptions$: of(false),
  currentProductId$: of(null),
  toggleDropdown: jest.fn(),
  closeDropdown: jest.fn(),
};

const productMock: Product = {
  id: 'testId',
  name: 'Test Product',
  description: 'Test Description',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  date_release: '2021-09-01',
  date_revision: '2021-09-01',
};

describe('DropdownOptionsComponent', () => {
  let component: DropdownOptionsComponent;
  let fixture: ComponentFixture<DropdownOptionsComponent>;
  let dropdownService: DropdownService;
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DropdownOptionsComponent],
      providers: [
        { provide: DropdownService, useValue: dropdownServiceMock },
      ],
    });
    fixture = TestBed.createComponent(DropdownOptionsComponent);
    component = fixture.componentInstance;
    dropdownService = TestBed.inject(DropdownService);
    component.product = productMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown', () => {
    const productId = 'testId';
    component.toggleDropdown(productId);
    expect(dropdownService.toggleDropdown).toHaveBeenCalledWith(productId);
  });

  it('should emit delete event', () => {
    const product = productMock;
    const onDeleteEventSpy = jest.spyOn(component.onDeleteEvent, 'emit');
    component.onDelete(product);
    expect(onDeleteEventSpy).toHaveBeenCalledWith(product);
  });

  it('should close dropdown when clicking outside', () => {
    const event = {
      target: {
        classList: {
          contains: () => false,
        },
      },
    };
    component.clickout(event);
    expect(dropdownService.closeDropdown).toHaveBeenCalled();
  });
});