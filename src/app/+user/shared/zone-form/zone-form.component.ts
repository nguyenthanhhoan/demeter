import {
  ChangeDetectorRef, Component, DoCheck, ElementRef, Input, OnChanges, OnInit
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Chartist from 'chartist';

import { NotificationService } from '../../../shared/utils/notification.service';
import { ZoneService } from '../../../core/services/zone.service';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

declare var $: any;

@Component({
  selector: 'zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.css']
})
export class ZoneFormComponent implements OnInit, DoCheck {

  @Input()
  zone: any;

  @Input()
  type: string;

  oldZone: any = {};
  project_id;
  zone_id;

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
      id: 2,
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
      id: 3, 
      name: 'Flower',
      varieties: [
        { id: 1, name: 'Rose'},
        { id: 2, name: 'Tulip'},
        { id: 3, name: 'Daisy'},
        { id: 4, name: 'Sunflower'},
        { id: 5, name: 'Orchid'}
      ]
    }, { 
      id: 4, 
      name: 'Industrial Plant',
      varieties: [
        { id: 1, name: 'Coffee'},
        { id: 2, name: 'Tea'},
        { id: 3, name: 'Sugar Cane'},
        { id: 4, name: 'Corn'},
        { id: 5, name: 'Cotton'},
        { id: 5, name: 'Soybean'}
      ]},
    { id: 5, 
      name: 'Other',
      varieties: []
    }
  ];

  quantity_units = ['kg', 'pieces'];
  production_types = ['conventinal', 'organic', 'intergrated'];
  surface_units = ['m2', 'ha'];
  zone_types = ['greenhouse', 'orchard', 'field crop', 'special'];
  growing_condition_types = ['soil', 'medium', 'hydroponic', 'aeroponic', 'aquaponic', 'other']
  ownership_types = ['private', 'contract farming', 'rent'];

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
  constructor(private store: Store<any>,
              private ref: ChangeDetectorRef,
              private zoneService: ZoneService,
              private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private notificationService: NotificationService) {

    this.zone = {
      name: '',
      plant: this.plants[0]
    };

    // TODO: Refactor later
    setInterval(() => {
      this.ref.markForCheck();
    }, 1000);
  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zone_id);
    })
    .subscribe((zoneModel: any) => {
      this.zone_id = zoneModel.zoneId;
      this.project_id = zoneModel.projectId;
    });
  }

  onSubmit() {
    let form = $(this.el.nativeElement).find('form');
    const bootstrapValidator = form.data('bootstrapValidator');

    // TODO: Sometime the validate() fn from directive was not triggered
    // Should trigger here!!!
    bootstrapValidator.validate();
    if (bootstrapValidator.isValid()) {
      let submitZone: any = Object.assign({}, this.zone);
      submitZone.project_id = this.project_id;
      this.transformSubmitZone(submitZone);

      if (this.type === 'edit') {
        this.zoneService.put(submitZone).subscribe(data => {
          this.router.navigate([`/user/project/${this.project_id}`]);
        });
      } else {
        this.zoneService.post(submitZone).subscribe(data => {
          this.router.navigate([`/user/project/${this.project_id}`]);
        });
      }
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
    this.zone.location = location.name;
    this.zone.location_geometry = location.location_geometry;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (this.type === 'edit') {
      let submitImage: any;
      if (fileList.length > 0) {
        submitImage = fileList[0];
      }
      this.zoneService.updateImage(this.zone_id, submitImage)
      .subscribe((image) => {
        this.zone.image = image;
        this.notificationService.showMessage('Change image successfully!');
      });
    } else {
      if (fileList.length > 0) {
        this.zone.image = fileList[0];
      }
      this.readURL(event.target);
    }
  }

  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click');
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $('.upload-preview').css('background-image', 'url(' + e.target['result'] + ')');
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  transformZone() {
    let plant = this.plants.find((plant) => {
      return (plant.id === parseInt(this.zone.plant));
    });
    this.zone.plant = plant;

    if (plant && plant.varieties) {
      let plant_variety = plant.varieties.find((plant_variety) => {
        return (plant_variety.id === parseInt(this.zone.plant_variety));
      });
      this.zone.plant_variety = plant_variety;
    }
  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id != this.zone.id) {
      this.oldZone = this.zone;
      this.transformZone();
      this.ref.markForCheck();
    }
  }
}
