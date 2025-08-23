import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../../environment';
import {ResponseBaseList} from '../../../core/interfaces/base.interface';
import {LocationReqDTO, LocationResDTO, LocationTransReqDTO} from './location-config.interface';

@Injectable({providedIn: 'root'})
export class LocationConfigService {
  httpClient = inject(HttpClient);

  apiUrl = `${environment.API_URL}/location`;
  apiUrlTrans = `${environment.API_URL}/location-trans`;

  getLocations() {
    return this.httpClient.get<ResponseBaseList<LocationResDTO>>(this.apiUrl)
  }

  createLocation(data: LocationReqDTO) {
    return this.httpClient.post(this.apiUrl, data);
  }

  updateLocationById(id: string | number, data: LocationReqDTO) {
    return this.httpClient.put(this.apiUrl + "/" + id, data);
  }

  deleteLocationById(id: string | number) {
    return this.httpClient.delete(this.apiUrl + "/" + id);
  }

  getLocationsTrans(langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<LocationResDTO>>(this.apiUrlTrans, {params})
  }

  createLocationTrans(data: LocationTransReqDTO) {
    return this.httpClient.post(this.apiUrlTrans, data);
  }

  updateLocationTransById(id: string | number, data: LocationTransReqDTO) {
    return this.httpClient.put(this.apiUrlTrans + "/" + id, data);
  }

}
