import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {AlertController, ToastController} from '@ionic/angular';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  confirmationResult: firebase.auth.ConfirmationResult;

  constructor(private fireAuth: AngularFireAuth, public toastCtrl : ToastController) { }

  public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
    return new Promise<any>((resolve, reject) => {

      this.fireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }).catch(async (error) => {

        console.log(error);

        reject('SMS not sent');
        if (error !== '') {
          const toast = await this.toastCtrl.create({
            message: 'Wrong Number',
            duration: 5000,
            color: "danger"
          });
        }
      });
    });
  }
  public async enterVerificationCode(code) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then(async (result) => {
        console.log(result);
        const user = result.user;
        resolve(user);
      }).catch(async (error) => {
        const toast = await this.toastCtrl.create({
          message: 'Wrong OTP',
          duration: 5000,
          color: "danger"
        });
        reject(error.message);
      });

    });
  }
}
