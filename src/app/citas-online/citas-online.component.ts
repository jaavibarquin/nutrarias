import { Component,Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CitasOnlineService } from '../services/citas-online.service';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { CitaI } from '../shared/models/citas.interface';
import { ClienteI } from '../shared/models/cliente.interface';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-citas-online',
  templateUrl: './citas-online.component.html',
  styleUrls: ['./citas-online.component.css'],
  providers: [
    {
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true },
    },
  ],
})
  
export class CitasOnlineComponent implements OnInit {
  clienteForm : FormGroup;
  minDate: Date | null; 
  maxDate: Date | null; 

  dateSelected: Date | null;
  previousDateSelected: Date | null;
  listaCitas: CitaI[];
  cliente: ClienteI | null;

  area: string | null;
  areaString: string | null;
  fechaSeleccionada: string | null;
  fechaNormalizada: string | null;
  citaSeleccionada: CitaI | null;

  

  constructor(@Inject(LOCALE_ID) private locale: string, private citasOnlineSvc: CitasOnlineService, private formBuilder: FormBuilder) { 
    
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 3, this.minDate.getDate());
    this.area = "NUTR";
  }


  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('(6|7)*([0-9]*){8}')]],
      email: ['', [Validators.required, Validators.email]]
    })
    this.listaCitas = [];
  }
  ngDoCheck(): void {
    if (this.previousDateSelected != this.dateSelected && this.area!="XXXX") { 
      this.previousDateSelected = this.dateSelected;
      this.fechaSeleccionada = formatDate(this.dateSelected, "yyyy-MM-dd", this.locale);
      this.citasOnlineSvc.getCitasLibresDia(this.area, this.fechaSeleccionada)
        .subscribe(
          data => { this.listaCitas = data; });
      
      this.fechaNormalizada = formatDate(this.dateSelected, "dd-MM-yyyy", this.locale);
      this.convierteArea(this.area);
    }
  }

  getCita() {
    this.citasOnlineSvc.getCita(this.area, this.fechaSeleccionada, "10:00:00");
  }

  seleccionaHora(cita: CitaI): void {
    this.citaSeleccionada = cita;
  }

  getErrorEmail() {
    if (this.clienteForm.get("email").hasError('required')) {
      return 'Debes introducir un email';
    }
    return this.clienteForm.get('email') ? 'No es un email válido' : '';
  }

  existenCitas() {
    return this.listaCitas.length > 0;
  }

  convierteArea(area: string) {
    if (area == "ENTR") {
      this.areaString = 'ENTRENAMIENTO';
    } else if (area == "PSIC") {
      this.areaString = 'PSICOLOGÍA';
    } else if (area == "NUTR") {
      this.areaString = 'NUTRICIÓN';
    }
  }

  onReservaCita(data: ClienteI) {
    if (this.clienteForm.valid) {
      this.cliente = data;
      this.citaSeleccionada.cliente = this.cliente;
      this.citasOnlineSvc.putCita(this.citaSeleccionada).subscribe(data => {
        console.log(data);
      });
    }
  }

  




}
