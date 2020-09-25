import { Timestamp } from 'rxjs/internal/operators/timestamp';

export type Roles = 'BASICO' | 'SUSCRIPTOR' | 'EDITOR' | 'ADMIN';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  password?: string;
  role?: Roles;
  phoneNumber?: string;
  nombre?: string;
  apellido1?: string;
  apellido2?: string;
  dateOfBirth?: Date;
}
