import { Component, OnInit } from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {Router} from "@angular/router";
import {ApicallService} from "../../services/apicall.service";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  public sowButton: boolean;
  public enableInput : boolean ;
  public changeIcon: boolean = true;
  public login:any;
  public update:boolean = true;
  public userData:any={pr_id:'', id:'', img:'', first_name:'', last_name:'', phoneno:'', cnic:'', address:''};
  public profileUpdate:any = { user_id:'', full_name:'', address:'', cnic:'', phone:'', image:'', token:'' }
  constructor( public router : Router, public apiCall : ApicallService, public global : GlobalService) {
  }
  ngOnInit() {
    this.login = history.state.Login;
    this.profileUpdate.user_id = this.login.id;
    console.log(this.login);
    if (this.login.no == 1) {
      this.update = false;
      this.enableInput = true;
      this.enable();
    }

  }

  enable(){
    this.changeIcon = !this.changeIcon;
    this.enableInput = ! this.enableInput;
    this.sowButton = ! this.sowButton;
  }
  async capturImage(){
    const img = await Camera.getPhoto({
      quality:90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
    });
    document.getElementById('cameraImage').setAttribute('src', `data:image/${img.format};base64,`+img.base64String );
    console.log(img.base64String);
    this.profileUpdate.image = img.base64String;
  }


  backhome() {
    this.router.navigate(['/tabs/tab1']);
  }
  updateProfile() {
    this.apiCall.api_updateProfile(this.profileUpdate);
    this.global.ProfileUpdate.subscribe(res => {
      if (res.error == false) {
        this.router.navigate(['/tabs/tab1']);
      }
    })
  }
}
