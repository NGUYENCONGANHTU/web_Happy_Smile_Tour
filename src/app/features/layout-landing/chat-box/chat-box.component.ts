import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { TranslatePipe } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SafeHtmlPipe } from '../../../shared/utils/helpers/safe-html.pipe';
@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [NzButtonModule, NzPopoverModule, TranslatePipe, SafeHtmlPipe],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  visible = false;
  eRef = inject(ElementRef);
  message = inject(NzMessageService);
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

  handleCallOrCopy(phone: string) {
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    if (isMobile) {
      // 📱 Nếu là điện thoại -> mở gọi ngay
      window.location.href = `tel:${phone}`;
    } else {
      // 💻 Nếu là desktop -> copy số
      navigator.clipboard
        .writeText(phone)
        .then(() => {
          this.message.success('Đã sao chép số: ' + phone);
        })
        .catch(() => {
          this.message.error('❌ Sao chép thất bại, vui lòng thử lại!');
        });
    }
  }
}
