import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { ConferenciaService } from "src/app/services/service.index";
import { ConferenciacuComponent } from "./conferenciacu/conferenciacu.component";
import { DetalleconferenciaComponent } from "../modales/detalleconferencia/detalleconferencia.component";

@Component({
  selector: "app-conferencias",
  templateUrl: "./conferencias.component.html",
  styleUrls: ["./conferencias.component.css"]
})
export class ConferenciasComponent implements OnInit {
  conferencias: any[] = [];
  modalRef: BsModalRef;
  menuActivado = false;
  
  constructor(
    private conferenciaService: ConferenciaService,
    private modalService: BsModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.listaConferencias();
  }

  ngOnInit() {}

  openModal() {
    let evento = this.activatedRoute.snapshot.params.idevento;
    console.log(evento);
    let modalRef = this.modalService.show(ConferenciacuComponent, {
      class: "modal-xl",
      initialState: {
        title: "Crear nueva conferencia",
        data: evento

      }
    });

    modalRef.content.action.take(1).subscribe(() => {
      this.conferencias = [];
      this.listaConferencias();
    });
  }

  listaConferencias() {
    let conferenciaid = this.activatedRoute.snapshot.params.idevento;
    this.conferenciaService.getConferencias(conferenciaid).subscribe(
      (res: any) => {
        console.log(res);
        
        res.conferencias.forEach(element => {
          this.conferencias.push(element);
        });
      },
      error => {
        console.log(error);
      }
    );
  }


  openDetalleConferencia(idconferencia){
    console.log(idconferencia);
    
    let modalRef = this.modalService.show(DetalleconferenciaComponent, {
      class: "modal-lg",
      initialState: {
        title: "Detalle conferencia",
        idconferencia: idconferencia
      }
    });

    
  }
}
