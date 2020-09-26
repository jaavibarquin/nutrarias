import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanI } from '../../shared/models/planes.interface';
import { PlanService } from '../../auth/services/plan.service';
@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.css'],
})
export class NewPlanComponent implements OnInit {
  public newPlanForm = new FormGroup({
    uid: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    titulo: new FormControl(''),
    subtitulo: new FormControl(''),
    precio: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
  });
  constructor(private planSvc: PlanService) {}
  ngOnInit() {}

  addNewPlan(data: PlanI) {
    console.log('NewPlan', data);
  }
}
