import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';

import { HomePageComponent } from './Components/home-page/home-page.component';
import { SensorOverviewComponent } from './Components/sensor-overview/sensor-overview';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sensors', component: SensorOverviewComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
