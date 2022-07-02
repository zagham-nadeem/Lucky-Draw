import {map} from 'rxjs/internal/operators';
import { Component, NgZone, OnInit } from '@angular/core';
import {interval, Observable} from 'rxjs';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {

  options: AnimationOptions = {
    path: '/assets/congrats.json',
  };
  animationItem: any;
  CountryCode: any = '+92';
  PhoneNo: any = 3002951779;

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    console.log(animationItem);
  }

  private _trialEndsAt;

  private _diff: number;
  private _days: number;
  private _hours: number;

  private _minutes: number;

  private _seconds: number;

  constructor(private ngZone: NgZone) {

  }
  public User:any ={
  "uid": "sX2eokLQGfSTmP6TWspE8NXxXWt2",
  "emailVerified": false,
  "isAnonymous": false,
  "phoneNumber": "+923064969424",
  "providerData": [
    {
      "providerId": "phone",
      "uid": "+923064969424",
      "displayName": null,
      "email": null,
      "phoneNumber": "+923064969424",
      "photoURL": null
    }
  ],
  "stsTokenManager": {
    "refreshToken": "AIwUaOmyF1DCy9LhsgDIOmZ1bduCue-3j35rTIAu1g0OCWIJucYcQOwZQYcZnBnXOpQZS8ctT6-pvI3ru1PDUC0_iby6Na6zHgrsrkMSzHWEqdRsbJDPhuMLHb7LtNhiQwHjkUHnh_Md299aD06q4hDBgGbKtd8p3T0ZLBXeJZ-kHF2hkwIUStcfiKJeGGQLayk0J0virCbW",
    "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwYTdhYTlkNzg5MmI1MmE4YzgxMzkwMzIzYzVjMjJlMTkwMzI1ZDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZHJhdy1jb250ZXN0IiwiYXVkIjoiZHJhdy1jb250ZXN0IiwiYXV0aF90aW1lIjoxNjU2NzYzMzY5LCJ1c2VyX2lkIjoic1gyZW9rTFFHZlNUbVA2VFdzcEU4Tlh4WFd0MiIsInN1YiI6InNYMmVva0xRR2ZTVG1QNlRXc3BFOE5YeFhXdDIiLCJpYXQiOjE2NTY3NjMzNjksImV4cCI6MTY1Njc2Njk2OSwicGhvbmVfbnVtYmVyIjoiKzkyMzA2NDk2OTQyNCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkyMzA2NDk2OTQyNCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.XMVP1DJ6gxHZmHkRFC6h3VJQX7kaxojq-oxt4wBcO5874_nS_OJy1dXvjpLxPESb6l7RKX8vMhk44x0WodVBfPMJEYu4pbSm_N49gnALXs-DvjKS3jQg-EYg4GApxTebtol24ARLHaZ14B9K8YhQX5Z2VS1gY-qN4rZGjyi6fonw4yfjT0UPtlYzKeMEmDsDD_RuuyfzqhmqXzE2wBF3Pqv7bO-7kpUf895lggfC5NhxWxxw9qqR99gHZuiV-veVqTQvtTzgArX5ebHkxDTAON5QMaU5F8zP3k7UBaEJxsknF1HfwRvpYQhmEyk6eDs9Kz8_kd7wOHBHvQbU9H2lbw",
    "expirationTime": 1656766969949
  },
  "createdAt": "1656763369597",
  "lastLoginAt": "1656763369597",
  "apiKey": "AIzaSyDku3NyNxbtK-cwWjaLO4AVFT3e7g1EqYg",
  "appName": "[DEFAULT]"
}
  ngOnInit() {
    const numbersAsString = `${this.CountryCode}${this.PhoneNo}`;
    console.log(numbersAsString);

    console.log(numbersAsString.slice(0,0));
    console.log(this.User.uid)

    this._trialEndsAt = "2022-07-02";
    const x = Date.parse(this._trialEndsAt)
    console.log(x)

    interval(1000).pipe(
      map((x) => {this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
      })).subscribe((x) => {
        console.log(this._diff)
      this._days = this.getDays(this._diff);
      this._hours = this.getHours(this._diff);
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
      console.log(this._days, this._hours,this._minutes, this._seconds)
    });
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
    console.log(t);
    return Math.floor( (t / 1000 ) % 60 );
  }


}
