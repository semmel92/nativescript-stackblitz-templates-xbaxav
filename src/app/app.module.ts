import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomePageComponent } from './Components/home-page/home-page.component';
import { SensorOverviewComponent } from './Components/sensor-overview/sensor-overview.component';
import { BackendService } from './Services/backend.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, HttpClientModule],
  declarations: [AppComponent, HomePageComponent, SensorOverviewComponent], 
  providers: [ BackendService ], 
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
