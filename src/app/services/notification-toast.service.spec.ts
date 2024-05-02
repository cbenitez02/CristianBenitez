import { TestBed } from '@angular/core/testing';
import { NotificationToastService } from './notification-toast.service';
import { take } from 'rxjs/operators';

describe('NotificationToastService', () => {
  let service: NotificationToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit success toast data', (done) => {
    const title = 'Success';
    const message = 'Operation was successful';
    service.getToast().pipe(take(1)).subscribe(data => {
      expect(data).toEqual({ title, message, type: 'success' });
      done();
    });

    service.success(title, message);
  });

  it('should emit error toast data', (done) => {
    const title = 'Error';
    const message = 'Operation failed';
    service.getToast().pipe(take(1)).subscribe(data => {
      expect(data).toEqual({ title, message, type: 'error' });
      done();
    });

    service.error(title, message);
  });
});