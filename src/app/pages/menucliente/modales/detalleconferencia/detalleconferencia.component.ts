import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConferenciaService, EventoService } from 'src/app/services/service.index';
import { Observable, Observer } from 'rxjs';
import { SWALCONFIG_CONFIRMDELETE, SWALCONFIG_TOAST } from 'src/app/config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalleconferencia',
  templateUrl: './detalleconferencia.component.html',
  styleUrls: ['./detalleconferencia.component.css']
})
export class DetalleconferenciaComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  conferencia: any = {};
  ponente: any = {};
  marca: any;
  data: any;
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  watcher: Observable<String>;

  barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType = 'bar';
  barChartLegend = true;

  constructor(public modalRef: BsModalRef,
    public modalService: BsModalService,
    private conferenciaService: ConferenciaService,
    private eventoService: EventoService) {

    this.data = this.modalService.config.initialState;


    this.conferenciaService.getConferenciaById(this.data.idconferencia).subscribe((res: any) => {

      this.conferencia = res.conferencias[0];
      this.ponente = this.conferencia.ponente;

    },
      _error => {

      });

      this.getMarca(this.data.marca);

  }

  ngOnInit() {

  }


  getMarca(idmarca) {
    this.eventoService.getMarcaById(idmarca).subscribe((res: any) => {
      this.marca = res.data.marcas[0];

    }, _error => {

    });
  }

  borrarConferencia(conferencia) {
    swal(SWALCONFIG_CONFIRMDELETE)
    .then(res => {
      if (res.value) {
        console.log('Conferencia borrada');
        this.conferenciaService.eliminarConferencia(conferencia).subscribe(
          _res => {
            // tslint:disable-next-line:prefer-const
            let toast: any = SWALCONFIG_TOAST;
            swal(toast);
            this.modalRef.hide();
            this.action.emit();
          },

          _error => {
            // tslint:disable-next-line:prefer-const
            let toast: any = SWALCONFIG_TOAST;
            toast.titulo = 'Algo salió mal en la petición';
            toast.type = 'error';
            swal(toast);
          }
        );

      } else {

      }
    })
    .catch(error => {
      console.log(error);

    });

  }

  /************
   * GRAFICOS *
   ************/

  // tslint:disable-next-line:member-ordering
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
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
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
