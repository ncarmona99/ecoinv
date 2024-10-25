import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModProductoPage } from './mod-producto.page';

const routes: Routes = [
  {
    path: '',
    component: ModProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModProductoPageRoutingModule {}
