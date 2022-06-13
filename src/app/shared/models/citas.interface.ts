import { ClienteI } from "./cliente.interface";
export type AreaCita = 'NUTR' | 'PSIC' | 'ENTR';

export interface CitaI{
  idcita: string;
  fullfecha: string;
  fecha: string;
  hora: string;
  area?: AreaCita;
  cliente?: ClienteI;
  disponible?: boolean;
}