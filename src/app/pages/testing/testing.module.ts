import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestingPageRoutingModule } from './testing-routing.module';

import { TestingPage } from './testing.page';
import {LottieModule} from "ngx-lottie";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TestingPageRoutingModule,
        LottieModule
    ],
  declarations: [TestingPage]
})
export class TestingPageModule {}
