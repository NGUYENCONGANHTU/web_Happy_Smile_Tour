import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './environment';
import {
  CommentFeedbackReqDTO, CommentFeedbackResDTO, ContactPrivateTourReqDTO, ContactPrivateTourResDTO,
  FeatureReqDTO, FeatureResDTO,
  HomeBannerReqDTO,
  HomeBannerResDTO,
  HomeTitleReqDTO,
  HomeTitleResDTO, IntroducePageReqDTO, IntroducePageResDTO, IntroduceTitleResDTO,
  LocationReqDTO,
  LocationResDTO, PrivateTourReqDTO, PrivateTourResDTO, TravelGuideReqDTO, TravelGuideResDTO
} from './interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  http = inject(HttpClient);
  // API
  apiUrl = environment.API_URL+'/home-banner';
  apiUrl2 = environment.API_URL+'/home-title';
  apiUrl3 = environment.API_URL+'/location';
  apiUrl4 = environment.API_URL+'/tour';
  apiUrl5 = environment.API_URL+'/tour/filter?type=';
  apiUrl6 = environment.API_URL+'/tour/filter?name=';
  apiUrl7 = environment.API_URL+'/travel-guide';
  apiUrl8 = environment.API_URL+'/home-comment';
  apiUrl9 = environment.API_URL+'/intro';
  apiUrl10 = environment.API_URL+'/intro-title';
  apiUrl11 = environment.API_URL+'/custom-service';
  apiUrl12 = environment.API_URL+'/tour-contact';
  apiUrl13 = environment.API_URL+'/info';


  /*======================== HOME BANNER ==========================*/
  createData(data:HomeBannerReqDTO) {
    return this.http.post<HomeBannerResDTO>(this.apiUrl, data);
  }

  getAlLData() {
    return this.http.get<HomeBannerResDTO[]>(this.apiUrl);
  }

  getDataById(id: number) {
    return this.http.get<HomeBannerResDTO>(`${this.apiUrl}/${id}`);
  }

  updateData(data: HomeBannerReqDTO, id: number){
    return this.http.put<HomeBannerResDTO>(`${this.apiUrl}/${id}`, data);
  }
  deleteData(id: number) {
    return this.http.delete<HomeBannerResDTO>(`${this.apiUrl}/${id}`);
  }


  /*======================== HOME TITLE ==========================*/
  createData2(data:HomeTitleReqDTO) {
    return this.http.post<HomeTitleResDTO>(this.apiUrl2, data);
  }

  getAlLDataTitle() {
    return this.http.get<HomeTitleResDTO[]>(this.apiUrl2 + '/type/TEXT');
  }
  getAlLDataImage() {
    return this.http.get<HomeTitleResDTO[]>(this.apiUrl2 + '/type/IMAGE');
  }

  getDataById2(id: number) {
    return this.http.get<HomeTitleResDTO>(`${this.apiUrl2}/${id}`);
  }

  updateData2(data: HomeTitleReqDTO, id: number){
    return this.http.put<HomeTitleResDTO>(`${this.apiUrl2}/${id}`, data);
  }
  deleteData2(id: number) {
    return this.http.delete<HomeTitleResDTO>(`${this.apiUrl2}/${id}`);
  }


  /*======================== LOCATION ==========================*/

  createData3(data:LocationReqDTO) {
    return this.http.post<LocationResDTO>(this.apiUrl3, data);
  }
  getAlLDataLocationDomestic() {
    return this.http.get<LocationResDTO[]>(this.apiUrl3 + '/type/DOMESTIC');
  }
  getAlLDataLocationInternational() {
    return this.http.get<LocationResDTO[]>(this.apiUrl3 + '/type/INTERNATIONAL');
  }

  getDataById3(id: number) {
    return this.http.get<LocationResDTO>(`${this.apiUrl3}/${id}`);
  }

  updateData3(data: LocationReqDTO, id: number){
    return this.http.put<LocationResDTO>(`${this.apiUrl3}/${id}`, data);
  }
  deleteData3(id: number) {
    return this.http.delete<LocationResDTO>(`${this.apiUrl3}/${id}`);
  }

  /*======================== CÁC TOUR NỔI BẬT ==========================*/

  getAllDataTourFeature4(){
    return this.http.get<FeatureResDTO[]>(this.apiUrl4);
  }
  createData4(data:FeatureReqDTO) {
    return this.http.post<FeatureResDTO>(this.apiUrl4, data);
  }

  getDataById4(id: number) {
    return this.http.get<FeatureResDTO>(`${this.apiUrl4}/${id}`);
  }

  updateData4(data: FeatureReqDTO, id: number){
    return this.http.put<FeatureResDTO>(`${this.apiUrl4}/${id}`, data);
  }
  deleteData4(id: number) {
    return this.http.delete<FeatureResDTO>(`${this.apiUrl4}/${id}`);
  }

  /*======================== NẾU CÓ TAB TẤT CẢ TOUR THÌ DÙNG ==========================*/
  getDataTourForeign(){
    return this.http.get<FeatureResDTO[]>(this.apiUrl5 + 'INTERNATINAL');
  }
  getDataTourDomestic(){
    return this.http.get<FeatureResDTO[]>(this.apiUrl5 + 'DOMESTIC');
  }


  /*============================== TAB FOREIGN ================================*/
  changeTabForeign(tabNameForeign: string){
    return this.http.get<FeatureResDTO[]>(`${this.apiUrl6}${encodeURIComponent(tabNameForeign)}`);
  }
  changeTabDomestic(tabNameDomestic: string) {
    return this.http.get<FeatureResDTO[]>(`${this.apiUrl6}${encodeURIComponent(tabNameDomestic)}`);
  }

  /*============================== CẨM NANG DU LỊCH ================================*/

  createDataTravelGuide(data:TravelGuideReqDTO) {
    return this.http.post<TravelGuideResDTO>(this.apiUrl7, data);
  }
  getAllDataTravelGuide(){
    return this.http.get<TravelGuideResDTO[]>(this.apiUrl7);
  }
  getDataByIdTravelGuide(id: number) {
    return this.http.get<TravelGuideResDTO>(`${this.apiUrl7}/${id}`);
  }

  updateDataTravelGuide(data: TravelGuideReqDTO, id: number){
    return this.http.put<TravelGuideResDTO>(`${this.apiUrl7}/${id}`, data);
  }
  deleteDataTravelGuide(id: number) {
    return this.http.delete<TravelGuideResDTO>(`${this.apiUrl7}/${id}`);
  }


  /*============================== KHÁCH HÀNG ĐÁNH GIÁ ================================*/
  createDataCommentFeedback(data:CommentFeedbackReqDTO) {
    return this.http.post<CommentFeedbackResDTO>(this.apiUrl8, data);
  }
  getAllDataCommentFeedback(){
    return this.http.get<CommentFeedbackResDTO[]>(this.apiUrl8);
  }
  getDataByIdCommentFeedback(id: number) {
    return this.http.get<CommentFeedbackResDTO>(`${this.apiUrl8}/${id}`);
  }

  updateDataCommentFeedback(data: CommentFeedbackReqDTO, id: number){
    return this.http.put<CommentFeedbackResDTO>(`${this.apiUrl8}/${id}`, data);
  }
  deleteDataCommentFeedback(id: number) {
    return this.http.delete<CommentFeedbackResDTO>(`${this.apiUrl8}/${id}`);
  }

  /*============================== PAGE GIỚI THIỆU ================================*/
  createDataIntroducePage(data:IntroducePageReqDTO) {
    return this.http.post<IntroducePageResDTO>(this.apiUrl9, data);
  }
  getAllDataBannerIntroducePage(){
    return this.http.get<IntroducePageResDTO[]>(this.apiUrl9 + '/type/BANNER');
  }
  getAllDataHighLightIntroducePage(){
    return this.http.get<IntroducePageResDTO[]>(this.apiUrl9 + '/type/HIGHLIGHT');
  }
  getAllDataMainIntroducePage(){
    return this.http.get<IntroducePageResDTO[]>(this.apiUrl9 + '/type/MAIN');
  }
  getAllDataTitleIntroducePage(){
    return this.http.get<IntroduceTitleResDTO[]>(this.apiUrl10 + '/type/TITLE');
  }
  getAllDataStatisticalIntroducePage(){
    return this.http.get<IntroduceTitleResDTO[]>(this.apiUrl10 + '/type/STATISTICAL');
  }
  getDataByIdIntroducePage(id: number) {
    return this.http.get<IntroducePageResDTO>(`${this.apiUrl9}/${id}`);
  }
  updateDataIntroducePage(data: IntroducePageReqDTO, id: number){
    return this.http.put<IntroducePageResDTO>(`${this.apiUrl9}/${id}`, data);
  }
  deleteDataIntroducePage(id: number) {
    return this.http.delete<IntroducePageResDTO>(`${this.apiUrl9}/${id}`);
  }

  /*============================== TOUR ĐOÀN RIÊNG ================================*/
  createDataPrivateTour(data:PrivateTourReqDTO) {
    return this.http.post<PrivateTourResDTO>(this.apiUrl11, data);
  }
  getAllDataPrivateTour(){
    return this.http.get<PrivateTourResDTO[]>(this.apiUrl11 + '/type/TOUR');
  }
  getAllDataVisaPrivateTour(){
    return this.http.get<PrivateTourResDTO[]>(this.apiUrl11 + '/type/VISA');
  }

  getDataByIdPrivateTour(id: number) {
    return this.http.get<PrivateTourResDTO>(`${this.apiUrl11}/${id}`);
  }
  updateDataPrivateTour(data: PrivateTourReqDTO, id: number){
    return this.http.put<PrivateTourResDTO>(`${this.apiUrl11}/${id}`, data);
  }
  deleteDataPrivateTour(id: number) {
    return this.http.delete<PrivateTourResDTO>(`${this.apiUrl11}/${id}`);
  }


  /*============================== LIÊN HỆ TRONG TOUR ĐOÀN RIÊNG ================================*/
  createDataContactPrivateTour(data:ContactPrivateTourReqDTO) {
    return this.http.post<ContactPrivateTourResDTO>(this.apiUrl12, data);
  }
  getAllDataContactPrivateTour(){
    return this.http.get<ContactPrivateTourResDTO[]>(this.apiUrl12);
  }

  getDataContactByIdPrivateTour(id: number) {
    return this.http.get<ContactPrivateTourResDTO>(`${this.apiUrl12}/${id}`);
  }
  updateDataContactPrivateTour(data: ContactPrivateTourReqDTO, id: number){
    return this.http.put<ContactPrivateTourResDTO>(`${this.apiUrl12}/${id}`, data);
  }
  deleteDataContactPrivateTour(id: number) {
    return this.http.delete<ContactPrivateTourResDTO>(`${this.apiUrl12}/${id}`);
  }



  /*============================== PAGE LIÊN HỆ ================================*/
  createDataContactPage(data:IntroducePageReqDTO) {
    return this.http.post<IntroducePageResDTO>(this.apiUrl9, data);
  }
  getAllDataBannerContactPage(){
    return this.http.get<IntroducePageResDTO[]>(this.apiUrl9 + '/type/BANNER');
  }
  getAllDataAddressContactPage(){
    return this.http.get<IntroducePageResDTO[]>(this.apiUrl9 + '/type/ADDRESS');
  }
  getAllDataPhoneContactPage(){
    return this.http.get<IntroducePageResDTO[]>(this.apiUrl9 + '/type/PHONE');
  }
  getAllDataEmailContactPage(){
    return this.http.get<IntroduceTitleResDTO[]>(this.apiUrl10 + '/type/EMAIL');
  }
  getAllDataFooterContactPage(){
    return this.http.get<IntroduceTitleResDTO[]>(this.apiUrl10 + '/type/FOOTER');
  }
  getDataByIdContactPage(id: number) {
    return this.http.get<IntroducePageResDTO>(`${this.apiUrl9}/${id}`);
  }
  updateDataContactPage(data: IntroducePageReqDTO, id: number){
    return this.http.put<IntroducePageResDTO>(`${this.apiUrl9}/${id}`, data);
  }
  deleteDataContactPage(id: number) {
    return this.http.delete<IntroducePageResDTO>(`${this.apiUrl9}/${id}`);
  }
}


