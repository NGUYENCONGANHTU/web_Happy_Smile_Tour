import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import {
  ResponseBase,
  ResponseBaseList,
} from '../../../core/interfaces/base.interface';
import { BlogResDTO } from './blog.interface';

@Injectable({ providedIn: 'root' })
export class BlogService {
  httpClient = inject(HttpClient);

  apiUrl = environment.API_URL + '/travel-guide-trans';

  getBlogs() {
    return this.httpClient.get<ResponseBaseList<BlogResDTO>>(this.apiUrl);
  }

  getBlogById(id: number) {
    return this.httpClient.get<ResponseBase<BlogResDTO>>(
      `${this.apiUrl}/${id}`
    );
  }

  createBlog(newBlog: BlogResDTO) {
    return this.httpClient.post(this.apiUrl, newBlog);
  }

  updateBlog(id: string | number, newBlog: BlogResDTO) {
    return this.httpClient.put(this.apiUrl + '/' + id, newBlog);
  }
}
