//sensor.model.ts Inhalt:

export interface Sensor {
    sensorId: number;
    name: string;
    location: string;
    active: boolean;
    type: SensorType;
  }
  
  export enum SensorType {
    OUTDOOR,
    INDOOR,
    WATER
  }
  //---------------------------------------------------