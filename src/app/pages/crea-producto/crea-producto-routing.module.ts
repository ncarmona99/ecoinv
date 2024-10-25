import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreaProductoPage } from './crea-producto.page';

const routes: Routes = [
  {
    path: '',
    component: CreaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaProductoPageRoutingModule {}
