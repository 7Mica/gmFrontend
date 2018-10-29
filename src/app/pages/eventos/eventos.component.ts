import { Component, OnInit } from "@angular/core";
import { EventoService } from "src/app/services/service.index";
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

  constructor(
    private _eventoService: EventoService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.listaEventos();
  }

  ngOnInit() {}

  abrirSubMenu(id) {
    this.router.navigate(['/subevento/'+id]);
  }

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
