import { Component,Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CitasOnlineService } from '../services/citas-online.service';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';

import { CitaI } from '../shared/models/citas.interface';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-citas-online',
  templateUrl: './citas-online.component.html',
  styleUrls: ['./citas-online.component.css']
})
  
export class CitasOnlineComponent implements OnInit {
  clienteForm = new FormGroup({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
  });
  minDate: Date | null; 
  maxDate: Date | null; 

  dateSelected: Date | null;
  previousDateSelected: Date | null;
  listaCitas: CitaI[];

  areaString: string | null;
  fechaSeleccionada: string | null;
  fechaNormalizada: string | null;
  citaSeleccionada: CitaI | null;

  

  constructor(@Inject(LOCALE_ID) private locale: string, private citasOnlineSvc: CitasOnlineService) { 
    this.dateSelected = new Date();
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 3, this.minDate.getDate());
    this.areaString = "XXXX";
  }


  filtroFechas = (d: Date | null): boolean => {    
    const day = (d || new Date()).getDay();
    // Previene seleccionar sabados y domingos 
    return day !== 5 && day !== 6 ;
  }

  ngOnInit(): void {
    this.listaCitas = [];
  }
  ngDoCheck(): void {
    if (this.previousDateSelected != this.dateSelected && this.areaString!="XXXX") { 
      this.previousDateSelected = this.dateSelected;
      this.fechaSeleccionada = formatDate(this.dateSelected, "yyyy-MM-dd", this.locale);
      this.citasOnlineSvc.getCitasLibresDia(this.areaString, this.fechaSeleccionada)
        .subscribe(
          data => { this.listaCitas = data; });
      this.fechaNormalizada = formatDate(this.dateSelected, "dd-MM-yyyy", this.locale);
    }
  }

  getCita() {
    this.citasOnlineSvc.getCita(this.areaString, this.fechaSeleccionada, "10:00:00");
  }

  seleccionaHora(cita: CitaI): void {
    this.citaSeleccionada = cita;
  }




  




}
