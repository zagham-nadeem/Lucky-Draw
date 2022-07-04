import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  //   User ID
  private userID = new BehaviorSubject<any>('');
  public UserID = this.userID.asObservable();
  api_UserID(basicInfo: any)
  {
    this.userID.next(basicInfo);
  }
  //   Login
  private login = new BehaviorSubject<any>('');
  public Login = this.login.asObservable();
  api_login(basicInfo: any)
  {
    this.login.next(basicInfo);
    console.log(basicInfo);
  }
  //   Profile
  private profile = new BehaviorSubject<any>('');
  public Profile = this.profile.asObservable();
  api_profile(basicInfo: any)
  {
    this.profile.next(basicInfo);
  }
  //   Profile
  private profileUpdate = new BehaviorSubject<any>('');
  public ProfileUpdate = this.profileUpdate.asObservable();
  api_profileUpdate(basicInfo: any)
  {
    this.profileUpdate.next(basicInfo);
  }
  //   Draw
  private draw = new BehaviorSubject<any>('');
  public Draw = this.draw.asObservable();
  api_Draw(basicInfo: any)
  {
    this.draw.next(basicInfo);
  }
  //   Phone No.
  private phone = new BehaviorSubject<any>('');
  public Phone = this.phone.asObservable();
  api_Phone(basicInfo: any)
  {
    this.phone.next(basicInfo);
    console.log(basicInfo);
  }
  // Get Win
  private win = new BehaviorSubject<any>('');
  public Win = this.win.asObservable();
  api_Win(basicInfo: any)
  {
    this.win.next(basicInfo);
    console.log(basicInfo);
  }
}
