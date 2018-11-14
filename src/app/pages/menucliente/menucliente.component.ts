import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventoService, UsuarioService } from "src/app/services/service.index";
import swal from "sweetalert2";

@Component({
  selector: "app-menucliente",
  templateUrl: "./menucliente.component.html",
  styleUrls: ["./menucliente.component.css"]
})
export class MenuclienteComponent implements OnInit {
  sub: any;

  parentRouteId: number;

  existe: boolean = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    private eventoService: EventoService,
    public router: Router,
    private usuarioService: UsuarioService
  ) {
    console.log(this.activatedRoute.snapshot.params);
    this.eventoService
      .getEventoById(this.activatedRoute.snapshot.params.idevento)
      .subscribe(
        (res: any) => {
          if (res.data === null || res.ok === false) {
            this.router.navigate(["/eventos"]);
          } else {
            this.existe = true;
          }
        },
        error => {
          this.router.navigate(["/eventos"]);
        }
      );
  }

  ngOnInit() {}

  queEs(){
    if(this.usuarioService.tipoLogin()===false){
      return false;
    }else{
      return true;
    }

    
  }

  eliminarEvento() {
    swal({
      title: "¿Estás seguro?",
      text: "Se eliminará permamentemente el evento",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, Cancelar"
    }).then(result => {
      if (result.value) {
        this.eventoService.removeEvento(this.activatedRoute.snapshot.params.idevento).subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/eventos']);

            swal("Evento eliminado", "Petición correcta", "success");
          },
          error => {
            swal("Error", "Ocurrío algo en la petición", "error");
          }
        );
      } else if (result.dismiss === swal.DismissReason.cancel) {
        //boton cancelar presionado
      }
    });
  }
}
