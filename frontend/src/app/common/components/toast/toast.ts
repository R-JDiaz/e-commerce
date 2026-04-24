import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';


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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      if (this.open) {
        this.startAutoClose();
      } else {
        this.clearAutoClose();
      }
    }
  }

  ngOnDestroy() {
    this.clearAutoClose();
  }

  get title() {
    return this.type === 'success' ? 'Success' : this.type === 'error' ? 'Error' : 'Info';
  }

  get icon() {
    return this.type === 'success' ? '✓' : this.type === 'error' ? '⚠️' : 'ℹ️';
  }

  closeToast() {
    this.clearAutoClose();
    this.closed.emit();
  }

  private startAutoClose() {
    this.clearAutoClose();
    if (this.autoClose && this.duration > 0) {
      this.timeoutId = setTimeout(() => this.closeToast(), this.duration);
    }
  }

  private clearAutoClose() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
