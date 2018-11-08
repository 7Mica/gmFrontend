import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import {
  ConferenciaService,
  UsuarioeventoService
} from "src/app/services/service.index";
import { Conferencia } from "src/app/models/conferencia.model";

@Component({
  selector: "app-conferenciacu",
  templateUrl: "./conferenciacu.component.html",
  styleUrls: ["./conferenciacu.component.css"]
})
export class ConferenciacuComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  forma: FormGroup;
  ponentes: any[] = [];
  constructor(
    public modalRef: BsModalRef,
    public modalService: BsModalService,
    private conferenciaService: ConferenciaService,
    private usuarioeventoService: UsuarioeventoService
  ) {
    this.getPonentesEvento();
  }

  ngOnInit() {
    this.forma = new FormGroup({
      titulo: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      ponente: new FormControl(null, [
        Validators.required
      ]),
      img: new FormControl(null, []),
      salon: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      hora: new FormControl(null, [Validators.required]),
      duracion: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required])
    });
  }

  registrarEvento() {
    if (this.forma.invalid) {
      return;
    }

    let idevento: any = this.modalService.config.initialState;

    let conferencia = new Conferencia(
      this.forma.value.titulo,
      this.forma.value.hora,
      this.forma.value.salon,
      this.forma.value.descripcion,
      this.forma.value.duracion,
      this.forma.value.ponente,
      this.forma.value.fecha,
      idevento.data
      
    );

    console.log(conferencia);

    this.conferenciaService.crearConferencia(conferencia).subscribe(
      res => {
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        console.log(error);
      }
    );
  }

  getPonentesEvento() {
    let data:any = this.modalService.config.initialState;
    this.usuarioeventoService
      .getPonentesPorEvento(data.data)
      .subscribe(
        (res: any) => {
          res.data.forEach(element => {
            
            this.ponentes.push(element);
          });
          

        },
        error => {}
      );
  }
}
