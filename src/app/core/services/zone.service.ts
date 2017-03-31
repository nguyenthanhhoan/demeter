import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class ZoneService {

  constructor (private apiService: ApiService) {}

  getList (project_id): Observable<any[]> {
    return this.apiService.fetch(`projects/${project_id}/zones`);
  }

  post (project_id, zone): Observable<any[]> {
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
    formData.append('zone[image]', zone.image);
    return this.apiService.postFormData(`projects/${project_id}/zones`, formData);
  }

  getOne (project_id, id): Observable<any[]> {
    return this.apiService.fetch(`projects/${project_id}/zones/${id}`);
  }
}
