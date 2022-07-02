import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import {FireAuthService} from "../services/fire-auth.service";
import {ApicallService} from "../services/apicall.service";
import {GlobalService} from "../services/global.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  public login:any = {user_id:'', token:''};
  @ViewChild('otp1') input;
  otpString: string[] = ['', '', '', '', '', ''];
  isLoading = false;
  public phoneNo : any;

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public NavCtrl: NavController,
    public authService : FireAuthService,
    public apiCall : ApicallService,
    public global : GlobalService,
    public router : Router
  ) { }

  ngOnInit() {
    console.log(this.otpString)
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    setTimeout(() => {
      this.input.setFocus();
      console.log('enter');
    }, 500);
   }

   otp(event, prev, next, index) {
     console.log(event);
     const pattern = /[0-9]/;
     let inputChar = String.fromCharCode(event.which ? event.which : event.keyCode);
     if(!pattern.test(inputChar)) {
       console.log('invalid character');
       event.preventDefault();
       this.otpString[index] = '';
       return;
     }
     let value = event.target.value;
     if(value.length > 1) {
       this.otpString[index] = value;
       console.log(this.otpString);
     }
     if(value.length < 1 && prev) {
       prev.setFocus();
     } else if(next && value.length > 0) {
       next.setFocus();
     } else {
       if(next == '') {
         this.verifyOtp();
       } else return 0;
     }
   }

   showLoader(msg) {
     if(!this.isLoading) this.isLoading = true;
     return this.loadingCtrl.create({
       message: msg,
       mode: "ios",
       duration: 3000,
       spinner: 'dots'
     }).then(res => {
       res.present().then(() => {
         if(!this.isLoading) {
           res.dismiss().then(() => {
             console.log('abort presenting');
           });
         }
       })
     })
     .catch(e => {
       this.isLoading = false;
       console.log(e);
     })
   }

   hideLoader() {
     if(this.isLoading) this.isLoading = false;
     return this.loadingCtrl.dismiss()
     .then(() => console.log('dismissed'))
     .catch(e => console.log(e));
   }

   joinOtpArray(otp) {
     if(!otp || otp == '') return 0;
     const otpNew = otp.join('');
     return otpNew;
   }

   async verifyOtp() {
     this.showLoader('Verifying...');
     let otp = this.joinOtpArray(this.otpString);
     const y = parseInt(otp)
     const res = {otp: y}
     console.log(res)
     this.authService.enterVerificationCode(res.otp).then(
       async result => {
         const toast = await this.toastCtrl.create({
           message: 'Verified Successfully',
           duration: 5000,
           position: "top",
           color: "secondary"
         });
         toast.present();
         console.log(result);
         this.global.Phone.subscribe(r => {
           this.login.user_id = r;
           this.global.api_UserID(r);
           this.apiCall.api_login(this.login);
           this.global.Login.subscribe(res => {
             console.log(res);
             if (res.message == 'profile created') {
               const x = {id: r, no: 1}
               this.router.navigate(['/information'], {state: {Login: x}});
             }
             if (res.message == 'User Already exits') {
               this.router.navigate(['/tabs/tab1']);
             }
           })
         })

       });


       this.otpString = ['', '', '', '', '', ''];
       this.hideLoader();
     }
   goToBack(){
    this.NavCtrl.back()
   }

}
