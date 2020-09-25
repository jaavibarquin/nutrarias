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
  constructor(private planSvc: PlanService) {}

  ngOnInit() {}
}
