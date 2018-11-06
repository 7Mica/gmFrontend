import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventoService } from "src/app/services/service.index";

@Component({
  selector: "app-menucliente",
  templateUrl: "./menucliente.component.html",
  styleUrls: ["./menucliente.component.css"]
})
export class MenuclienteComponent implements OnInit {
  
  private sub: any;

  private parentRouteId: number;

  private existe = false;

  constructor(public activatedRoute: ActivatedRoute, private eventoService: EventoService, public router: Router) {

    console.log(this.activatedRoute.snapshot.params);
    this.eventoService.getEventoById(this.activatedRoute.snapshot.params.idevento).subscribe((res: any) => {
      
      if(res.data === null || res.ok === false ){
        this.router.navigate(['/eventos']);
      }else{
        
        this.existe = true;
      }
      
    }, error =>{
      
      this.router.navigate(['/eventos']);
      
    });
  }

  
  ngOnInit() {
    
    
    
    
  }
}
