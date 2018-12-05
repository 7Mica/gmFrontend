import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import {
  ConferenciaService,
  UsuarioeventoService
} from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { SWALCONFIG_TOAST } from 'src/app/config/config';

@Component({
  selector: 'app-conferenciacu',
  templateUrl: './conferenciacu.component.html',
  styleUrls: ['./conferenciacu.component.css']
})
export class ConferenciacuComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  titulo = '';
  data: any = {};

  forma: FormGroup;
  ponentes: any[] = [];

  constructor(
    public modalRef: BsModalRef,
    public modalService: BsModalService,
    private conferenciaService: ConferenciaService,
    private usuarioeventoService: UsuarioeventoService
  ) {
    this.data = modalService.config.initialState;
    this.getPonentesEvento();
    this.titulo = this.data.title;
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
        Validators.maxLength(255)
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

    if (this.data.idconferencia) {
      this.conferenciaService.getConferenciaById(this.data.idconferencia).subscribe(
        (res: any) => {
          this.forma.get('titulo').setValue(res.conferencias[0].titulo);
          this.forma.get('descripcion').setValue(res.conferencias[0].descripcion);
          this.forma.get('ponente').setValue((res.conferencias[0].ponente) ? res.conferencias[0].ponente._id : null);
          this.forma.get('salon').setValue(res.conferencias[0].salon);
          this.forma.get('hora').setValue(res.conferencias[0].hora);
          this.forma.get('duracion').setValue(res.conferencias[0].duracion);
          this.forma.get('fecha').setValue(res.conferencias[0].fecha);
        },
        (error: any) => {
          const toast = SWALCONFIG_TOAST;
          toast.type = 'error';
          toast.title = 'Ocurrió un error en la petición';
          swal(toast);
        });
    }
  }

  queAccionEs() {
    if (this.data.idconferencia) {
      this.actualizarConferencia(this.data.idconferencia);
    } else {
      this.registrarConferencia();
    }
  }

  actualizarConferencia(idconferencia) {
    if (this.forma.invalid) {
      return;
    }
    const data = this.forma.value;
    data.evento = this.data.idevento;

    this.conferenciaService.updateConferencia(idconferencia, data).subscribe(
      (res: any) => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'success';
        toast.title = 'Se actualizó el registro correctamente';
        this.action.emit();
        this.modalRef.hide();
        swal(toast);
      },
      (error: any) => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Ocurrió un error en la petición';
        swal(toast);
      }
    );

  }

  registrarConferencia() {
    if (this.forma.invalid) {
      return;
    }

    const conferencia = this.forma.value;
    conferencia.evento = this.data.idevento;

    this.conferenciaService.crearConferencia(conferencia).subscribe(
      res => {
        console.log(res);

        // tslint:disable-next-line:prefer-const
        let toast = SWALCONFIG_TOAST;
        toast.title = 'Registro creado correctamente';
        toast.type = 'success';
        swal(toast);
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Ocurrió un error en la petición';
        swal(toast);
      }
    );
  }

  getPonentesEvento() {
    // tslint:disable-next-line:prefer-const

    this.usuarioeventoService.getPonentesPorEvento(this.data.idevento).subscribe(
      (res: any) => {
        this.ponentes = res.data;

      },
      error => {

        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Ocurrió un error en la petición';
        swal(toast);
      }
    );
  }
}
