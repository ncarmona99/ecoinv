import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModProductoPageRoutingModule } from './mod-producto-routing.module';

import { ModProductoPage } from './mod-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModProductoPageRoutingModule
  ],
  declarations: [ModProductoPage]
})
export class ModProductoPageModule {}
