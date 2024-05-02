export type ToastType = 'success' | 'error';

export interface ToastData {
  title: string;
  message: string;
  type: ToastType;
}