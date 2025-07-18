import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';
import {
  CommentFeedbackReqDTO,
  CommentFeedbackResDTO,
  ContactPrivateTourReqDTO,
  ContactPrivateTourResDTO,
  FeatureReqDTO,
  FeatureResDTO,
  HomeBannerReqDTO,
  HomeBannerResDTO,
  HomeTitleReqDTO,
  HomeTitleResDTO,
  IntroducePageReqDTO,
  IntroducePageResDTO,
  IntroduceTitleResDTO,
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
  apiUrl5 = environment.API_URL + '/tour-trans/filter?type=';
  apiUrl6 = environment.API_URL + '/tour-trans/filter?locationId=';
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
  apiUrlTourCommentDetail = environment.API_URL + '/tour-comment';

  /*======================== HOME BANNER ==========================*/
  createData(data: HomeBannerReqDTO) {
    return this.http.post<HomeBannerResDTO>(this.apiUrl, data);
  }

  getAlLDataBannerHome() {
    return this.http.get<{ data: HomeBannerResDTO[] }>(
      this.apiUrl + `/HOME?langCode=${this.languageService.locale}`
    );
  }

  getAlLDataBannerIntro() {
    return this.http.get<{ data: HomeBannerResDTO[] }>(
      this.apiUrl + `/INTRO?langCode=${this.languageService.locale}`
    );
  }

  getAlLDataBannerContact() {
    return this.http.get<{ data: HomeBannerResDTO[] }>(
      this.apiUrl + `/CONTACT?langCode=${this.languageService.locale}`
    );
  }
  getAlLDataBannerService() {
    return this.http.get<{ data: HomeBannerResDTO[] }>(
      this.apiUrl + `/SERVICE?langCode=${this.languageService.locale}`
    );
  }

  getDataById(id: number) {
    return this.http.get<HomeBannerResDTO>(`${this.apiUrl}/${id}`);
  }

  updateData(data: HomeBannerReqDTO, id: number) {
    return this.http.put<HomeBannerResDTO>(`${this.apiUrl}/${id}`, data);
  }
  deleteData(id: number) {
    return this.http.delete<HomeBannerResDTO>(`${this.apiUrl}/${id}`);
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
    return this.http.get<{ data: { content: FeatureResDTO[] } }>(this.apiUrl4);
  }
  createDataTourFeature4(data: FeatureReqDTO) {
    return this.http.post<FeatureResDTO>(this.apiUrl4, data);
  }

  getDataTourFeatureById4(id: number) {
    return this.http.get<FeatureResDTO>(`${this.apiUrl4}/${id}`);
  }

  updateDataTourFeature4(data: FeatureReqDTO, id: number) {
    return this.http.put<FeatureResDTO>(`${this.apiUrl4}/${id}`, data);
  }
  deleteDataTourFeature4(id: number) {
    return this.http.delete<FeatureResDTO>(`${this.apiUrl4}/${id}`);
  }

  /*======================== NẾU CÓ TAB TẤT CẢ TOUR THÌ DÙNG ==========================*/
  getDataTourForeign() {
    return this.http.get<{ data: FeatureResDTO[] }>(
      this.apiUrl5 + 'INTERNATIONAL'
    );
  }
  getDataTourDomestic() {
    return this.http.get<{ data: FeatureResDTO[] }>(this.apiUrl5 + 'DOMESTIC');
  }

  /*============================== TAB FOREIGN ================================*/

  changeTabForeign(id: number) {
    return this.http.get<ResponseBasePage<FeatureResDTO>>(
      `${this.apiUrl6}${id}&langCode=${this.languageService.locale}`
    );
  }
  changeTabDomestic(id: number) {
    return this.http.get<ResponseBasePage<FeatureResDTO>>(
      `${this.apiUrl6}${id}&langCode=${this.languageService.locale}`
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
    return this.http.get<TravelGuideResDTO>(`${this.apiUrl7}/${id}`);
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
  getAllDataHighLightIntroducePage() {
    return this.http.get<{ data: IntroducePageResDTO[] }>(
      this.apiUrl9 + '/type/HIGHLIGHT'
    );
  }
  getAllDataMainIntroducePage() {
    return this.http.get<{ data: IntroducePageResDTO[] }>(
      this.apiUrl9 + '/type/MAIN'
    );
  }
  getAllDataTitleIntroducePage() {
    return this.http.get<{ data: IntroduceTitleResDTO[] }>(
      this.apiUrl10 + '/type/TITLE'
    );
  }
  getAllDataStatisticalIntroducePage() {
    return this.http.get<{ data: IntroduceTitleResDTO[] }>(
      this.apiUrl10 + '/type/STATISTICAL'
    );
  }
  getDataByIdIntroducePage(id: number) {
    return this.http.get<IntroducePageResDTO>(`${this.apiUrl9}/${id}`);
  }
  updateDataIntroducePage(data: IntroducePageReqDTO, id: number) {
    return this.http.put<IntroducePageResDTO>(`${this.apiUrl9}/${id}`, data);
  }
  deleteDataIntroducePage(id: number) {
    return this.http.delete<IntroducePageResDTO>(`${this.apiUrl9}/${id}`);
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
  createDataContactPage(data: IntroducePageReqDTO) {
    return this.http.post<IntroducePageResDTO>(this.apiUrl13, data);
  }
  getAllDataBannerContactPage() {
    return this.http.get<{ data: IntroducePageResDTO[] }>(
      this.apiUrl13 + '/type/BANNER'
    );
  }
  getAllDataAddressContactPage() {
    return this.http.get<{ data: IntroducePageResDTO[] }>(
      this.apiUrl13 + '/type/ADDRESS'
    );
  }
  getAllDataPhoneContactPage() {
    return this.http.get<{ data: IntroducePageResDTO[] }>(
      this.apiUrl13 + '/type/PHONE'
    );
  }
  getAllDataEmailContactPage() {
    return this.http.get<{ data: IntroducePageResDTO[] }>(
      this.apiUrl13 + '/type/EMAIL'
    );
  }
  getAllDataFooterContactPage() {
    return this.http.get<IntroduceTitleResDTO[]>(
      this.apiUrl13 + '/type/FOOTER'
    );
  }
  getDataByIdContactPage(id: number) {
    return this.http.get<IntroducePageResDTO>(`${this.apiUrl13}/${id}`);
  }
  updateDataContactPage(data: IntroducePageReqDTO, id: number) {
    return this.http.put<IntroducePageResDTO>(`${this.apiUrl13}/${id}`, data);
  }
  deleteDataContactPage(id: number) {
    return this.http.delete<IntroducePageResDTO>(`${this.apiUrl13}/${id}`);
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
      `${this.apiVisaService}/${id}`
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
    return this.http.post<VisaProcessResDTO>(this.apiUrl8, data);
  }
  getAllDataVisaProcess() {
    return this.http.get<ResponseBaseList<VisaProcessResDTO>>(this.apiUrl8);
  }
  getDataByIdVisaProcess(id: number) {
    return this.http.get<VisaProcessResDTO>(`${this.apiUrl8}/${id}`);
  }

  updateDataVisaProcess(data: VisaProcessReqDTO, id: number) {
    return this.http.put<VisaProcessResDTO>(`${this.apiUrl8}/${id}`, data);
  }
  deleteDataVisaProcess(id: number) {
    return this.http.delete<VisaProcessResDTO>(`${this.apiUrl8}/${id}`);
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
}
