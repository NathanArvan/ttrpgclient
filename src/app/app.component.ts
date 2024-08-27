import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Map } from './models/map';
import { MapService } from './services/map.service';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from "./modules/shared/navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ttrpgClient';
  maps!: Map[]; 

  constructor(
    private mapService: MapService,
    private router: Router
    ) {}
}
