import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment';
import { ScheduleReqDTO, ScheduleResDTO } from './schedule-interface';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  http = inject(HttpClient);
  apiTourScheduleUrl = environment.API_URL + '/tour-schedule';

  /*======================== BẢNG LỊCH TRÌNH ==========================*/
  createDataTourSchedule(data: ScheduleReqDTO) {
    return this.http.post<ScheduleResDTO>(this.apiTourScheduleUrl, data);
  }

  getAlLDataTourSchedule() {
    return this.http.get<ScheduleResDTO[]>(this.apiTourScheduleUrl);
  }

  getDataByIdTourSchedule(id: number) {
    return this.http.get<ScheduleResDTO>(`${this.apiTourScheduleUrl}/${id}`);
  }

  updateDataTourSchedule(data: ScheduleReqDTO, id: number) {
    return this.http.put<ScheduleResDTO>(
      `${this.apiTourScheduleUrl}/${id}`,
      data
    );
  }
  deleteDataTourSchedule(id: number) {
    return this.http.delete<ScheduleResDTO>(`${this.apiTourScheduleUrl}/${id}`);
  }
}
