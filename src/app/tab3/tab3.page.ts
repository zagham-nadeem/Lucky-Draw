import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  sowButton: boolean = false;
  enableInput : boolean = true;
  changeIcon: boolean = true;
  public userData:any={pr_id:'', id:'', img:'', first_name:'', last_name:'', phoneno:'', cnic:'', address:''};
  constructor() {
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
    this.userData.img = img.base64String;
  }
}
