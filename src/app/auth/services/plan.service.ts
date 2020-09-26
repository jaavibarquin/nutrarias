import { PlanI } from 'src/app/shared/models/planes.interface';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { switchMap } from 'rxjs/operators';
import { RoleValidator } from '../helpers/roleValidator';
import { Plan } from '../../shared/models/plan.model';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class PlanService extends RoleValidator {
  public user$: Observable<User>;
  private planesCollection: AngularFirestoreCollection<PlanI>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.planesCollection = afs.collection<PlanI>('planes');
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async nuevoPlan(
    uid: string,
    area: string,
    tipo: string,
    nombre: string,
    subtitulo: string,
    precio: number,
    descripcion: string
  ): Promise<PlanI> {
    const plan = new Plan();
    try {
      const planRef: AngularFirestoreDocument<PlanI> = this.afs.doc(
        `planes/${uid}`
      );
      const data: Plan = {
        uid: uid,
        area: area,
        tipo: tipo,
        nombre: nombre,
        subtitulo: subtitulo,
        precio: precio,
        descripcion: descripcion,
      };
      planRef.set(data, { merge: true });
      return plan;
    } catch (error) {
      window.alert(error);
    }
  }
  getPlanes() {
    return this.afs.collection('planes').snapshotChanges();
  }
  createPlan(plan: PlanI) {
    return this.afs.collection('planes').add(plan);
  }
  updatePlan(plan: PlanI) {
    delete plan.uid;
    this.afs.doc('planes/' + plan.uid).update(plan);
  }

  public getAllPlanes(): Observable<PlanI[]> {
    return this.afs
      .collection('planes')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as PlanI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
  public getOnePlan(idPlan: PlanI): Observable<PlanI> {
    return this.afs.doc<PlanI>(`planes/${idPlan}`).valueChanges();
  }
  deletePlanById(plan: PlanI) {
    return this.planesCollection.doc(plan.uid).delete();
  }
  editPlanById(plan: PlanI) {
    return this.planesCollection.doc(plan.uid).update(plan);
  }
}
