import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ResponseBase,
  ResponseBaseList,
} from '../../../core/interfaces/base.interface';
import { BlogReqDTO, BlogResDTO } from './blog.interface';

@Injectable({ providedIn: 'root' })
export class BlogService {
  httpClient = inject(HttpClient);

  apiUrl = environment.API_URL + '/travel-guide';
  apiUrlTrans = environment.API_URL + '/travel-guide-trans';

  getBlogs() {
    return this.httpClient.get<ResponseBaseList<BlogResDTO>>(this.apiUrl);
  }

  getBlogById(id: number | string) {
    return this.httpClient.get<ResponseBase<BlogResDTO>>(
      `${this.apiUrl}/${id}`
    );
  }

  getBlogTransById(id: string | number, langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBase<BlogResDTO>>(
      `${this.apiUrlTrans}/service/${id}`,
      { params }
    );
  }

  createBlog(newBlog: BlogReqDTO) {
    const formData = new FormData();
    Object.entries(newBlog).map(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    return this.httpClient.post(this.apiUrl, formData);
  }

  updateBlogById(id: string | number, newBlog: BlogResDTO) {
    const formData = new FormData();
    Object.entries(newBlog).forEach(([key, value]) => {
      if (value) {
        if (key === 'image') {
          if (value?.id) {
            formData.append('idsFile', value.id);
          } else {
            formData.append(key, value);
          }
        } else {
          formData.append(key, value);
        }
      }
    });
    return this.httpClient.put(this.apiUrl + '/' + id, formData);
  }

  createBlogTrans(newBlog: BlogResDTO) {
    return this.httpClient.post(this.apiUrlTrans, newBlog);
  }

  updateBlogTransById(id: string | number, newBlog: BlogResDTO) {
    return this.httpClient.put(this.apiUrlTrans + '/' + id, newBlog);
  }
}
