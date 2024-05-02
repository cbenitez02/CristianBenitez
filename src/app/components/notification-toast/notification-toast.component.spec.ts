import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationToastComponent } from './notification-toast.component';
import { NotificationToastService } from '../../services/notification-toast.service';
import { Subject, of } from 'rxjs';
import { ToastData } from 'src/app/interfaces/notification-toast.model';
import { Subscription } from 'rxjs';

const notificationToastServiceMock = {
  getToast: () => of({ title: 'Test Title', message: 'Test Message', type: 'success' }),
};

describe('NotificationToastComponent', () => {
  let component: NotificationToastComponent;
  let fixture: ComponentFixture<NotificationToastComponent>;
  let notificationToastService: NotificationToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationToastComponent],
      providers: [
        { provide: NotificationToastService, useValue: notificationToastServiceMock },
      ],
    });
    fixture = TestBed.createComponent(NotificationToastComponent);
    component = fixture.componentInstance;
    notificationToastService = TestBed.inject(NotificationToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show toast when there is data', () => {
    expect(component.show).toBe(true);
    expect(component.title).toEqual('Test Title');
    expect(component.message).toEqual('Test Message');
    expect(component.type).toEqual('success');
  });

  it('should hide toast after 3 seconds', done => {
    setTimeout(() => {
      expect(component.show).toBe(false);
      done();
    }, 3000);
  });

  it('should unsubscribe on destroy', () => {
    const subscription = new Subscription();
    jest.spyOn(subscription, 'unsubscribe');
  
    // @ts-ignore
    component.subscription = subscription;
  
    component.ngOnDestroy();
  
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
});