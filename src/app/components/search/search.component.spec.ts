import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ApiService } from '../../services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let compiled: HTMLElement;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService
      ]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    service = TestBed.inject( ApiService );

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be match with the snapshop', () => {
    expect(compiled.innerHTML).toMatchSnapshot();
  });

  it('should emit search value to the service', () => {
    const value = 'txt';
    const spy = jest.spyOn(service.dispachSearchTerm, 'emit');
    component.search(value);
    expect(spy).toHaveBeenCalledWith(value);
  });
});
