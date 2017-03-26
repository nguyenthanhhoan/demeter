import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import { ZoneService } from '../../../core/services/zone.service';
import { LocalStorageService } from '../../../shared/utils/localstorage.service';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

declare var $: any;

@Component({
  selector: 'zone-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.css']
})
export class ZoneFormComponent implements OnInit {

  map: any;
  zone: any;

  plants = [
    { 
      id: 1, 
      name: 'Fruit Tree',
      varieties: [
        { id: 1, name: 'Almonds'},
        { id: 2, name: 'Pistachios'},
        { id: 3, name: 'Pomegrante'},
        { id: 4, name: 'Mango'},
        { id: 5, name: 'Apple'},
        { id: 6, name: 'Lemon'},
        { id: 7, name: 'Grape'},
        { id: 8, name: 'Banana'},
        { id: 9, name: 'Strawberry'},
        { id: 10, name: 'Melon'}
      ]
    }, { 
      id: 1, 
      name: 'Vegetable',
      varieties: [
        { id: 1, name: 'Carrot'},
        { id: 2, name: 'Potato'},
        { id: 3, name: 'Tomato'},
        { id: 4, name: 'Cucumber'},
        { id: 5, name: 'Onion'},
        { id: 6, name: 'Garlic'},
        { id: 7, name: 'Spinach'},
        { id: 8, name: 'Lettuce'},
        { id: 9, name: 'Ginger'},
        { id: 10, name: 'Eggplant'},
        { id: 10, name: 'Cabbagge'}
      ]
    }, { 
      id: 1, 
      name: 'Flower',
      varieties: [
        { id: 1, name: 'Rose'},
        { id: 2, name: 'Tulip'},
        { id: 3, name: 'Daisy'},
        { id: 4, name: 'Sunflower'},
        { id: 5, name: 'Orchid'}
      ]
    }, { 
      id: 1, 
      name: 'Industrial Plant',
      varieties: [
        { id: 1, name: 'Coffee'},
        { id: 2, name: 'Tea'},
        { id: 3, name: 'Sugar Cane'},
        { id: 4, name: 'Corn'},
        { id: 5, name: 'Cotton'},
        { id: 5, name: 'Soybean'}
      ]},
    { id: 1, 
      name: 'Other',
      varieties: []
    }
  ]

  quantity_units = ['kg', 'pieces']
  production_types = ['conventinal', 'organic', 'intergrated']
  surface_units = ['m2', 'ha']
  zone_types = ['greenhouse', 'orchard', 'field crop', 'special']
  growing_condition_types = ['soil', 'medium', 'hydroponic', 'aeroponic', 'aquaponic', 'other']
  ownership_types = ['private', 'contract farming', 'rent']

  validatorOptions = {
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      name: {
        group: '.form-group',
        validators: {
          notEmpty: {
            message: 'The name is required'
          }
        }
      },
      zone_id: {
        group: '.form-group',
        validators: {
          notEmpty: {
            message: 'The Zone ID is required'
          }
        }
      }
    }
  }
  constructor(private router: Router,
              private ref: ChangeDetectorRef,
              private localStorageService: LocalStorageService,
              private zoneService: ZoneService,
              private route: ActivatedRoute,
              private el:ElementRef) { 

    this.zone = {
      name: '',
      plant: this.plants[0]
    };

    //TODO: Refactor later
    setInterval(() => {
      this.ref.markForCheck();
    },1000);
  }

  ngOnInit() {
  }

  onSubmit() {
    let project_id = +this.route.snapshot.params['id'];
    let user = this.localStorageService.retrieve('user');

    var form = $(this.el.nativeElement).find('form');
    const bootstrapValidator = form.data('bootstrapValidator');
    //TODO: Sometime the validate() fn from directive was not triggered
    // Should trigger here!!!
    bootstrapValidator.validate();
    if (bootstrapValidator.isValid()) {
      let submitZone:any = Object.assign({},this.zone);
      submitZone.project_id = project_id;
      this.transformSubmitZone(submitZone);
      this.zoneService.post(user.id, project_id, submitZone).subscribe(data => {
        this.router.navigate([`/user/project/${project_id}`]);
      });
    }
  }

  transformSubmitZone(zone) {
    if (zone.plant) {
      zone.plant = zone.plant.id;
    }
    if (zone.plant_variety) {
      zone.plant_variety = zone.plant_variety.id;
    }
  }

  updateLocation(location) {
    this.zone.location = location;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.zone.image = fileList[0];
    }
    this.readURL(event.target);
  }

  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click'); 
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.upload-preview').css('background-image', 'url('+e.target['result'] +')');
      }

      reader.readAsDataURL(input.files[0]);
    }
  }
}
