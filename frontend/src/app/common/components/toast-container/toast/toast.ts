import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './toast.scss',
  templateUrl: './toast.html',
})
export class Toast implements OnChanges, OnDestroy {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' = 'success';
  @Input() open = false;
  @Input() autoClose = true;
  @Input() duration = 4000;

  @Output() closed = new EventEmitter<void>();

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] || changes['message']) {
      if (this.open) {
        this.startAutoClose();
      } else {
        this.clearAutoClose();
      }
    }
  }

  ngOnDestroy(): void {
    this.clearAutoClose();
  }

  get title(): string {
    switch (this.type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Action needed';
      case 'info':
      default:
        return 'Update';
    }
  }

  get icon(): string {
    switch (this.type) {
      case 'success':
        return 'OK';
      case 'error':
        return '!';
      case 'info':
      default:
        return 'i';
    }
  }

  closeToast(): void {
    this.clearAutoClose();
    this.closed.emit();
  }

  private startAutoClose(): void {
    this.clearAutoClose();

    if (this.autoClose && this.duration > 0) {
      this.timeoutId = setTimeout(() => this.closeToast(), this.duration);
    }
  }

  private clearAutoClose(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
