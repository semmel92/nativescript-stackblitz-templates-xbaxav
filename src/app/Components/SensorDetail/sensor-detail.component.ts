// sensor-detail.component.ts Inhalt:
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../Services/backend.service';
import { Sensor } from '~/app/Models/sensor.model';
import { Measurement } from "../../Models/measurement.model";
import {
    RadCartesianChart,
    LineSeries,
    DateTimeContinuousAxis,
    LinearAxis,
    ChartAxisHorizontalLocation, ChartAxisVerticalLocation
} from 'nativescript-ui-chart';

@Component({
    selector: 'app-sensor-detail',
    templateUrl: './sensor-detail.component.html',
    styleUrls: ['./sensor-detail.component.css']
})
export class SensorDetailComponent implements OnInit {
    sensor: Sensor;
    lastTenMeasurements: Measurement[];
    chartData: any[];
    chart: RadCartesianChart;
    @ViewChild('chartContainer') chartContainer: ElementRef;

    constructor(private route: ActivatedRoute, private backendService: BackendService) { }

    ngOnInit(): void {
        const sensorId = +this.route.snapshot.params['id'];
        if (sensorId) {
            this.loadSensorDetails(sensorId);
            this.loadChartData(sensorId, '24Hours');
        }
    }

    private loadSensorDetails(sensorId: number) {
        this.backendService.getSensor(sensorId).subscribe(sensorData => {
            this.sensor = sensorData;
            this.lastTenMeasurements = this.getLastTenMeasurements(sensorData.measurements);
        });
    }

    private getLastTenMeasurements(measurements: Measurement[]): Measurement[] {
        const convertedMeasurements = measurements.map(m => ({
            ...m,
            timestamp: new Date(m.timestamp)
        }));
        return convertedMeasurements.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);
    }

    private loadChartData(sensorId: number, timePeriod: string) {
        this.backendService.getMeasurementsFromSensorForPeriod(sensorId, timePeriod).subscribe(
            measurements => {
                this.chartData = measurements.map(m => ({
                    category: m.timestamp,
                    value: m.temperature
                }));
                this.initializeChart();
            },
            error => {
                console.error(`Fehler beim Abrufen der Messungen für den Zeitraum ${timePeriod}:`, error);
            }
        );
    }

    private initializeChart() {
        this.chart = new RadCartesianChart();

        let lineSeries = new LineSeries();
        lineSeries.items = this.chartData;
        lineSeries.categoryProperty = "category";
        lineSeries.valueProperty = "value";

        let dateTimeAxis = new DateTimeContinuousAxis();
        dateTimeAxis.dateFormat = "dd/MM";
        dateTimeAxis.verticalLocation = ChartAxisVerticalLocation.Bottom;

        let linearAxis = new LinearAxis();
        linearAxis.horizontalLocation = ChartAxisHorizontalLocation.Left;

        this.chart.series.push(lineSeries);
        this.chart.horizontalAxis = dateTimeAxis;
        this.chart.verticalAxis = linearAxis;

        this.chartContainer.nativeElement = this.chart;
    }

    changeTimePeriod(timePeriod: string) {
        const sensorId = this.sensor.sensorId;
        if (sensorId) {
            this.loadChartData(sensorId, timePeriod);
        }
    }
    private filterMeasurementsForPeriod(measurements: Measurement[], period: string): Measurement[] {
        let filteredMeasurements: Measurement[] = [];
        const now = new Date();

        measurements.forEach(measurement => {
            const measurementDate = new Date(measurement.timestamp);

            switch(period) {
                case '24Hours':
                    if (this.isWithinLast24Hours(measurementDate, now)) {
                        filteredMeasurements.push(measurement);
                    }
                    break;
                case '7Days':
                    if (this.isWithinLast7Days(measurementDate, now)) {
                        filteredMeasurements.push(measurement);
                    }
                    break;
                case '30Days':
                    if (this.isWithinLast30Days(measurementDate, now)) {
                        filteredMeasurements.push(measurement);
                    }
                    break;
            }
        });

        return filteredMeasurements;
    }
    private isWithinLast7Days(measurementDate: Date, currentDate: Date): boolean {
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        return (currentDate.getTime() - measurementDate.getTime()) < sevenDays;
    }
    private isWithinLast30Days(measurementDate: Date, currentDate: Date): boolean {
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        return (currentDate.getTime() - measurementDate.getTime()) < thirtyDays;
    }
    private isWithinLast24Hours(measurementDate: Date, currentDate: Date): boolean {
        const oneDay = 24 * 60 * 60 * 1000; //
        return (currentDate.getTime() - measurementDate.getTime()) < oneDay;
    }
}
//---------------------------------------------------