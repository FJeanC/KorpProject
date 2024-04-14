import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PerfilComponent } from './components/perfil/perfil.component';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component:LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'feed', component: MainPageComponent},
    { path: 'perfil', component: PerfilComponent},
    
];
