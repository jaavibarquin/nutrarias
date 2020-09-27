import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanEditGuard } from './auth/guards/can-edit.guard';
import { CanSuscribeGuard } from './auth/guards/can-suscribe.guard';
import { CanAdminGuard } from './auth/guards/can-admin.guard';
import { PostComponent } from './components/posts/post/post.component';
import { ModalPlanesComponent } from './shared/modalPlanes/modalPlanes.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'verification-email',
    loadChildren: () =>
      import('./auth/verification-email/verification-email.module').then(
        (m) => m.VerificationEmailModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [CanAdminGuard],
  },

  {
    path: 'editor',
    loadChildren: () =>
      import('./editor/editor.module').then((m) => m.EditorModule),
    canActivate: [CanEditGuard],
  },
  {
    path: 'suscriptor',
    loadChildren: () =>
      import('./suscriptor/suscriptor.module').then((m) => m.SuscriptorModule),
    canActivate: [CanSuscribeGuard],
  },
  {
    path: 'equipo',
    loadChildren: () =>
      import('./equipo/equipo.module').then((m) => m.EquipoModule),
  },
  {
    path: 'metodo',
    loadChildren: () =>
      import('./metodo/metodo.module').then((m) => m.MetodoModule),
  },
  {
    path: 'planes',
    loadChildren: () =>
      import('./planes/planes.module').then((m) => m.PlanesModule),
  },
  {
    path: 'contacto',
    loadChildren: () =>
      import('./contacto/contacto.module').then((m) => m.ContactoModule),
  },

  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'blog/post/:id',
    component: PostComponent,
  },
  {
    path: 'admin/modalPlanes',
    component: ModalPlanesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
