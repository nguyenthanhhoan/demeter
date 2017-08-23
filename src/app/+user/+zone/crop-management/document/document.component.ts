import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  documents = [
    'Tailieuthuycanh.pdf',
    'Enzacatalog.pdf',
    'vattuphanthuoc',
    'tailieubenh',
    'saubenhxalach'
  ];
  constructor() {

  }

  ngOnInit() {

  }

}
