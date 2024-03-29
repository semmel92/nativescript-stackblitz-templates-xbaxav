//app-routing.module.ts Inhalt:

import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';

import { HomePageComponent } from '~/app/Components/Home-page/home-page.component';
import { SensorOverviewComponent } from '~/app/Components/Sensor-overview/sensor-overview.component';
import {SensorDetailComponent} from "~/app/Components/SensorDetail/sensor-detail.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sensors', component: SensorOverviewComponent },
  { path: 'sensor-detail/:id', component: SensorDetailComponent },
];


@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
//---------------------------------------------------