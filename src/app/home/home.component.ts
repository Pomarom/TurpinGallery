import { 
    Component, OnChanges, Input, 
    trigger, state, animate, transition, style, OnInit, AfterViewInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { keyframes } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('blur', [
      state('true' , style({ opacity: 0 })),
      state('false', style({ opacity: 0.6 })),
      transition('0 <=> 1', animate('400ms'))
    ]),
    trigger('logo', [
      state('true' , style({ transform: 'scale(0)' })),
      state('false', style({ transform: 'scale(0.5) translate(0, 100%)' })),
      transition('0 <=> 1', animate('1200ms', keyframes([
        style({ transform: 'scale(1.1)', offset: 0}),
        style({ transform: 'scale(1.6)', offset: 0.2}),
        style({ transform: 'scale(0.6)', offset: 0.3}),
        style({ transform: 'scale(0.95)', offset: 0.45}),
        style({ transform: 'scale(1)', offset: 0.6}),
        style({ transform: 'scale(1)', offset: 0.8}),
        style({ transform: 'scale(0.5) translate(0, 100%)', offset: 1.0})
      ])))
    ]),
    trigger('text', [
      state('true' , style({ opacity: 1 })),
      state('false', style({ opacity: 1 })),
      transition('0 <=> 1', animate('1200ms', keyframes([
        style({ transform: 'scale(1)', offset: 0.8}),
        style({ transform: 'scale(1.5)', offset: 1.0})
      ])))
    ])
   /* 0% { transform: scale(1.1); opacity: 1 }
  50% { transform: scale(1.6); opacity: .7; }
  60% { transform: scale(0.6); opacity: 1 }
  80% { transform: scale(0.95) }
  100% { transform: scale(0.85) }*/
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {

  isBlurred = true;
  trigger2ndpart = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.toggle();
    }, 500);
    
  }

  toggle() {
    this.isBlurred = !this.isBlurred;
  }

  logoDone(event) {
    if (event.fromState === true && !event.toState ) {
      console.log(event);
    }
    this.trigger2ndpart = true;
  }

  goGallery() {
    this.router.navigate(['/gallery']);
  }
}
