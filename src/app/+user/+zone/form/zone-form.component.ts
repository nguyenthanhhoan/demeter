import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import { ZoneService } from '../../../core/services/zone.service';
import { LocalStorageService } from '../../../shared/utils/localstorage.service';
import { GoogleAPI } from '../../../shared/integration/gloader';
import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

declare var google: any;
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
              private googleAPI: GoogleAPI,
              private ref: ChangeDetectorRef,
              private localStorageService: LocalStorageService,
              private zoneService: ZoneService,
              private route: ActivatedRoute,
              private el:ElementRef) { 

    googleAPI.doSomethingGoogley().then(() => {
      var mapProp = {
        center: new google.maps.LatLng(11.884739, 108.563415),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("google-map-container"), mapProp);
      this.initAutocomplete(map, this.zone, this.ref);
    });

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

  initAutocomplete(map, project, changeDetectorRef) {

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.

    google.maps.event.addListener(searchBox, 'places_changed', () => {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        }));

        project.location = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`;

        //TODO: Not figure out while view not updated
        changeDetectorRef.markForCheck();

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    // [END region_getplaces]
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
}
