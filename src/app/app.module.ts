//app.module.ts Inhalt:

import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core'
import {NativeScriptModule} from '@nativescript/angular'
import {HttpClientModule} from '@angular/common/http'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HomePageComponent} from '~/app/Components/Home-page/home-page.component';
import {SensorOverviewComponent} from '~/app/Components/Sensor-overview/sensor-overview.component';
import {BackendService} from './Services/backend.service';
import {NativeScriptUIChartModule} from "nativescript-ui-chart/angular";
import {SensorChartComponent} from "~/app/Components/SensorChart/sensor-chart.component";
import {SensorDetailComponent} from "~/app/Components/SensorDetail/sensor-detail.component";
import {SensorMeasurementsComponent} from "~/app/Components/SensorMeasurements/sensor-measurements.component";
import { HeaderComponent} from "~/app/Components/Header/header.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule, HttpClientModule, NativeScriptUIChartModule],
    declarations: [AppComponent, HomePageComponent, SensorOverviewComponent, SensorChartComponent, SensorDetailComponent, SensorMeasurementsComponent, HeaderComponent],
    providers: [BackendService],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
}
//---------------------------------------------------