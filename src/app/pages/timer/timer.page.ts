import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  timeLeft: number = 60;
  interval;
  public totalEntery:any;
  public entry:any = 105712;
  public entryNo:any;
  public bid:any;
  constructor( public router : Router) {}

  ngOnInit() {
    this.bid = history.state.Data;
    console.log(this.bid);
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

  backhome() {
    this.router.navigate(['/tabs/tab1'])
  }
  participate() {

  }
}
