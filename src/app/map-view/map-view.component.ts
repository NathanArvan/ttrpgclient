import { Component, OnInit } from '@angular/core';
import { MapServiceService } from '../services/map-service.service';
import { ActivatedRoute } from '@angular/router';
import { Map } from '../models/map';
import { Token } from '../models/token';
import { CommonModule } from '@angular/common';

export interface MapCell {
  token: Token | null
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit{
  public map!: Map;
  public mapMatrix: MapCell[][] = [];

  constructor(
    private mapService: MapServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      const mapId = url[url.length -1];
      this.mapService.getMap((parseInt(mapId.toString()))).subscribe(map => {
        this.map = map;
        this.generateMapMatrix()
      })
    })
  }

  generateMapMatrix() {
    this.mapMatrix = new Array(this.map.length);
    for(let i =0; i < this.map.length; i++ ) {
      this.mapMatrix[i] = new Array(this.map.width);
      for(let j = 0; j < this.map.width; j++) {
        this.mapMatrix[i][j] = {token: null}
      }
    }
    this.map.tokens.forEach(token => {
      console.log(token, this.mapMatrix);
      console.log(this.mapMatrix[token.xPosition]);
      this.mapMatrix[token.xPosition][token.yPosition].token = token; 
    })
  }
}
