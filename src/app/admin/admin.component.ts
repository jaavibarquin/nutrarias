import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/services/plan.service';
import { PlanI } from 'src/app/shared/models/planes.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
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

  constructor(private router: Router, private planSvc: PlanService) { }
}
