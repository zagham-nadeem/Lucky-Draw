import {Component, OnInit} from '@angular/core';
import { timer } from 'rxjs';
import {Router} from "@angular/router";
import {FcmService} from "../services/fcm.service";
import {ApicallService} from "../services/apicall.service";
import {GlobalService} from "../services/global.service";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public totalEntery:any;
  public entry:any = 105712;
  public entryNo:any;
  public bid:any;
  constructor( public router: Router, public fcm : FcmService, public apiCall: ApicallService, public global : GlobalService) {}

  ngOnInit() {
    this.getDraw();
    this.entryNo = this.entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const totalEntry = 458308;
    this.totalEntery = totalEntry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true
  };
  participate(b) {
    this.router.navigate(['/timer'], {state:{Data:b}})
  }
  async getDraw() {
    await this.apiCall.api_getDraw();
    await this.global.Draw.subscribe(res => {
      if (res.length != 0) {
        this.bid = res.filter(res => res.status == 'start');
      }
    })
  }

}
