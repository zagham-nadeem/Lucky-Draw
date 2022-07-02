import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import { FireAuthService } from "../services/fire-auth.service";
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { initializeApp, FirebaseApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {GlobalService} from "../services/global.service";
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.page.html',
  styleUrls: ['./mobile.page.scss'],
})
export class MobilePage implements OnInit {

  CountryJson = environment.CountryJson;
  OTP: string = '';
  Code: any;
  PhoneNo: any = '';
  CountryCode: any = '+92';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  constructor(public NavCtrl: NavController,private router:Router, private alertController: AlertController,
              private authService: FireAuthService, public loadingCtrl : LoadingController,
              public global : GlobalService) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }
  // Button event after the nmber is entered and button is clicked
  signinWithPhoneNumber($event) {

    console.log('country', this.recaptchaVerifier);

    if (this.PhoneNo && this.CountryCode) {
      this.OtpVerification();
      const numbersAsString = `${92}${this.PhoneNo}`;
      console.log(numbersAsString);

      console.log(numbersAsString.slice(0,0));
      this.global.api_Phone(numbersAsString);
      this.authService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNo).then(
        success => {
          this.router.navigate(['/otp'])

        }
      );
    }
  }
  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
  async OtpVerification() {
    const loading = await this.loadingCtrl.create({
      message : 'Please Wait',
      duration: 6000,
      spinner: 'dots',
      mode : 'ios',
      cssClass : 'custom-loading'
    });

    loading.present();
  }
  goToBack(){
    this.NavCtrl.back()
   }
   goToOtp($event){
    this.router.navigate(['/otp'])
   }

}
