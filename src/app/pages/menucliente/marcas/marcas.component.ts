import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { EventoService } from "src/app/services/service.index";
import { MarcascuComponent } from "./marcascu/marcascu.component";

@Component({
  selector: "app-marcas",
  templateUrl: "./marcas.component.html",
  styleUrls: ["./marcas.component.css"]
})
export class MarcasComponent implements OnInit {
  
  marcas: any[] = [];
  modalRef: BsModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private eventoService: EventoService
  ) {

    this.listaMarcas();
    console.log(this.marcas);
    
  }

  ngOnInit() {}

  openModal() {
    let evento = this.activatedRoute.snapshot.params.idevento;
    


    let modalRef = this.modalService.show(MarcascuComponent, {
      class: "modal-xl",
      initialState: {
        title: "Crear nueva marca",
        data: evento

      }
    });

    modalRef.content.action.take(1).subscribe(() => {
      this.marcas = [];
      this.listaMarcas();
    });
  }

  listaMarcas() {
    let idevento = this.activatedRoute.snapshot.params.idevento;
    this.eventoService.getMarcasByEvento(idevento).subscribe(
      (res: any) => {
        console.log(res);
        
        res.data.marcas.forEach(element => {
          this.marcas.push(element);
        });


      },
      error => {
        console.log(error);
      }
    );
  }
}
