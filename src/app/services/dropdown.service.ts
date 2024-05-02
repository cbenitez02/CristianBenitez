import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DropdownService {

  private _showOptions = new BehaviorSubject<boolean>(false);
  showOptions$ = this._showOptions.asObservable();

  private _currentProductId = new BehaviorSubject<string | null>(null);
  currentProductId$ = this._currentProductId.asObservable();

  toggleDropdown(productId: string) {
    this._showOptions.next(!this._showOptions.value);
    this._currentProductId.next(productId);
  }

  closeDropdown() {
    this._showOptions.next(false);
    this._currentProductId.next(null);
  }
}