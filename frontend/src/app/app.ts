import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainer } from '@common/components/toast-container/toast-container';
import { SupportChatComponent } from '@common/components/support-chat/support-chat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainer, SupportChatComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('coffee-shop');
}
