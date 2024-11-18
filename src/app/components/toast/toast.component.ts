import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: true, // Indicates a standalone component
  imports: [CommonModule],
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toast: Toast) => {
      this.toasts.push(toast);
      setTimeout(() => {
        this.removeToast(toast);
      }, 5000); // Auto-remove after 5 seconds
    });
  }

  removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
