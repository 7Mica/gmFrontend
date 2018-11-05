import { Component, OnInit } from "@angular/core";
import { EventoService, SharedService } from "src/app/services/service.index";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { EventocuComponent } from "./eventocu.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-eventos",
  templateUrl: "./eventos.component.html",
  styleUrls: ["./eventos.component.css"]
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];
  modalRef: BsModalRef;
  menuActivado = false;
  evento = false;
  url = ['/eventos'];
  constructor(
    private _eventoService: EventoService,
    private modalService: BsModalService,
    private router: Router,
  ) {
    if(this.router.url === '/eventos') { this.menuActivado = true;}
    
    this.listaEventos();
    
  }

  displayCounter(count) {
    
    this.url = count.router.url.split('/');
}

  displayDesactivate(some){

    if(some.router.url === '/eventos'){
      this.menuActivado = true;
    }
    this.url = some.router.url.split('/');
    
  }

  ngOnInit() {}

  openModal() {
    let modalRef = this.modalService.show(EventocuComponent, {
      class: "modal-lg",
      initialState: {
        title: "Crear nuevo evento",
        data: {}
      }
    });

    modalRef.content.action.take(1).subscribe(() => {
      this.eventos = [];
      this.listaEventos();
    });
  }

  listaEventos() {
    this._eventoService.getEventos().subscribe(
      (res: any) => {
        res.data.forEach(element => {
          this.eventos.push(element);
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
