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
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private readonly authStateSubj = new Subject<AuthStateChange>();

  constructor(private router:Router) { }

  ngOnInit() {
    initializeApp(environment.firebaseConfig);
  }
  async signInWithGoogle() {
    console.log('Google Programme Run')
     const result = await FirebaseAuthentication.signInWithGoogle();
     console.log(result)
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
