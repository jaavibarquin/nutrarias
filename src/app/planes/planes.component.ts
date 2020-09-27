import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/components/planes/plan.service';
import { PlanI } from 'src/app/shared/models/planes.interface';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css'],
})
export class PlanesComponent implements OnInit {
  public planes$: Observable<PlanI[]>;
  constructor(
    private planSvc: PlanService,
    private pageScrollSvc: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this.pageScrollSvc.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });
    this.planes$ = this.planSvc.getAllPlanes();
  }
}
