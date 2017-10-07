import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { GoogleAPI } from '../gloader';

declare var google: any;
declare var $: any;

@Component({
  selector: 'g-select-location',
  templateUrl: './g-select-location.component.html',
  styleUrls: ['./g-select-location.component.css']
})
export class GSelectLocationComponent implements OnChanges {

  @Input('height') containerHeight:any;
  @Input() location_geometry: string;
  @Output() onLocationUpdate = new EventEmitter();
  map: any;

  markers: any[] = [];

  pendingCheck: boolean = false;
  mapInitialized: boolean = false;

  constructor(private googleAPI: GoogleAPI,
              private el: ElementRef) {

    googleAPI.doSomethingGoogley().then(() => {
      let mapProp = {
        center: new google.maps.LatLng(11.884739, 108.563415),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(document.getElementById('google-map-container'), mapProp);
      this.mapInitialized = true;
      this.initAutocomplete(this.map, this.onLocationUpdate);
      if (this.pendingCheck) {
        this.addMarker(this.location_geometry);
        this.pendingCheck = false;
      }
    });
  }

  initAutocomplete(map, onLocationUpdate) {

    // Create the search box and link it to the UI element.
    let input = document.getElementById('pac-input');
    let searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    let clearMarker = () => {
      this.markers.forEach(function(marker) {
        marker.setMap(null);
      });
      this.markers = [];
    }

    google.maps.event.addListener(map, 'click', (event) => {
      clearMarker();
      let marker = new google.maps.Marker({
        map: map,
        position: event.latLng
      });
      this.markers.push(marker);
      if (event.placeId) {
        let service = new google.maps.places.PlacesService(map);
        service.getDetails({
          placeId: event.placeId
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            let location_geometry = `${place.geometry.location.lat()},${place.geometry.location.lng()}`;
            onLocationUpdate.emit({
              name: place.name,
              location_geometry: location_geometry
            });
          } else {
            onLocationUpdate.emit({
              name: 'Unknown'
            });
          }
        });
      } else {
        onLocationUpdate.emit({
          name: 'Unknown'
        });
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
      places.forEach((place) => {
        // Create a marker for each place.
        this.markers.push(new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        }));

        let location_geometry = `${place.geometry.location.lat()},${place.geometry.location.lng()}`;
        onLocationUpdate.emit({
          name: place.name, 
          location_geometry: location_geometry
        });

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

  addMarker(location_geometry) {
    let lat = parseFloat(location_geometry.split(',')[0]);
    let lng = parseFloat(location_geometry.split(',')[1]);
    let latLng = { lat: lat, lng: lng };
    let marker = new google.maps.Marker({
      map: this.map,
      position: latLng
    });
    this.markers.push(marker);
    this.map.panTo(latLng);
  }

  // TODO: Reactive programing needed
  ngOnChanges(changes: SimpleChanges) {
    if (changes['location_geometry'] && changes['location_geometry'].currentValue

      // TODO: Have not idea
      && changes['location_geometry'].currentValue !== 'undefined') {

      if (this.mapInitialized) {

        this.addMarker(changes['location_geometry'].currentValue);
      } else {
        // Wait for google lib to be loaded
        this.pendingCheck = true;
      }
    }
  }
}
