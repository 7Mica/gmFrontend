import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MouseEvent, GoogleMapsAPIWrapper } from "@agm/core";
import { EventoService } from "src/app/services/service.index";

@Component({
  selector: "app-mapas",
  templateUrl: "./mapas.component.html",
  styleUrls: ["./mapas.component.css"]
})
export class MapasComponent implements OnInit {
  lat: number;
  lng: number;
  zoom: number = 12;
  idevento: any;

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private eventoService: EventoService) {
      this.idevento = this.activatedRoute.snapshot.params.idevento;
      this.getMapa();
    
    }

  ngOnInit() {
    
  }

 

  mapClicked(event: MouseEvent) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  guardarMapa() {
    this.eventoService.newLocation(this.idevento, {lat: this.lat, lng: this.lng}).subscribe(res=>{
      console.log(res);
      
    }, error => {
      console.log(error);
      
    })
    
  }

  getMapa(){

    this.eventoService.getLocation(this.idevento).subscribe((res: any) => {
      if(!res.evento.mapa){
        this.lat = 51.673858;
        this.lng = 7.815982;

      }else{
        this.lat =  parseFloat(res.evento.mapa.latitude);
        this.lng = parseFloat(res.evento.mapa.longitude);
      }
      
      
    }, error => {
      console.log(error);
      
    });

  }
}
