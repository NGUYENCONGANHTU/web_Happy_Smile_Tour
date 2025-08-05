import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBoxComponent } from './features/chat-box/chat-box.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatBoxComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web-land-tour';
}
