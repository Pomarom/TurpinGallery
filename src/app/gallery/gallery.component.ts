import { 
    Component, OnChanges, Input, 
    trigger, state, animate, transition, style, OnInit
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { HttpService } from '../services/http.service';
import { MusicService } from '../services/music.service';
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
      state('left', style({ transform: 'translateX(-70vw)', })),
      state('right', style({ transform: 'translateX(250%)'  })),
      transition('right => middle', animate('1578ms')),
      transition('middle => left', animate('1578ms')),
      transition('left => right', animate('100ms'))
    ]),
    trigger('curtain', [
      state('true' , style({ transform: 'scaleY(1)' })),
      state('false', style({ transform: 'scaleY(0)', })),
      transition('0 <=> 1', animate('300ms')),
    ]),
  ]
})
export class GalleryComponent implements OnInit {
  private urlTurpin = "assets/turpin.jpg";
  private listIds = [];
  private playing = false;
  private classValue = STOPPED;
  private curtainDown = false;
  private currentStatus = 'middle';
  private turpinFile;
  constructor(private http: HttpService, private musicService: MusicService) { }

  ngOnInit() {

    this.getImage('assets/turpin.jpg').subscribe(imageData =>{
      this.turpinFile = this.blobToFile(new Blob([imageData]),"turpino.jpg");
    });


    this.musicService.playBackground();
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
    /* const files = $event.target.files || $event.srcElement.files;
    const file = files[0]; */
    this.toggleCurtain();
    this.http.getTurpin(this.turpinFile, this.listIds).subscribe((data) => {
      console.log('salam');
      console.log(data.text());
      this.tryToGetTurpin(URL_PREFIX + data.text() + EXTENSION);
    });
  }

  toggleClass() {
    if (!this.playing) {
      this.classValue = PLAYING;
      this.currentStatus = 'left';
      setTimeout(() => {
        this.currentStatus = 'right';
        console.log(this.currentStatus);
      }, 2000);
    } else {
      this.classValue = STOPPED;
      this.currentStatus = 'middle';
    }
    this.playing = !this.playing;
  }

  tryToGetTurpin(url){
    this.http.getTurpinImg(url).subscribe((data) => {
      console.log(data);
      this.urlTurpin = url;
      this.toggleCurtain();
    },
    (err) => {
      setTimeout(() => {
        this.tryToGetTurpin(url);
      }, 1000);
    });
  }

  toggleCurtain(){
    this.curtainDown = !this.curtainDown;
  }

  /*downloadFile(data: Response) {
    let blob = new Blob([data], { type: 'image/jpeg' });
    this.turpinFile = blob; // tslint-disable
    console.log(this.turpinFile);
    var url= window.URL.createObjectURL(this.turpinFile);
    window.open(url);
  }*/

  getImage(url:string){ 
    return Observable.create(observer=>{
      let req = new XMLHttpRequest();
      req.open('get',url);
      req.responseType = "arraybuffer";
      req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
          observer.next(req.response);
          observer.complete();
        }
      };
      req.send();
    });
  }
  blobToFile(theBlob: Blob, fileName:string): File {
    let b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
}

}
