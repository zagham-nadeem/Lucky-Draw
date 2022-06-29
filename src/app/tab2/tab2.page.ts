import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public bid:any = [{name:'Jhon', price:300},{name:'Peter', price:500},{name:'James', price:1000}]
  timeLeft: number = 60;
  interval;
  public totalEntery:any;
  public entry:any = 105712;
  public entryNo:any;

  constructor( public router : Router) {}

  ngOnInit() {
    this.startTimer()
    this.entryNo = this.entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const totalEntry = 458308;
    this.totalEntery = totalEntry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }
  detail(b) {
    this.router.navigate(['/timer'], {state:{Data:b}})
  }
}
