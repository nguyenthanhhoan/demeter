import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { addClassName, removeClassName } from '../../../utils/dom-helpers';

declare var $: any;
declare var blueimp: any;

@Directive({
  selector: '[image-gallery]'
})
export class ImageGalleryDirective implements OnInit {

  @Input()
  images = [];

  constructor(private el: ElementRef) {
  }

  ngOnInit(){

    let el = $(this.el.nativeElement);
    el.on('click', 'img', (e) => {
      let imageEle = $(e.target);
      let index = imageEle.data('id');
      let blueimpOpts = [];
      this.images.forEach((image) => {
        blueimpOpts.push({
          title: image.title,
          url: image.src
        });
      });

      blueimp(blueimpOpts, {
        urlProperty: 'url',
        index: index
      });
    });
  }
}
