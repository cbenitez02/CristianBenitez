import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private apiService = inject(ApiService);

  search( term: string ) {
    this.apiService.dispachSearchTerm.emit( term.toLowerCase() );
  }
}
