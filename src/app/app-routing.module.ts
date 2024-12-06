import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'hub',
    loadChildren: () =>
      import('./pages/hub/hub.module').then((m) => m.HubPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/edit/edit.module').then((m) => m.EditPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./pages/solicitudes/solicitudes.module').then( m => m.SolicitudesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'mod-producto',
    loadChildren: () => import('./pages/mod-producto/mod-producto.module').then( m => m.ModProductoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'crea-producto',
    loadChildren: () => import('./pages/crea-producto/crea-producto.module').then( m => m.CreaProductoPageModule),
    canActivate: [AuthGuard],
  },  {
    path: 'image-modal',
    loadChildren: () => import('./pages/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
