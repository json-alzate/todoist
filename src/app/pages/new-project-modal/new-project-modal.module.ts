import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorCircleModule } from 'ngx-color/circle';


import { NewProjectModalPageRoutingModule } from './new-project-modal-routing.module';

import { NewProjectModalPage } from './new-project-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewProjectModalPageRoutingModule,
    ColorCircleModule
  ],
  declarations: [NewProjectModalPage]
})
export class NewProjectModalPageModule {}
