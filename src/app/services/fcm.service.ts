import { Injectable } from '@angular/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { FCM } from '@capacitor-community/fcm';
import { Platform } from "@ionic/angular";
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(public platform : Platform) {  }
  Platform() {
    if (this.platform.is('mobileweb')) {
      console.log('web', this.platform)
    }
    if (this.platform.is('ios')) {
      console.log('ios', this.platform)
    }
    if (this.platform.is('android')) {
      console.log('android', this.platform)
    }
  }
  getToken() {
    PushNotifications.requestPermissions().then(async (permission) => {
      if (permission.receive == "granted") {
        // Register with Apple / Google to receive push via APNS/FCM
        if (Capacitor.getPlatform() == 'ios') {
          await PushNotifications.register();
          PushNotifications.addListener('registration', (token: Token) => {
            FCM.getToken().then((result) => {
              console.log(result.token); // This is token for IOS
            }).catch((err) => console.log('i am Error', err));
          })
        } else if (Capacitor.getPlatform() == 'android') {
          await PushNotifications.register()
          PushNotifications.addListener('registration', async ({ value }) => {
            let androidToken = value; // this is token for Android use this token
          });
        }
      } else {
        // No permission for push granted
        alert('No Permission for Notifications!')
      }
    });

  }

}
