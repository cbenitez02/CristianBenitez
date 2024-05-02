import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalService } from '../../services/modal.service';
import { of } from 'rxjs';

const modalServiceMock = {
  showModal$: of({ id: '1', name: 'Test' }),
  closeModal: jest.fn(),
  onClickConfirm: jest.fn(),
};

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
      ],
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal when there is data', () => {
    expect(component.showModal).toBe(true);
    expect(component.data).toEqual({ id: '1', name: 'Test' });
  });

  it('should close modal', () => {
    component.onClose();
    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should confirm', () => {
    component.onConfirm('1');
    expect(modalService.onClickConfirm).toHaveBeenCalledWith('1');
  });
});