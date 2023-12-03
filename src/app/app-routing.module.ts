import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ListRecompensaComponent } from './pages/list-recompensa/list-recompensa.component';
import { VHistorialComponent } from './pages/v-historial/v-historial.component';
import { RActividadComponent } from './pages/r-actividad/r-actividad.component';
import { CRecompensaComponent } from './pages/c-recompensa/c-recompensa.component';
import { AuthGuard } from './service/auth-guard.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { VerCatalogoComponent } from './pages/ver-catalogo/ver-catalogo.component';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full'
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'registrar-actividad',
        component: RActividadComponent
      },
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path:'ver-historial',
        component:VHistorialComponent
      },
      {
        path:'ver-catalogo',
        component:VerCatalogoComponent
      }
    ]
  },
  {
    path:'crear-recompensa',
    component:CRecompensaComponent,
    pathMatch:'full'
  },
  {
    path:'list-recompensa',
    component:ListRecompensaComponent,
    pathMatch:'full'
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
