import {Component, Input, OnInit} from '@angular/core';
import {element} from "protractor";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() height: string = "300px";
  @Input() lat: number = 45.593614;
  @Input() lng: number = -95.890831;
  @Input() zoom: number = 14;

  constructor() {}

  ngOnInit() {

    var head = document.getElementsByTagName( 'head' )[0];

// Save the original method
    var insertBefore = head.insertBefore;

// Replace it!
    head.insertBefore = function( newElement, referenceElement ) {

      if ( newElement.href && newElement.href.indexOf( 'https://fonts.googleapis.com/css?family=Roboto' ) === 0 ) {
        return null;
      }

      insertBefore.call( head, newElement, referenceElement );
    };
//     console.log("starting to search for font links");
//     let links = document.getElementsByTagName("link");
//     for (let link: HTMLLinkElement in links) {
//       console.log("found a link!");
//       const href = link.href;
//       console.log(href);
//       if (href && href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {
//         // link.remove();
//       }
//     }
  }

  setHeight() {
    let styles = {
      'height': this.height
    };
    return styles;
  }
}
