import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./auth.service";
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  public login:any;
  public draw:any;
  participation: any;
  win: any;
  constructor(private authservice: AuthService, private global: GlobalService,  private router:Router) { }

  //Login
  async api_login(data: any) {
    await this.authservice.con(data , 'login').then((result) => {
      this.login = JSON.parse(String(result));
      this.global.api_login(this.login);
      console.log(this.login);
    }, (err) => {
      console.log(err);
    });
  }
  // get Profile
  async api_getProfile(id) {
    await this.authservice.getdata('get_profile/'+id).then((result) => {
      this.login = JSON.parse(String(result));
      console.log(this.login);
      this.global.api_profile(this.login);
    }, (err) => {
      console.log(err);
    });
  }
  //ProfileUpdate
  async api_updateProfile(data: any) {
    await this.authservice.con(data , 'profileupdate').then((result) => {
      this.login = JSON.parse(String(result));
      this.global.api_profileUpdate(this.login);
      console.log(this.login);
    }, (err) => {
      console.log(err);
    });
  }
  // get Draw
  async api_getDraw() {
    await this.authservice.getdata('get_draw').then((result) => {
      this.draw = JSON.parse(String(result));
      console.log(this.draw);
      this.global.api_Draw(this.draw);
    }, (err) => {
      console.log(err);
    });
  }
  //Participate in Bid
  async api_Participate(data: any) {
    await this.authservice.con(data , 'add_participation').then((result) => {
      this.participation = JSON.parse(String(result));
      console.log(this.participation);
    }, (err) => {
      console.log(err);
    });
  }
  // get Win
  async api_getWin() {
    await this.authservice.getdata('get_winner').then((result) => {
      this.win = JSON.parse(String(result));
      console.log(this.win);
      this.global.api_Win(this.win);
    }, (err) => {
      console.log(err);
    });
  }
}
