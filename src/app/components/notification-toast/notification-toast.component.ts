import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ToastData, ToastType } from "../../interfaces/notification-toast.model";
import { NotificationToastService } from "../../services/notification-toast.service";

@Component({
  selector: 'app-notification-toast',
  styleUrls: ['./notification-toast.component.scss'],
  template: `
    <div class="toast" *ngIf="show" [ngClass]="{'success': type === 'success', 'error': type === 'error'}">
      <span>{{title}}</span>
      <p>{{message}}</p>
    </div>
  `,
})

export class NotificationToastComponent {
  public show: boolean = false
  public title: string = ''
  public message: string = ''
  public type!: ToastType;

  private subscription!: Subscription

  constructor(private notificationService: NotificationToastService) { }

  ngOnInit(): void {
    this.subscription = this.notificationService.getToast().subscribe( (toastData: ToastData) => {
      this.title = toastData.title
      this.message = toastData.message
      this.type = toastData.type
      this.show = true

      setTimeout(() => {
        this.show = false
      }, 3000)
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}