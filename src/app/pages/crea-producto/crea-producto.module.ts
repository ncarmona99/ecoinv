import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaProductoPageRoutingModule } from './crea-producto-routing.module';

import { CreaProductoPage } from './crea-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaProductoPageRoutingModule
  ],
  declarations: [CreaProductoPage]
})
export class CreaProductoPageModule {}
