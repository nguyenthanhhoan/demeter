import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';

@Injectable()
export class TopicService {
  private resourceUrl = 'family/topics';

  constructor (private apiService: ApiService) {}

  getTopics (): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}`);
  }

  buildFormData(topic) {
    let formData: FormData = new FormData();
    if (topic.title) {
      formData.append('topic[title]', topic.title);
    }
    if (topic.picture && topic.picture.size > 0) {
      formData.append('topic[picture]', topic.picture);
    }
    return formData;
  }

  put(topic): Observable<any[]> {
    let formData: FormData = this.buildFormData(topic);
    return this.apiService.putFormData(`${this.resourceUrl}/${topic.id}`, formData);
  }

  post(topic): Observable<any[]> {
    let formData: FormData = this.buildFormData(topic);
    return this.apiService.postFormData(this.resourceUrl, formData);
  }

  updateImage(topic_id, image): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('topic[image]', image);
    return this.apiService
            .putFormData(`${this.resourceUrl}/${topic_id}`, formData);
  }
  getOne(id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${id}`);
  }
  delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }
}
