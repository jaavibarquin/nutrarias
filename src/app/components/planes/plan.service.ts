import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { UserI } from '../../shared/models/user.interface';
import { switchMap } from 'rxjs/operators';
import { RoleValidator } from '../../auth/helpers/roleValidator';
import { PlanI } from '../../shared/models/planes.interface';
import { Plan } from '../../shared/models/plan.model';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class PlanService extends RoleValidator {
  public user$: Observable<UserI>;
  private planesCollection: AngularFirestoreCollection<PlanI>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.planesCollection = afs.collection<PlanI>('planes');
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<UserI>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }
  public createPlan(plan: PlanI) {
    return this.planesCollection.doc(plan.uid).set(plan, { merge: true });
  }

  updatePlan(plan: PlanI) {
    this.planesCollection.doc(plan.uid).update(plan);
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
  public getOnePlan(id: string): Observable<PlanI> {
    return this.afs.doc<PlanI>(`planes/${id}`).valueChanges();
  }
  deletePlanById(plan: PlanI) {
    return this.planesCollection.doc(plan.uid).delete();
  }
  editPlanById(plan: PlanI) {
    return this.planesCollection.doc(plan.uid).update(plan);
  }
}
