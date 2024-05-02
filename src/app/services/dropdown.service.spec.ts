import { first } from 'rxjs';
import { DropdownService } from './dropdown.service';

describe('DropdownService', () => {
  let service: DropdownService;

  beforeEach(() => {
    service = new DropdownService();
  });

  it('should toggle dropdown state', (done) => {
    service.showOptions$.subscribe(state => {
      expect(state).toBe(true);
      done();
    });

    service.toggleDropdown('testId');
  });

  it('should close dropdown', (done) => {
    service.showOptions$.pipe(first()).subscribe(state => {
      expect(state).toBe(false);
      done();
    });

    service.closeDropdown();
  });

  it('should set current product id when toggling dropdown', (done) => {
    service.currentProductId$.subscribe(id => {
      expect(id).toBe('testId');
      done();
    });

    service.toggleDropdown('testId');
  });

  it('should clear current product id when closing dropdown', (done) => {
    service.currentProductId$.pipe(first()).subscribe(id => {
      expect(id).toBeNull();
      done();
    });

    service.closeDropdown();
  });
});