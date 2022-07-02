import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApicallService} from "../../services/apicall.service";
import {GlobalService} from "../../services/global.service";
import { format, compareAsc } from 'date-fns'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  public participate:any = {d_id:'', user_id:'', ammount:'', date:''};
  public bid:any;
  public profile:any;
  constructor(private router: Router, public apiCall : ApicallService, public global : GlobalService) { }

  ngOnInit() {
    const date = new Date();
    console.log(date);
    var result = format(new Date(date), 'yyyy-MM-dd')
    console.log(result);
    this.bid = history.state.Data.bid;
    this.profile = history.state.Data.profile;
    const x = history.state.Data
    console.log(x)
    console.log(this.bid)
      this.participate.d_id = this.bid.d_id;
      this.participate.ammount = this.bid.price;
      this.participate.date = date;
      this.participate.user_id =  this.profile.user_id;

  }
  backhome(){
    this.router.navigate(['/tabs/tab1'])
  }
  done() {
    console.log(this.participate)
    this.apiCall.api_Participate(this.participate);
    this.router.navigate(['/tabs/tab1'])
  }

}
