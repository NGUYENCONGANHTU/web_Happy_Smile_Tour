import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [NzButtonModule, NzPopoverModule],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  visible = false;

  eRef = inject(ElementRef);
  togglePopover(event: MouseEvent): void {
    event.stopPropagation();
    this.visible = !this.visible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.visible = false;
    }
  }
}
