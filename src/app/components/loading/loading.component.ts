import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor() { }
  options: AnimationOptions = {
    path: '/assets/loading.json',
  };
  animationItem: any;

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    console.log(animationItem);
  }

  ngOnInit() {}

}
