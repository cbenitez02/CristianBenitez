import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription, takeUntil } from "rxjs";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit, OnDestroy{
  showModal: boolean = false;
  data: any;

  private subscription!: Subscription;
  private unsubscribe$ = new Subject<void>();

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.subscription = this.modalService.showModal$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.showModal = data !== null;
          this.data = data;
        },
        error => {
          console.error('Error occurred: ', error);
        }
      );
  }

  onClose(){
    this.modalService.closeModal();
  }

  onConfirm(id: string){
    this.modalService.onClickConfirm(id);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}