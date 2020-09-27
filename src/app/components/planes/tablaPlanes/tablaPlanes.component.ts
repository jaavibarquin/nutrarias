import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { PlanI } from '../../../shared/models/planes.interface';
import { PlanService } from '../plan.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalPlanesComponent } from '../../../shared/modalPlanes/modalPlanes.component';
@Component({
  selector: 'app-tablaPlanes',
  templateUrl: './tablaPlanes.component.html',
  styleUrls: ['./tablaPlanes.component.css'],
})
export class TablaPlanesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'uid',
    'nombre',
    'subtitulo',
    'precio',
    'descripcion',
    'area',
    'tipo',
    'acciones',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private planSvc: PlanService, public dialog: MatDialog) {}
  ngOnInit() {
    this.planSvc
      .getAllPlanes()
      .subscribe((planes) => (this.dataSource.data = planes));
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if ((this, this.dataSource.paginator)) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeletePlan(plan: PlanI) {
    Swal.fire({
      title:
        '¿Estás seguro de que deseas borrar el plan: \n ' + plan.nombre + ' ?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, eliminar plan!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.planSvc.deletePlanById(plan).then(() => {
          Swal.fire(
            '¡Eliminado!',
            'El plan ha sido eliminado correctamente.',
            'success'
          ).catch((error) => {
            Swal.fire(
              '¡Error!',
              'El plan no se ha podido eliminar correctamente, vuelve a intentarlo. \n' +
                error,
              'error'
            );
          });
        });
      }
    });
  }
  onEditPlan(plan: PlanI) {
    this.openDialog(plan);
  }
  onNewPlan() {
    this.openDialog();
  }

  openDialog(plan?: PlanI): void {
    const config = {
      data: {
        message: plan ? 'Editar Plan ' : 'Crear Plan',
        content: plan,
      },
    };

    const dialogRef = this.dialog.open(ModalPlanesComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog Result Planes ${result}`);
    });
  }
  onCloseAll() {}
}
