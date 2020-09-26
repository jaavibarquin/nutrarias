export type TIPOS = 'SENCILLO' | 'TRIMESTRAL' | 'ONLINE' | 'DOMICILIO';
export type AREAS =
  | 'SERVICIO DE NUTRICIÓN'
  | 'SERVICIO DE ENTRENAMIENTO'
  | 'SERVICIO DE PSICOLOGÍA';

export class Plan {
  uid: string;
  area: string;
  tipo: string;
  nombre: string;
  subtitulo: string;
  precio: number;
  descripcion?: string;
}
