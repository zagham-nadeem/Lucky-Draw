import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import {GlobalService} from "../../services/global.service";
import {ApicallService} from "../../services/apicall.service";
import {format} from "date-fns";
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
  private _trialEndsAt;

  private _diff: number = 0;
  private _days: number = 0;
  private _hours: number = 0;

  private _minutes: number = 0;

  private _seconds: number = 0;
  profile: { profile: any; bid: any; };

  constructor( public router : Router, public alertController: AlertController, public loadingCtrl : LoadingController, public apiCall : ApicallService, public global : GlobalService) {}

  ngOnInit() {
    this.bid = history.state.Data;
    console.log(this.bid);
    this.presentAlert();
    this.timer();
  this.startTimer()
  this.entryNo = this.entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const totalEntry = 458308;
  this.totalEntery = totalEntry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  timer() {
    this._trialEndsAt = this.bid.to_date;
    const date = new Date()
    var result = format(new Date(date), 'yyyy-MM-dd')
    console.log(this._trialEndsAt)
    console.log(result)
    if (this._trialEndsAt >= result) {
      interval(1000).pipe(
        map((x) => {this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
        })).subscribe((x) => {
        this._days = this.getDays(this._diff);
        this._hours = this.getHours(this._diff);
        this._minutes = this.getMinutes(this._diff);
        this._seconds = this.getSeconds(this._diff);
      });
    }
    else {
      this._days = 0;
      this._hours = 0;
      this._minutes = 0;
      this._seconds = 0;
    }

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
    this.router.navigate(['/tabs/tab1']);
  }
  participate() {
    this.global.UserID.subscribe(r => {
      this.apiCall.api_getProfile(r);
      this.global.Profile.subscribe(res => {
        console.log(res);
        this.profile = {profile:res, bid : this.bid};
        this.router.navigate(['/order'], {state:{Data: this.profile}});
      })
    })
  }
  getDays(t) {
    return Math.floor( t / (1000 * 60 * 60 * 24) );
  }

  getHours(t) {
    return Math.floor( (t / (1000 * 60 * 60)) % 24 );
  }

  getMinutes(t) {
    return Math.floor( (t / 1000 / 60) % 60 );
  }

  getSeconds(t) {
    return Math.floor( (t / 1000 ) % 60 );
  }
  async presentAlert() {
    const loading = await this.loadingCtrl.create({
      message : 'Please Wait',
      duration: 3000,
      spinner: 'dots',
      mode : 'ios',
      cssClass : 'custom-loading'
    });

    loading.present();

  }

}
