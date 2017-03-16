import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import * as Chartist from 'chartist';

import { GoogleAPI } from '../../../shared/integration/gloader';
import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

declare var google: any;

@Component({
  selector: 'project-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  map: any;
  project: any;

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
      surface: {
        group: '.form-group',
        validators: {
          notEmpty: {
            message: 'The surface is required'
          }
        }
      },
      labour: {
        group: '.form-group',
        validators: {
          notEmpty: {
            message: 'The labour is required'
          }
        }
      },
      location: {
        group: '.form-group',
        validators: {
          notEmpty: {
            message: 'The location is required'
          }
        }
      }
    }
  }
  constructor(private router: Router,
              private googleAPI: GoogleAPI,
              private ref: ChangeDetectorRef) { 

    googleAPI.doSomethingGoogley().then(() => {
      var mapProp = {
        center: new google.maps.LatLng(11.884739, 108.563415),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("google-map-container"), mapProp);
      this.initAutocomplete(map, this.project, this.ref);
    });

    this.project = {
      name: '',
      surface: '',
      labour: '',
      location: ''
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
    console.log('onSubmit', this.project);
  }

}
