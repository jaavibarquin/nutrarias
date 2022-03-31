import { Component, OnInit } from '@angular/core';
import { CitasOnlineService } from '../services/citas-online.service';

import { Citas } from '../shared/models/citas';
@Component({
  selector: 'app-citas-online',
  templateUrl: './citas-online.component.html',
  styleUrls: ['./citas-online.component.css']
})
  
export class CitasOnlineComponent implements OnInit {
  minDate: Date | null; 
  maxDate: Date | null; 

  selected: Date | null;
  previousSelected: Date | null;
  listaCitas: Citas[];
  listaCitasPrueba: Citas[];

  cita: Citas | null;


  

  constructor(private citasOnlineSvc: CitasOnlineService) { 
    this.selected = new Date();
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth()+2, this.minDate.getDate());
  }


  filtroFechas = (d: Date | null): boolean => {    
    const day = (d || new Date()).getDay();
    // Previene seleccionar sabados y domingos 
    return day !== 5 && day !== 6 ;
  }

  ngOnInit(): void {}
  ngDoCheck(): void {

    if (this.previousSelected !== this.selected) { 
      this.citasOnlineSvc.getCitasDia(this.selected).subscribe(
          citas => {
            this.listaCitas = citas;
          }
      );
      this.previousSelected = this.selected;
    }
  }



  




}
