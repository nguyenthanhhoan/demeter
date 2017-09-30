import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';

@Injectable()
export class PostService {
  private resourceUrl = 'family/posts';

  constructor (private apiService: ApiService) {}

  getPosts (): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}`);
  }

  buildFormData(post) {
    let formData: FormData = new FormData();
    if (post.title) {
      formData.append('post[title]', post.title);
    }
    if (post.content) {
      formData.append('post[content]', post.content);
    }
    if (post.family_topic_id) {
      formData.append('post[family_topic_id]', post.family_topic_id);
    }
    if (post.picture && post.picture.size > 0) {
      formData.append('post[picture]', post.picture);
    }
    return formData;
  }

  put(post): Observable<any[]> {
    let formData: FormData = this.buildFormData(post);
    return this.apiService.putFormData(`${this.resourceUrl}/${post.id}`, formData);
  }

  post(post): Observable<any[]> {
    let formData: FormData = this.buildFormData(post);
    return this.apiService.postFormData(this.resourceUrl, formData);
  }

  updateImage(post_id, image): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('post[image]', image);
    return this.apiService
            .putFormData(`${this.resourceUrl}/${post_id}`, formData);
  }
  getOne(id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${id}`);
  }
  delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }
}
