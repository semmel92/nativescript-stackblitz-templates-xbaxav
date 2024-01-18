//sensor.model.ts Inhalt:

import { Measurement} from "~/app/Models/measurement.model";

export interface Sensor {
    sensorId: number;
    name: string;
    location: string;
    active: boolean;
    type: SensorType;
    measurements: Measurement[];
}
  
  export enum SensorType {
    OUTDOOR,
    INDOOR,
    WATER
  }
  //---------------------------------------------------