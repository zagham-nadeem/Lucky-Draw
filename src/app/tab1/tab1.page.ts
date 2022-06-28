import {Component, OnInit} from '@angular/core';
import { timer } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public totalEntery:any;
  public entry:any = 105712;
  public entryNo:any;
  public bid:any = [{name:'Jackpot', price:300},{name:'Winner', price:500},{name:'All Rounder', price:1000}]
  constructor() {}
  ngOnInit() {
    this.entryNo = this.entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const totalEntry = 458308;
    this.totalEntery = totalEntry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

}
