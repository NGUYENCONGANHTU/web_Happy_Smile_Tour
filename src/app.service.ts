import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';
import {
  CommentFeedbackResDTO,
  ContactPageResDTO,
  ContactPrivateTourReqDTO,
  ContactPrivateTourResDTO,
  FeatureResDTO,
  FooterResDTO,
  BannerResDTO,
  HomeTitleResDTO,
  LanguageResDTO,
  LocationResDTO,
  PartnerResDTO,
  PrivateTourResDTO,
  TourCommentDetailReqDTO,
  TourCommentDetailResDTO,
  TravelGuideResDTO,
  VisaProcessResDTO,
  VisaServiceResDTO,
} from './interface';
import {
  ResponseBaseList,
  ResponseBasePage,
} from './app/core/interfaces/base.interface';
import { LanguageService } from './app/shared/services/language.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  http = inject(HttpClient);
  languageService = inject(LanguageService);
  // API
  apiUrl = environment.API_URL + '/banner-trans/type';
  apiUrl2 = environment.API_URL + '/home-title-trans';
  apiUrl3 = environment.API_URL + '/location-trans';
  apiUrl4 = environment.API_URL + '/tour-trans/filter?';
  apiUrl5 = environment.API_URL + '/tour-trans';
  apiUrl7 = environment.API_URL + '/travel-guide-trans';
  apiUrl8 = environment.API_URL + '/home-comment';
  apiUrl11 = environment.API_URL + '/group-tour-trans';
  apiUrl12 = environment.API_URL + '/tour-contact';
  apiUrl13 = environment.API_URL + '/info-trans';
  apiUrlLanguage = environment.API_URL + '/language';
  apiVisaService = environment.API_URL + '/visa-service-trans';
  apiPartner = environment.API_URL + '/partner';
  apiVisaProcess = environment.API_URL + '/visa-process-trans';
  apiUrlTourCommentDetail = environment.API_URL + '/tour-comment';
  apiFooter = environment.API_URL + '/footer-trans';

  /*======================== HOME BANNER ==========================*/

  getAlLDataBannerHome() {
    return this.http.get<{ data: BannerResDTO[] }>(
      this.apiUrl + `/HOME?langCode=${this.languageService.locale}`
    );
  }

  getAlLDataBannerIntro() {
    return this.http.get<{ data: BannerResDTO[] }>(
      this.apiUrl + `/INTRO?langCode=${this.languageService.locale}`
    );
  }

  getAlLDataBannerContact() {
    return this.http.get<{ data: BannerResDTO[] }>(
      this.apiUrl + `/CONTACT?langCode=${this.languageService.locale}`
    );
  }

  /*======================== HOME TITLE ==========================*/
  getAlLDataTitle() {
    return this.http.get<{ data: HomeTitleResDTO[] }>(
      this.apiUrl2 + `/all?langCode=${this.languageService.locale}`
    );
  }

  /*======================== LOCATION ==========================*/
  getAlLDataLocationDomestic() {
    return this.http.get<{ data: LocationResDTO[] }>(
      this.apiUrl3 + `/type/DOMESTIC?langCode=${this.languageService.locale}`
    );
  }
  getAlLDataLocationInternational() {
    return this.http.get<{ data: LocationResDTO[] }>(
      this.apiUrl3 +
        `/type/INTERNATIONAL?langCode=${this.languageService.locale}`
    );
  }

  /*======================== CÁC TOUR NỔI BẬT ==========================*/

  getAllDataTourFeature4() {
    return this.http.get<{ data: FeatureResDTO[] }>(
      this.apiUrl5 + `/all?langCode=${this.languageService.locale}`
    );
  }

  getDataTourFeatureById4(id: number) {
    const lang = this.languageService.locale;
    const url = `${this.apiUrl5}/service/${id}?langCode=${lang}`;
    return this.http.get<{ data: FeatureResDTO }>(url);
  }

  /*============================== TAB FOREIGN ================================*/

  changeTabForeign(id: number) {
    return this.http.get<ResponseBasePage<FeatureResDTO>>(
      `${this.apiUrl4 + 'locationId='}${id}&langCode=${this.languageService.locale}`
    );
  }
  changeTabDomestic(id: number) {
    return this.http.get<ResponseBasePage<FeatureResDTO>>(
      `${this.apiUrl4 + 'locationId='}${id}&langCode=${this.languageService.locale}`
    );
  }
  /*============================== CẨM NANG DU LỊCH ================================*/

  getAllDataTravelGuide() {
    return this.http.get<ResponseBaseList<TravelGuideResDTO>>(
      `${this.apiUrl7}/all?langCode=${this.languageService.locale}`
    );
  }
  getDataByIdTravelGuide(id: number) {
    return this.http.get<{ data: TravelGuideResDTO }>(
      `${this.apiUrl7}/service/${id}?langCode=${this.languageService.locale}`
    );
  }

  /*============================== KHÁCH HÀNG ĐÁNH GIÁ ================================*/

  getAllDataCommentFeedback() {
    return this.http.get<{ data: CommentFeedbackResDTO[] }>(this.apiUrl8);
  }

  /*============================== TOUR ĐOÀN RIÊNG ================================*/

  getAllDataPrivateTour() {
    return this.http.get<{ data: PrivateTourResDTO[] }>(
      this.apiUrl11 + `/all?langCode=${this.languageService.locale}`
    );
  }

  /*============================== LIÊN HỆ TRONG TOUR ĐOÀN RIÊNG ================================*/
  createDataContactPrivateTour(data: ContactPrivateTourReqDTO) {
    return this.http.post<ContactPrivateTourResDTO>(this.apiUrl12, data);
  }

  /*============================== PAGE LIÊN HỆ ================================*/

  getAllDataAddressContactPage() {
    return this.http.get<{ data: ContactPageResDTO[] }>(
      this.apiUrl13 + `/type/ADDRESS?langCode=${this.languageService.locale}`
    );
  }
  getAllDataPhoneContactPage() {
    return this.http.get<{ data: ContactPageResDTO[] }>(
      this.apiUrl13 + `/type/PHONE?langCode=${this.languageService.locale}`
    );
  }
  getAllDataEmailContactPage() {
    return this.http.get<{ data: ContactPageResDTO[] }>(
      this.apiUrl13 + `/type/EMAIL?langCode=${this.languageService.locale}`
    );
  }

  /*============================== TOUR COMMENT DETAIL ================================*/
  createDataCommentFeedbackDetail(data: TourCommentDetailReqDTO) {
    return this.http.post<TourCommentDetailResDTO>(
      this.apiUrlTourCommentDetail,
      data
    );
  }

  /*============================== MENU SERVICE ================================*/

  getAllDataMenuService() {
    return this.http.get<{ data: VisaServiceResDTO[] }>(
      this.apiVisaService + `/all?langCode=${this.languageService.locale}`
    );
  }
  getDataByIdMenuService(id: number) {
    return this.http.get<{ data: VisaServiceResDTO }>(
      `${this.apiVisaService + '/service'}/${id}?langCode=${this.languageService.locale}`
    );
  }

  /*============================== Visa Process ================================*/

  getAllDataVisaProcess() {
    return this.http.get<ResponseBaseList<VisaProcessResDTO>>(
      this.apiVisaProcess
    );
  }

  getAllDataLanguage() {
    return this.http.get<{ data: LanguageResDTO[] }>(this.apiUrlLanguage);
  }

  /*============================== Visa Process ================================*/

  getAllDataPartner() {
    return this.http.get<{ data: PartnerResDTO[] }>(this.apiPartner);
  }

  /*============================== Footer ================================*/

  getAllDataFooter() {
    return this.http.get<{ data: FooterResDTO[] }>(
      this.apiFooter + `/all?langCode=${this.languageService.locale}`
    );
  }
}
