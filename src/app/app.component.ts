import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Map } from './models/map';
import { MapServiceService } from './services/map-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ttrpgClient';
  maps!: Map[]; 

  constructor(
    private mapService: MapServiceService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.mapService.getMaps().subscribe(maps => {
      this.maps = maps;
    })
  }

  mapClicked(mapId: number) {
    this.router.navigate(['maps', mapId])
  }
}
