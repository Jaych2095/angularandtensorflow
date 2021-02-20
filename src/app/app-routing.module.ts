import { NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';

import {AuthGuard} from "./auth-guard";
import { MainmodelComponent } from './mainmodel/mainmodel.component';

const appRoutes:Routes=[
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'mainmodel',component:MainmodelComponent,canActivate:[AuthGuard]}
    
    
]
@NgModule({
  imports:[
      RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule{

}