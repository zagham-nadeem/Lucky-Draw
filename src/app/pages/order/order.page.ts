import { Component, OnInit } from '@angular/core';
import {ApicallService} from "../../services/apicall.service";
import {GlobalService} from "../../services/global.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  sowButton: boolean = false;
  enableInput : boolean = true;
  changeIcon: boolean = true;
  pay: boolean = true;
  public bid:any;
  public userData:any={pr_id:'', id:'', img:'', first_name:'', last_name:'', phoneno:'', cnic:'', address:''};
  public profileUpdate:any = { user_id:'', full_name:'', address:'', cnic:'', phone:'', image:'', token:'' };
  public Profile:any;
  public profile : any;
  public Payment:any
  constructor(public apiCall : ApicallService, public global : GlobalService, public router : Router) {
  }

  ngOnInit() {
    this.profile = history.state.Data.profile;
    console.log(this.Payment)
    this.bid = history.state.Data.bid;
    this.getProfile();
    console.log(this.profile)
  }

  enable(){
    this.changeIcon = !this.changeIcon;
    this.enableInput = ! this.enableInput;
    this.sowButton = ! this.sowButton;
    this.pay = !this.pay;
  }
  async capturImage(){
    const img = await Camera.getPhoto({
      quality:90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
    });
    document.getElementById('cameraImage').setAttribute('src', `data:image/${img.format};base64,`+img.base64String );
    console.log(img.base64String);
    this.profileUpdate.image = img.base64String;
  }
  async getProfile() {
    await this.global.UserID.subscribe(res => {
      this.profileUpdate.user_id = res;
      this.apiCall.api_getProfile(res);
      this.global.Profile.subscribe(res => {
        this.Profile = res;
        console.log(this.Profile)
        this.profileUpdate.full_name = this.Profile.full_name;
        this.profileUpdate.cnic = this.Profile.cnic;
        this.profileUpdate.phone = this.Profile.phone;
        this.profileUpdate.address = this.Profile.address;
      });
    })

  }
  updatePeofile() {
    console.log(this.profileUpdate);
    this.apiCall.api_updateProfile(this.profileUpdate);
    this.enableInput = false;
    this.sowButton = false;
    this.getProfile();
  }
  payment() {
    this.Payment = {profile: this.Profile, bid: this.bid}
    this.router.navigate(['/payment'], {state:{Data:this.Payment}});
  }

}
