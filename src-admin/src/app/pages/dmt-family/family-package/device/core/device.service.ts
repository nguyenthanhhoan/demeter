import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResourceAPIService } from '../../../../../_core/api/resource-api.service';

@Injectable()
export class DeviceService extends ResourceAPIService {
  resourceUrl = 'admin/family_devices';
  resourceName = 'device'
  idField = 'uuid'

  getByPackage(package_id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}?package_id=${package_id}`);
  }
}
