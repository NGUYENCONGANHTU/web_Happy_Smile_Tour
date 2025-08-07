import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './environment';
import {
  CommentFeedbackReqDTO,
  CommentFeedbackResDTO,
  ContactPageReqDTO,
  ContactPageResDTO,
  ContactPrivateTourReqDTO,
  ContactPrivateTourResDTO,
  FeatureReqDTO,
  FeatureResDTO,
  FooterReqDTO,
  FooterResDTO,
  BannerReqDTO,
  BannerResDTO,
  HomeTitleReqDTO,
  HomeTitleResDTO,
  LanguageReqDTO,
  LanguageResDTO,
  LocationReqDTO,
  LocationResDTO,
  PartnerReqDTO,
  PartnerResDTO,
  PrivateTourReqDTO,
  PrivateTourResDTO,
  TourCommentDetailReqDTO,
  TourCommentDetailResDTO,
  TravelGuideReqDTO,
  TravelGuideResDTO,
  VisaProcessReqDTO,
  VisaProcessResDTO,
  VisaServiceReqDTO,
  VisaServiceResDTO,
} from './interface';
import {
  ResponseBaseList,
  ResponseBasePage,
} from './app/core/interfaces/base.interface';
import { LanguageService } from './app/shared/services/language.service';
import {
  IntroducePageReqDTO,
  IntroducePageResDTO,
} from './app/features/layout-landing/introduce/interface-introduce';

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
  apiUrl9 = environment.API_URL + '/intro-trans';
  apiUrl10 = environment.API_URL + '/intro-title-trans';
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
  createData(data: BannerReqDTO) {
    return this.http.post<BannerResDTO>(this.apiUrl, data);
  }

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
  getAlLDataBannerService() {
    return this.http.get<{ data: BannerResDTO[] }>(
      this.apiUrl + `/SERVICE?langCode=${this.languageService.locale}`
    );
  }

  getDataById(id: number) {
    return this.http.get<BannerResDTO>(`${this.apiUrl}/${id}`);
  }

  updateData(data: BannerReqDTO, id: number) {
    return this.http.put<BannerResDTO>(`${this.apiUrl}/${id}`, data);
  }
  deleteData(id: number) {
    return this.http.delete<BannerResDTO>(`${this.apiUrl}/${id}`);
  }

  /*======================== HOME TITLE ==========================*/
  createData2(data: HomeTitleReqDTO) {
    return this.http.post<HomeTitleResDTO>(this.apiUrl2, data);
  }

  getAlLDataTitle() {
    return this.http.get<{ data: HomeTitleResDTO[] }>(
      this.apiUrl2 + `/all?langCode=${this.languageService.locale}`
    );
  }
  getAlLDataImage() {
    return this.http.get<{ data: HomeTitleResDTO[] }>(
      this.apiUrl2 + '/type/IMAGE'
    );
  }
  getDataById2(id: number) {
    return this.http.get<HomeTitleResDTO>(`${this.apiUrl2}/${id}`);
  }

  updateData2(data: HomeTitleReqDTO, id: number) {
    return this.http.put<HomeTitleResDTO>(`${this.apiUrl2}/${id}`, data);
  }
  deleteData2(id: number) {
    return this.http.delete<HomeTitleResDTO>(`${this.apiUrl2}/${id}`);
  }

  /*======================== LOCATION ==========================*/

  createData3(data: LocationReqDTO) {
    return this.http.post<LocationResDTO>(this.apiUrl3, data);
  }
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

  getDataById3(id: number) {
    return this.http.get<LocationResDTO>(`${this.apiUrl3}/${id}`);
  }

  updateData3(data: LocationReqDTO, id: number) {
    return this.http.put<LocationResDTO>(`${this.apiUrl3}/${id}`, data);
  }
  deleteData3(id: number) {
    return this.http.delete<LocationResDTO>(`${this.apiUrl3}/${id}`);
  }

  /*======================== CÁC TOUR NỔI BẬT ==========================*/

  getAllDataTourFeature4() {
    return this.http.get<{ data: FeatureResDTO[] }>(
      this.apiUrl5 + `/all?langCode=${this.languageService.locale}`
    );
  }
  createDataTourFeature4(data: FeatureReqDTO) {
    return this.http.post<FeatureResDTO>(this.apiUrl4, data);
  }

  getDataTourFeatureById4(id: number) {
    const lang = this.languageService.locale;
    const url = `${this.apiUrl5}/service/${id}?langCode=${lang}`;
    return this.http.get<{ data: FeatureResDTO }>(url);
  }

  updateDataTourFeature4(data: FeatureReqDTO, id: number) {
    return this.http.put<FeatureResDTO>(`${this.apiUrl4}/${id}`, data);
  }
  deleteDataTourFeature4(id: number) {
    return this.http.delete<FeatureResDTO>(`${this.apiUrl4}/${id}`);
  }

  /*======================== NẾU CÓ TAB TẤT CẢ TOUR THÌ DÙNG ==========================*/
  getDataTourForeign() {
    const params = new HttpParams()
      .set('type', 'INTERNATIONAL')
      .set('langCode', this.languageService.locale);

    return this.http.get<{ data: { content: FeatureResDTO[] } }>(this.apiUrl4, {
      params,
    });
  }
  getDataTourDomestic() {
    const params = new HttpParams()
      .set('type', 'DOMESTIC')
      .set('langCode', this.languageService.locale);

    return this.http.get<{ data: { content: FeatureResDTO[] } }>(this.apiUrl4, {
      params,
    });
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

  createDataTravelGuide(data: TravelGuideReqDTO) {
    return this.http.post<TravelGuideResDTO>(this.apiUrl7, data);
  }
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

  updateDataTravelGuide(data: TravelGuideReqDTO, id: number) {
    return this.http.put<TravelGuideResDTO>(`${this.apiUrl7}/${id}`, data);
  }
  deleteDataTravelGuide(id: number) {
    return this.http.delete<TravelGuideResDTO>(`${this.apiUrl7}/${id}`);
  }

  /*============================== KHÁCH HÀNG ĐÁNH GIÁ ================================*/
  createDataCommentFeedback(data: CommentFeedbackReqDTO) {
    return this.http.post<CommentFeedbackResDTO>(this.apiUrl8, data);
  }
  getAllDataCommentFeedback() {
    return this.http.get<{ data: CommentFeedbackResDTO[] }>(this.apiUrl8);
  }
  getDataByIdCommentFeedback(id: number) {
    return this.http.get<CommentFeedbackResDTO>(`${this.apiUrl8}/${id}`);
  }

  updateDataCommentFeedback(data: CommentFeedbackReqDTO, id: number) {
    return this.http.put<CommentFeedbackResDTO>(`${this.apiUrl8}/${id}`, data);
  }
  deleteDataCommentFeedback(id: number) {
    return this.http.delete<CommentFeedbackResDTO>(`${this.apiUrl8}/${id}`);
  }

  /*============================== PAGE GIỚI THIỆU ================================*/
  createDataIntroducePage(data: IntroducePageReqDTO) {
    return this.http.post<IntroducePageResDTO>(this.apiUrl9, data);
  }
  getAllDataBannerIntroducePage() {
    return this.http.get<{ data: IntroducePageResDTO[] }>(
      this.apiUrl9 + '/type/BANNER'
    );
  }

  /*============================== TOUR ĐOÀN RIÊNG ================================*/
  createDataPrivateTour(data: PrivateTourReqDTO) {
    return this.http.post<PrivateTourResDTO>(this.apiUrl11, data);
  }
  getAllDataPrivateTour() {
    return this.http.get<{ data: PrivateTourResDTO[] }>(
      this.apiUrl11 + `/all?langCode=${this.languageService.locale}`
    );
  }
  getAllDataVisaPrivateTour() {
    return this.http.get<PrivateTourResDTO[]>(this.apiUrl11 + '/type/VISA');
  }

  getDataByIdPrivateTour(id: number) {
    return this.http.get<PrivateTourResDTO>(`${this.apiUrl11}/${id}`);
  }
  updateDataPrivateTour(data: PrivateTourReqDTO, id: number) {
    return this.http.put<PrivateTourResDTO>(`${this.apiUrl11}/${id}`, data);
  }
  deleteDataPrivateTour(id: number) {
    return this.http.delete<PrivateTourResDTO>(`${this.apiUrl11}/${id}`);
  }

  /*============================== LIÊN HỆ TRONG TOUR ĐOÀN RIÊNG ================================*/
  createDataContactPrivateTour(data: ContactPrivateTourReqDTO) {
    return this.http.post<ContactPrivateTourResDTO>(this.apiUrl12, data);
  }
  getAllDataContactPrivateTour() {
    return this.http.get<ContactPrivateTourResDTO[]>(this.apiUrl12);
  }

  getDataContactByIdPrivateTour(id: number) {
    return this.http.get<ContactPrivateTourResDTO>(`${this.apiUrl12}/${id}`);
  }
  updateDataContactPrivateTour(data: ContactPrivateTourReqDTO, id: number) {
    return this.http.put<ContactPrivateTourResDTO>(
      `${this.apiUrl12}/${id}`,
      data
    );
  }
  deleteDataContactPrivateTour(id: number) {
    return this.http.delete<ContactPrivateTourResDTO>(`${this.apiUrl12}/${id}`);
  }

  /*============================== PAGE LIÊN HỆ ================================*/
  createDataContactPage(data: ContactPageReqDTO) {
    return this.http.post<ContactPageResDTO>(this.apiUrl13, data);
  }
  getAllDataBannerContactPage() {
    return this.http.get<{ data: ContactPageResDTO[] }>(
      this.apiUrl13 + `/type/BANNER?langCode=${this.languageService.locale}`
    );
  }
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
  getDataByIdContactPage(id: number) {
    return this.http.get<ContactPageResDTO>(`${this.apiUrl13}/${id}`);
  }
  updateDataContactPage(data: ContactPageReqDTO, id: number) {
    return this.http.put<ContactPageResDTO>(`${this.apiUrl13}/${id}`, data);
  }
  deleteDataContactPage(id: number) {
    return this.http.delete<ContactPageResDTO>(`${this.apiUrl13}/${id}`);
  }

  /*============================== TOUR COMMENT DETAIL ================================*/
  createDataCommentFeedbackDetail(data: TourCommentDetailReqDTO) {
    return this.http.post<TourCommentDetailResDTO>(
      this.apiUrlTourCommentDetail,
      data
    );
  }
  getAllDataCommentFeedbackDetail() {
    return this.http.get<TourCommentDetailResDTO[]>(
      this.apiUrlTourCommentDetail
    );
  }
  getDataByIdCommentFeedbackDetail(id: number) {
    return this.http.get<TourCommentDetailResDTO>(
      `${this.apiUrlTourCommentDetail}/${id}`
    );
  }

  updateDataCommentFeedbackDetail(data: TourCommentDetailReqDTO, id: number) {
    return this.http.put<TourCommentDetailResDTO>(
      `${this.apiUrlTourCommentDetail}/${id}`,
      data
    );
  }
  deleteDataCommentFeedbackDetail(id: number) {
    return this.http.delete<TourCommentDetailResDTO>(
      `${this.apiUrlTourCommentDetail}/${id}`
    );
  }

  /*============================== MENU SERVICE ================================*/
  createDataMenuService(data: VisaServiceReqDTO) {
    return this.http.post<VisaServiceResDTO>(this.apiVisaService, data);
  }
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

  updateDataMenuService(data: VisaServiceReqDTO, id: number) {
    return this.http.put<VisaServiceResDTO>(
      `${this.apiVisaService}/${id}`,
      data
    );
  }
  deleteDataMenuService(id: number) {
    return this.http.delete<VisaServiceResDTO>(`${this.apiVisaService}/${id}`);
  }

  /*============================== Visa Process ================================*/
  createDataVisaProcess(data: VisaProcessReqDTO) {
    return this.http.post<VisaProcessResDTO>(this.apiVisaProcess, data);
  }
  getAllDataVisaProcess() {
    return this.http.get<ResponseBaseList<VisaProcessResDTO>>(
      this.apiVisaProcess
    );
  }
  getDataByIdVisaProcess(id: number) {
    return this.http.get<VisaProcessResDTO>(`${this.apiVisaProcess}/${id}`);
  }

  updateDataVisaProcess(data: VisaProcessReqDTO, id: number) {
    return this.http.put<VisaProcessResDTO>(
      `${this.apiVisaProcess}/${id}`,
      data
    );
  }
  deleteDataVisaProcess(id: number) {
    return this.http.delete<VisaProcessResDTO>(`${this.apiVisaProcess}/${id}`);
  }

  /*============================== Visa Process ================================*/
  createDataLanguage(data: LanguageReqDTO) {
    return this.http.post<LanguageResDTO>(this.apiUrlLanguage, data);
  }
  getAllDataLanguage() {
    return this.http.get<{ data: LanguageResDTO[] }>(this.apiUrlLanguage);
  }
  getDataByIdLanguage(id: number) {
    return this.http.get<LanguageResDTO>(`${this.apiUrlLanguage}/${id}`);
  }

  updateDataLanguage(data: LanguageReqDTO, id: number) {
    return this.http.put<LanguageResDTO>(`${this.apiUrlLanguage}/${id}`, data);
  }
  deleteDataLanguage(id: number) {
    return this.http.delete<LanguageResDTO>(`${this.apiUrlLanguage}/${id}`);
  }

  /*============================== Visa Process ================================*/
  createDataPartner(data: PartnerReqDTO) {
    return this.http.post<PartnerResDTO>(this.apiPartner, data);
  }
  getAllDataPartner() {
    return this.http.get<{ data: PartnerResDTO[] }>(this.apiPartner);
  }
  getDataByIdPartner(id: number) {
    return this.http.get<PartnerResDTO>(`${this.apiPartner}/${id}`);
  }

  updateDataPartner(data: PartnerReqDTO, id: number) {
    return this.http.put<PartnerResDTO>(`${this.apiPartner}/${id}`, data);
  }
  deleteDataPartner(id: number) {
    return this.http.delete<PartnerResDTO>(`${this.apiPartner}/${id}`);
  }

  /*============================== Footer ================================*/
  createDataFooter(data: FooterReqDTO) {
    return this.http.post<FooterResDTO>(this.apiFooter, data);
  }
  getAllDataFooter() {
    return this.http.get<{ data: FooterResDTO[] }>(
      this.apiFooter + `/all?langCode=${this.languageService.locale}`
    );
  }
  getDataByIdFooter(id: number) {
    return this.http.get<FooterResDTO>(`${this.apiFooter}/${id}`);
  }

  updateDataFooter(data: FooterReqDTO, id: number) {
    return this.http.put<FooterResDTO>(`${this.apiFooter}/${id}`, data);
  }
  deleteDataFooter(id: number) {
    return this.http.delete<FooterResDTO>(`${this.apiFooter}/${id}`);
  }
}
