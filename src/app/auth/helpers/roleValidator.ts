import { UserI } from '../../shared/models/user.interface';

export class RoleValidator {
  isSuscriptor(user: UserI): boolean {
    return user.role == 'SUSCRIPTOR';
  }

  isEditor(user: UserI): boolean {
    return user.role == 'EDITOR';
  }

  isAdmin(user: UserI): boolean {
    return user.role == 'ADMIN';
  }
}
