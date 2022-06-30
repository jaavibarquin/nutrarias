import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanI } from '../../../shared/models/planes.interface';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css'],
})
export class EditPlanComponent implements OnInit {
  @Input() plan: PlanI;
  constructor(private planSvc: PlanService) { }

  public editPlanForm = new FormGroup({
    uid: new FormControl('', Validators.required),
    priceId: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    subtitulo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
  });

  ngOnInit() {
    this.initValuesForm();
  }

  editPlan(plan: PlanI) {
    this.planSvc.editPlanById(plan);
  }
  private initValuesForm(): void {
    this.editPlanForm.patchValue({
      uid: this.plan.uid,
      priceId: this.plan.priceId,
      area: this.plan.area,
      tipo: this.plan.tipo,
      nombre: this.plan.nombre,
      subtitulo: this.plan.subtitulo,
      precio: this.plan.precio,
      descripcion: this.plan.descripcion,
    });
  }
}
