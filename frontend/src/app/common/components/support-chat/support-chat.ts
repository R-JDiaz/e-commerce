import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { SupportThreadDTO } from '@common/services/api/support/support-api.service';
import { SupportManager } from '@common/services/managers/support/support';
import { SupportUiManager } from '@common/services/managers/support/support-ui';

@Component({
  selector: 'app-chat-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-chat.html',
  styleUrl: './support-chat.scss',
})
export class SupportChatComponent implements OnInit, OnDestroy {
  thread$!: Observable<SupportThreadDTO | null>;
  open$!: Observable<boolean>;
  draft = '';
  private openSub?: Subscription;

  constructor(
    private supportManager: SupportManager,
    private uiManager: SupportUiManager
  ) {}

  ngOnInit(): void {
    this.open$ = this.uiManager.open$;
    this.thread$ = this.supportManager.activeThread$;
    this.openSub = this.open$.subscribe((open) => {
      if (open && !this.supportManager.getCurrentThread()) {
        this.supportManager.loadCustomerThread().subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.openSub?.unsubscribe();
  }

  close(): void {
    this.uiManager.close();
  }

  sendMessage(): void {
    const message = this.draft.trim();
    if (!message) {
      return;
    }

    this.supportManager.sendCustomerMessage(message).subscribe({
      next: () => {
        this.draft = '';
        this.uiManager.open();
      },
    });
  }

  ensureThreadLoaded(): void {
    if (!this.supportManager.getCurrentThread()) {
      this.supportManager.loadCustomerThread().subscribe();
    }
  }

  trackByMessage(_: number, message: SupportThreadDTO['messages'][number]): string {
    return message.id;
  }
}
