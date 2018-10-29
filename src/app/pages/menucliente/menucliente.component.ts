import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharedService } from "src/app/services/service.index";

@Component({
  selector: "app-menucliente",
  templateUrl: "./menucliente.component.html",
  styleUrls: ["./menucliente.component.css"]
})
export class MenuclienteComponent implements OnInit {
  private sub: any;

  private parentRouteId: number;

  constructor(public route: ActivatedRoute, private sharedService: SharedService) {
  
  }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      console.log(params);
    });
  }
}
