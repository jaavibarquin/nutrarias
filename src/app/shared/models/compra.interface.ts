import { UserI } from './user.interface';
import { PlanI } from './planes.interface';
export interface CompraI {
  id: string;
  user: UserI;
  productos: PlanI[];
  fecha: Date;
  importe: number;
}
