import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/components/planes/plan.service';
import { PlanI } from 'src/app/shared/models/planes.interface';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css'],
})
export class PlanesComponent implements OnInit {
  planes: PlanI[];
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
    this.planSvc.getPlanes().subscribe((data) => {
      this.planes = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as PlanI),
        } as PlanI;
      });
    });
  }
}
