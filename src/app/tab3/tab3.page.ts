import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {ApicallService} from "../services/apicall.service";
import {GlobalService} from "../services/global.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  sowButton: boolean = false;
  enableInput : boolean = true;
  changeIcon: boolean = true;
  public userData:any={pr_id:'', id:'', img:'', first_name:'', last_name:'', phoneno:'', cnic:'', address:''};
  public profileUpdate:any = { user_id:'', full_name:'', address:'', cnic:'', phone:'', image:'', token:'' };
  public Profile:any;
  constructor(public apiCall : ApicallService, public global : GlobalService, public router : Router) {
  }

  ngOnInit() {
    this.getProfile();
    }

  enable(){
    this.changeIcon = !this.changeIcon;
    this.enableInput = ! this.enableInput;
    this.sowButton = ! this.sowButton;
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
      });
    })

  }
  updatePeofile() {
    console.log(this.profileUpdate);
    this.apiCall.api_updateProfile(this.profileUpdate);
    this.global.ProfileUpdate.subscribe(res => {

    })
    this.enableInput = false;
    this.sowButton = false;
    this.getProfile();
  }
}
