import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApicallService} from "../services/apicall.service";
import {GlobalService} from "../services/global.service";
import {ModalPage} from "../pages/modal/modal.page";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public bid:any = [{name:'Jhon', price:300},{name:'Peter', price:500},{name:'James', price:1000}]
  timeLeft: number = 60;
  interval;
  public totalEntery:any;
  public entry:any = 105712;
  public entryNo:any;
  public winnner:any;
  modalData: any;

  constructor( public router : Router, public apiCall : ApicallService, public global : GlobalService, public modalCtrl : ModalController) {}

  ngOnInit() {
    this.getWInner();
    this.startTimer()
    this.entryNo = this.entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const totalEntry = 458308;
    this.totalEntery = totalEntry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }
  detail(b) {
    this.presentModal(b);
    // this.router.navigate(['/timer'], {state:{Data:b}})
  }
  async getWInner() {
    await this.apiCall.api_getWin();
    await this.global.Win.subscribe(res => {
      this.winnner = res;
      console.log(this.winnner);
    })
  }
  async presentModal(index: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      cssClass: 'my-modal-class',
      componentProps: {
        'Data': index,
      }
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.modalData = modelData.data;
        console.log('Modal Data : ' + modelData.data);
        this.getWInner();
      }
    });
    console.table(index)
    return await modal.present();
  }
}
