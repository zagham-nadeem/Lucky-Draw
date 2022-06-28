import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.page.html',
  styleUrls: ['./mobile.page.scss'],
})
export class MobilePage implements OnInit {

  constructor(public NavCtrl: NavController,private router:Router) { }

  ngOnInit() {
  }
  goToBack(){
    this.NavCtrl.back()
   }
   goToOtp(){
    this.router.navigate(['/otp'])
   }

}
