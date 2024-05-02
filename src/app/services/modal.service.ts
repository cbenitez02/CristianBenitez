import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  private showModalSubject = new Subject<any>();
  public showModal$ = this.showModalSubject.asObservable();

  private onConfirm = new Subject<any>();
  public onConfirm$ = this.onConfirm.asObservable();

  openModal(data: any) {
    this.showModalSubject.next(data);
  }

  onClickConfirm(id: string) {
    this.onConfirm.next(id);
    this.closeModal();
  }

  closeModal() {
    this.showModalSubject.next(null);
  }
}