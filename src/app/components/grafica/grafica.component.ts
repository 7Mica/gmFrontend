import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
@Input('data') data: number[];
@Input('labels') labels: string[];
@Input('leyenda') leyenda: string = 'Algo';
@Input('charType') type: string[];

  constructor() { 
    console.log(this.leyenda);
  }

  ngOnInit() {
  }

}
