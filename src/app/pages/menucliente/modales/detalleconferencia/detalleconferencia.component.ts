import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalleconferencia',
  templateUrl: './detalleconferencia.component.html',
  styleUrls: ['./detalleconferencia.component.css']
})
export class DetalleconferenciaComponent implements OnInit {

  public graficos: any = {
    'grafico1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'El pan se come con'
    }};

  constructor() { }

  ngOnInit() {
  }

}
