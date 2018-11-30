import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  titulo: string;
  // Title agregar titulo a la pagina
  constructor(private router: Router, private title: Title) {
    this.getDataRoute().subscribe(event => {
      console.log(event);
      this.titulo = event.titulo;
      // Agregar titulo de la pagina
      this.title.setTitle(this.titulo);
    });

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
}
