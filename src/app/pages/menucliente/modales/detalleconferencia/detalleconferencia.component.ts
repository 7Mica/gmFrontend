import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConferenciaService, EventoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-detalleconferencia',
  templateUrl: './detalleconferencia.component.html',
  styleUrls: ['./detalleconferencia.component.css']
})
export class DetalleconferenciaComponent implements OnInit {

  conferencia: any;
  ponente: any;
  marca: any;

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;

  constructor(public modalRef: BsModalRef,
    public modalService: BsModalService,
    private conferenciaService: ConferenciaService,
    private eventoService: EventoService) {

      this.conferencia = {};
      this.ponente = {};
      this.marca = {};
    let eas: any = this.modalService.config.initialState;

    

      this.conferenciaService.getConferenciaById(eas.idconferencia).subscribe((res:any)=> {
        this.conferencia = res.conferencias[0];
        this.ponente = this.conferencia.ponente;
        
      },
      error=>{
  
      });  
      
      this.getMarca(eas.marca);
      
  }

  ngOnInit() {
  }

  getMarca(idmarca) {
    this.eventoService.getMarcaById(idmarca).subscribe((res: any) => {
      
      
      this.marca = res.data.marcas[0];
      console.log(res);
      
    }, error => {
      
    });
        
    
  }

  /************
   * GRAFICOS *
   ************/

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }


}
