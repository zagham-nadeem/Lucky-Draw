import { Component, Input, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() Data:any;
  enableInput : boolean = true;
  constructor( public modalCtrl : ModalController) { }

  ngOnInit() {
  }
  close() {
    const close: string = "Modal Removed";
    this.modalCtrl.dismiss(close).then(r => {
      console.log(r);
    });
  }
}
