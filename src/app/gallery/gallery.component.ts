import { 
    Component, OnChanges, Input, 
    trigger, state, animate, transition, style, OnInit
} from '@angular/core';

import { Http, Response } from '@angular/http';
import { HttpService } from '../services/http.service';
import 'rxjs/add/operator/map';

const URL_PREFIX = "http://turbo.deepart.io/media/output/";
const EXTENSION = ".jpg";

const PLAYING = "galleryPlay";
const STOPPED = "galleryStop";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [
    trigger('isVisibleChanged', [
      state('middle' , style({ transform: 'translateX(0px)' })),
      state('left', style({ transform: 'translateX(-600px)'  })),
      state('right', style({ transform: 'translateX(600px)'  })),
      transition('right => middle', animate('1578ms')),
      transition('middle => left', animate('1578ms')),
      transition('left => right', animate('100ms'))
    ])
  ]
})
export class GalleryComponent implements OnInit {
  private urlTurpin;
  private listIds = [];
  private playing = false;
  private classValue = STOPPED;
  private currentStatus = 'middle';
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getStyles().subscribe((data) => {
      const listLines = data.text().split('\n');
      for (let i = 0 ; i < listLines.length ; i++){
        const id =  listLines[i].split(' ')[0];
        if ( id !== '') {
          this.listIds.push(id);
        }
      }
      console.log(this.listIds);
    });
  }

  getTurpin($event) {
    const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    this.http.getTurpin(file, this.listIds).subscribe((data) => {
      console.log('salam');
      setTimeout(() => {
        this.urlTurpin = URL_PREFIX + data.text() + EXTENSION; 
      }, 9000);
    });
  }

  toggleClass(){
    if (!this.playing){
      this.classValue = PLAYING;
      this.currentStatus = 'left';
      setTimeout(function(){ this.currentStatus = 'right';console.log(this.currentStatus); }, 2000);
    } else {
      this.classValue = STOPPED;
      this.currentStatus = 'middle';
    }
    this.playing = !this.playing;
  }

}
