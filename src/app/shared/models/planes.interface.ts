export type TIPOS = 'SENCILLO' | 'TRIMESTRAL' | 'ONLINE' | 'DOMICILIO';
export type AREAS = 'nutricion' | 'entrenamiento' | 'psicologia';

export interface PlanI {
  priceId?: string;
  uid: string;
  area: string;
  tipo: string;
  nombre: string;
  subtitulo: string;
  precio: number;
  descripcion?: string;
}
