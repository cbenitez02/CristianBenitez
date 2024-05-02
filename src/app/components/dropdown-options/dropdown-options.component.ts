import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/interfaces/products-response.interface";
import { DropdownService } from "../../services/dropdown.service";

@Component({
  selector: 'app-dropdown-options',
  templateUrl: './dropdown-options.component.html',
  styleUrls: ['./dropdown-options.component.scss']
})

export class DropdownOptionsComponent {
  @Input() public product!: Product;

  @Output() onDeleteEvent = new EventEmitter<Product>();

  public showOptions: boolean = false;
  public currentProductId: string | null = null;

  private subscription!: Subscription;

  constructor(
    private dropdownService: DropdownService
  ) {}

  ngOnInit() {
    this.subscription = this.dropdownService.showOptions$.subscribe(showOptions => {
      this.showOptions = showOptions;
    });

    this.dropdownService.currentProductId$.subscribe(productId => {
      this.currentProductId = productId;
    });
  }

  toggleDropdown(productId: string) {
    this.dropdownService.toggleDropdown(productId);
  }

  onDelete(product: Product){
    this.onDeleteEvent.emit(product);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!event.target.classList.contains('modal') && !event.target.classList.contains('dots')) {
      this.dropdownService.closeDropdown();
    }
  }

  ngOnDestroy() {
    this.dropdownService.closeDropdown();
    this.subscription.unsubscribe();
  }
}