import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, RouterEvent, ActivationEnd } from '@angular/router';
import { SharedService } from 'src/app/services/service.index';
import { filter,map } from 'rxjs/operators';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnInit {

  id: any = '';
  asder: any[] = [];  
 
  constructor( private routeActivated: ActivatedRoute, private router: Router, private sharedService: SharedService) {
    
    this.asder = [];
    // this.getDataRoute().subscribe(evento =>{
    //   evento.url.forEach(item => {

    //     this.asder.push(item.path);
    //   })
    // }, error =>{
      
    // });



    console.log(this.getDataRoute());
    
   }

   getDataRoute(){
    // return this.router.events.pipe(
    //   filter( evento => evento instanceof ActivationEnd),
    //   filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
    //   map((evento: ActivationEnd) => evento.snapshot));


      return this.routeActivated.firstChild;
   }

  ngOnInit() {

    this.routeActivated.firstChild.params.subscribe(param => {
      console.log(param);
      this.id = param.idevento;
    }, error=>{});


   
  }
  ngOnDestroy(){

  }

  

}
