import { Pipe, PipeTransform } from '@angular/core';
import {
  TranslationService,
  TranslationResponse,
  TranslationSection,
} from './translation.service';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'trans',
  standalone: true,
  pure: false, // đổi sang false để Angular check lại khi data thay đổi
})
export class TranslatePipe implements PipeTransform {
  private dataTrans$ = new BehaviorSubject<TranslationResponse['data'] | null>(
    null
  );

  constructor(private translationService: TranslationService) {
    this.translationService.getDataTransLate().subscribe(res => {
      this.dataTrans$.next(res.data);
    });
  }

  transform(value: string, key: TranslationSection, fallback = ''): string {
    const dataTrans = this.dataTrans$.value;
    return dataTrans?.[key]?.[value] ?? fallback ?? value;
  }
}
