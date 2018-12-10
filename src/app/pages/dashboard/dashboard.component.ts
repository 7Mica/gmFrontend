import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/service.index';
import { StatsService } from 'src/app/services/stats/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  // Pie
  public pieChartLabels: string[] = ['Asistentes', 'Staff', 'Ponentes'];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';

  public pieEntidadesLabels: string[] = ['Eventos', 'Conferencias', 'Marcas'];
  public entidades: number[] = [];

  titulo: string;
  // Title agregar titulo a la pagina
  constructor(private router: Router, private title: Title, private statsService: StatsService) {
    this.getDataRoute().subscribe(event => {
      // console.log(event);
      this.titulo = event.titulo;
      // Agregar titulo de la pagina
      this.title.setTitle(this.titulo);
    });

    this.getUsuariosTotalesEvento();

  }

  ngOnInit() {
  }

  getDataRoute() {

    return this.router.events.pipe(
      filter((data) => data instanceof ActivationEnd),
      filter((data: ActivationEnd) => data.snapshot.firstChild === null),
      map((data: ActivationEnd) => {
        return data.snapshot.data;
      })
    );

  }

  /************
   * NGCHARTS *
   ************/

  getUsuariosTotalesEvento() {
    this.statsService.usuariosPorEventoStats().subscribe(
      (res: any) => {

        this.pieChartData.push((res.total.usuarios.asistentes));
        this.pieChartData.push(res.total.usuarios.staff);
        this.pieChartData.push(res.total.usuarios.ponentes);

        this.entidades.push(res.total.entidades.eventos);
        this.entidades.push(res.total.entidades.conferencias);
        this.entidades.push(res.total.entidades.marcas);



      },
      error => {
        console.log(error);

      }
    );
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
