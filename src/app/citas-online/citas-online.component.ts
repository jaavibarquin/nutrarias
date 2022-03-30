import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas-online',
  templateUrl: './citas-online.component.html',
  styleUrls: ['./citas-online.component.css']
})
  
export class CitasOnlineComponent implements OnInit {
  minDate: Date | null; 
  maxDate: Date | null; 

  navidad: Date | null;
  selected: Date | null;
  constructor() { 
    this.selected = new Date();
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth()+2, this.minDate.getDate());
  }


  filtroFechas = (d: Date | null): boolean => {    
    const day = (d || new Date()).getDay();
    // Previene seleccionar sabados y domingos 
    return day !== 5 && day !== 6 ;
  }
  ngOnInit(): void {
  }
  




}
