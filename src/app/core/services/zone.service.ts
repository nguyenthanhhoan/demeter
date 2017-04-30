import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';
import { JsonApiService } from '../../core/api/json-api.service';

@Injectable()
export class ZoneService {

  constructor (private apiService: ApiService,
              private jsonApiService: JsonApiService) {}

  getList (project_id): Observable<any[]> {
    return this.apiService.fetch(`projects/${project_id}/zones`);
  }

  buildFormData(zone) {
    let formData:FormData = new FormData();
    formData.append('zone[project_id]', zone.project_id);
    formData.append('zone[name]', zone.name);
    formData.append('zone[zone_id]', zone.zone_id);
    formData.append('zone[start_date]', zone.start_date);
    formData.append('zone[end_date]', zone.end_date);
    formData.append('zone[plant]', zone.plant);
    formData.append('zone[plant_variety]', zone.plant_variety);
    formData.append('zone[plant_quantity]', zone.plant_quantity);
    formData.append('zone[plant_quantity_unit]', zone.plant_quantity_unit);
    formData.append('zone[production_type]', zone.production_type);
    formData.append('zone[estimate_yield]', zone.estimate_yield);
    formData.append('zone[estimate_yield_unit]', zone.estimate_yield_unit);
    formData.append('zone[surface]', zone.surface);
    formData.append('zone[surface_unit]', zone.surface_unit);
    formData.append('zone[zone_type]', zone.zone_type);
    formData.append('zone[growing_condition_type]', zone.growing_condition_type);
    formData.append('zone[ownership_type]', zone.ownership_type);
    formData.append('zone[labour]', zone.labour);
    formData.append('zone[location]', zone.location);
    formData.append('zone[location_geometry]', zone.location_geometry);
    if (zone.image && zone.image.size > 0) {
      formData.append('zone[image]', zone.image);
    }
    return formData;
  }

  post (project_id, zone): Observable<any[]> {
    let formData:FormData = this.buildFormData(zone);
    return this.apiService.postFormData(`projects/${project_id}/zones`, formData);
  }

  put (project_id, zone): Observable<any[]> {
    let formData:FormData = this.buildFormData(zone);
    return this.apiService.putFormData(`projects/${project_id}/zones/${zone.id}`, formData);
  }

  getOne (project_id, id): Observable<any> {
    return this.apiService.fetch(`projects/${project_id}/zones/${id}`);
  }

  updateSetting(project_id, id, setting): Observable<any> {
    return this.apiService.post(`projects/${project_id}/zones/${id}/setting`, setting);
  }

  assignCamera(project_id, zone_id, camera_id): Observable<any> {
    return this.apiService.post(`projects/${project_id}/zones/${zone_id}/assign_camera`, {
      camera_id: camera_id
    });
  }

  unAssignCamera(project_id, zone_id, camera_id): Observable<any> {
    return this.apiService.post(`projects/${project_id}/zones/${zone_id}/unassign_camera`, {
      camera_id: camera_id
    });
  }

  assignQuickViewCamera(project_id, zone_id, camera_id): Observable<any> {
    return this.apiService
      .post(`projects/${project_id}/zones/${zone_id}/assign_quick_view_camera`, {
      camera_id: camera_id
    });
  }

  unAssignQuickViewCamera(project_id, zone_id, camera_id): Observable<any> {
    return this.apiService
      .post(`projects/${project_id}/zones/${zone_id}/unassign_quick_view_camera`, {
      camera_id: camera_id
    });
  }

  assignDeviceField(project_id, zone_id, device_field_id): Observable<any> {
    return this.apiService.post(`projects/${project_id}/zones/${zone_id}/assign_device_field`, {
      device_field_id: device_field_id
    });
  }

  unAssignDeviceField(project_id, zone_id, device_field_id): Observable<any> {
    return this.apiService
      .post(`projects/${project_id}/zones/${zone_id}/unassign_device_field`, {
      device_field_id: device_field_id
    });
  }

  getOKRData(project_id, zone_id): Observable<any> {
    return this.jsonApiService.fetch(`/zone/okr.json`);
  }
}
