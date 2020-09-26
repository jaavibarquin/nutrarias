import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/auth/services/plan.service';
import { PlanI } from 'src/app/shared/models/planes.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  planes: PlanI[];
  nuevoPlanForm = new FormGroup({
    uid: new FormControl(''),
    area: new FormControl(''),
    tipo: new FormControl(''),
    nombre: new FormControl(''),
    subtitulo: new FormControl(''),
    precio: new FormControl(''),
    descripcion: new FormControl(''),
  });

  constructor(private router: Router, private planSvc: PlanService) {}

  ngOnInit() {
    this.planSvc.getPlanes().subscribe((data) => {
      this.planes = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as PlanI),
        } as PlanI;
      });
    });
  }

  async onNewPlan() {}

  // async onNewPlan() {
  //   const {
  //     uid,
  //     area,
  //     tipo,
  //     nombre,
  //     subtitulo,
  //     precio,
  //     descripcion,
  //   } = this.nuevoPlanForm.value;
  //   {
  //     try {
  //       const plan = await this.planSvc.nuevoPlan(
  //         uid,
  //         area,
  //         tipo,
  //         nombre,
  //         subtitulo,
  //         precio,
  //         descripcion
  //       );
  //       if (plan) {
  //         window.alert('Se ha añadido el plan nuevo correctamente.');
  //       }
  //     } catch (error) {
  //       window.alert(error);
  //     }
  //   }
  // }
}
