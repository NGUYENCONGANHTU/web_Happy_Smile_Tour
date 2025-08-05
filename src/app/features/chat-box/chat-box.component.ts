import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  isChatOpen = false;

  toggleChat() {
    console.log('ToggleChat called before change');
    this.isChatOpen = !this.isChatOpen;
    console.log('Chat toggled, isChatOpen:', this.isChatOpen);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const chatIcon = document.getElementById('chat-icon');
    const chatPopup = document.getElementById('chat-popup');
    if (
      this.isChatOpen &&
      !chatIcon?.contains(event.target as Node) &&
      !chatPopup?.contains(event.target as Node)
    ) {
      this.isChatOpen = false;
      console.log('Popup closed by outside click');
    }
  }
}
