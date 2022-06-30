import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthStateChange,
  FirebaseAuthentication,
  GetIdTokenOptions,
  SignInWithPhoneNumberOptions,
  SignInWithPhoneNumberResult,
  User,
} from '@capacitor-firebase/authentication';
import { initializeApp } from '@firebase/app';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {ApicallService} from "../services/apicall.service";
import {GlobalService} from "../services/global.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private readonly authStateSubj = new Subject<AuthStateChange>();
  public login:any = {user_id:'', token:''};
  constructor(private router:Router, public apiCall : ApicallService, public global : GlobalService) { }

  ngOnInit() {
    initializeApp(environment.firebaseConfig);
  }
  async signInWithGoogle() {
    console.log('Google Programme Run')
     const result = await FirebaseAuthentication.signInWithGoogle();
     console.log(result.user.uid)
    this.login.user_id = result.user.uid;
     this.global.api_UserID(result.user.uid);
     this.apiCall.api_login(this.login);
     this.global.Login.subscribe(res => {
       console.log(res);
       if (res.message == 'profile created') {
         const x = {id:result.user.uid, no:1}
         this.router.navigate(['/information'], {state:{Login:x}});
       }
       if (res.message == 'User Already exits') {
         this.router.navigate(['/tabs/tab1']);
       }
     })
     return result.user;
   };
   async signInWithFacebook() {
    console.log('Facebook Programme Run')
     const result = await FirebaseAuthentication.signInWithFacebook();
     console.log(result)
     return result.user;
   };
   goToMobile(){
    this.router.navigate(['/mobile'])
   }
}
