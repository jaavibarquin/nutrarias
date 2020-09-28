import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanI } from '../../../shared/models/planes.interface';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.css'],
})
export class NewPlanComponent implements OnInit {
  constructor(private planSvc: PlanService) {}
  public newPlanForm = new FormGroup({
    uid: new FormControl('', Validators.required),
    priceId: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    subtitulo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
  });

  ngOnInit() {}

  addNewPlan(data: PlanI) {
    this.planSvc.createPlan(data);
  }
}
