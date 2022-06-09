import { Component,Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CitasOnlineService } from '../services/citas-online.service';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';

import { CitaI } from '../shared/models/citas.interface';
@Component({
  selector: 'app-citas-online',
  templateUrl: './citas-online.component.html',
  styleUrls: ['./citas-online.component.css']
})
  
export class CitasOnlineComponent implements OnInit {
  minDate: Date | null; 
  maxDate: Date | null; 

  dateSelected: Date | null;
  previousDateSelected: Date | null;
  listaCitas: CitaI[];

  areaString: string | null;
  fechaSeleccionada: string | null;
  cita: CitaI | null;
  fontStyle?: string;
  public citas: CitaI[]= [];

  

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
    }
  }

  getCita() {
    this.citasOnlineSvc.getCita(this.areaString, this.fechaSeleccionada, "10:00:00");
  }

  getCitas() {
    return [
      {
        "idcita": "N2022-07-11T09:30:00",
        "fullfecha": "2022-07-11T09:30:00",
        "fecha": "2022-07-11",
        "hora": "09:30",
        "cliente": null,
        "disponible": true
    },
    {
        "idcita": "N2022-07-11T10:00:00",
        "fullfecha": "2022-07-11T10:00:00",
        "fecha": "2022-07-11",
        "hora": "10:00",
        "cliente": null,
        "disponible": true
    },
    {
    "idcita": "N2022-08-22T10:00:00",
    "fullfecha": "2022-08-22T10:00:00",
    "fecha": "2022-08-22",
    "hora": "10:00",
    "cliente": {
        "telefono": "678000111",
        "email": "lucialopez@gmail.com",
        "nombre": "Lucia",
        "apellidos": "Lopez Gómez"
    },
    "disponible": false
      }
    ]
  }



  




}
