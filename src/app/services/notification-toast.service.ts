import { Injectable } from "@angular/core";
import { ToastData } from "../interfaces/notification-toast.model";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class NotificationToastService {

  // ReplaySubject that holds the latest toast data
  private data = new ReplaySubject<ToastData>();

  /**
   * Emit a success toast with the given title and message
   */
  success(title: string, message: string): void {
    this.data.next({title, message, type: 'success'});
  }

  /**
   * Emit an error toast with the given title and message
   */
  error(title: string, message: string): void {
    this.data.next({title, message, type: 'error'});
  }

  /**
   * Get an observable of the latest toast data
   */
  getToast(): Observable<ToastData> {
    return this.data.asObservable();
  }
}