import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { GoogleAPI } from '../gloader';

declare var google: any;
declare var $: any;

@Component({
  selector: 'g-select-location',
  templateUrl: './g-select-location.component.html',
  styleUrls: ['./g-select-location.component.css']
})
export class GSelectLocationComponent {

  @Input('height') containerHeight:any;
  @Output() onLocationUpdate = new EventEmitter();
  map: any;

  constructor(private googleAPI: GoogleAPI,
              private ref: ChangeDetectorRef,
              private el:ElementRef) { 

    googleAPI.doSomethingGoogley().then(() => {
      var mapProp = {
        center: new google.maps.LatLng(11.884739, 108.563415),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("google-map-container"), mapProp);
      this.initAutocomplete(map, this.onLocationUpdate);
    });
  }

  initAutocomplete(map, onLocationUpdate) {

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    let clearMarker = () => {
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
    }

    google.maps.event.addListener(map, 'click', function(event) {
      clearMarker();
      let marker = new google.maps.Marker({
        map: map,
        position: event.latLng
      });
      markers.push(marker);
      if (event.placeId) {
        var service = new google.maps.places.PlacesService(map);
        service.getDetails({
          placeId: event.placeId
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            onLocationUpdate.emit(place.name);
          } else {
            onLocationUpdate.emit('Unknown');
          }
        });
      } else {
        onLocationUpdate.emit('Unknown');
      }
    });

    google.maps.event.addListener(searchBox, 'places_changed', () => {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      clearMarker();

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        }));

        //TODO:
        // project.location = place.name;
        // project.location = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`;

        onLocationUpdate.emit(place.name);

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
}
