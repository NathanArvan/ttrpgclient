import { Component, OnInit } from '@angular/core';
import { MapServiceService } from '../services/map-service.service';
import { ActivatedRoute } from '@angular/router';
import { Map } from '../models/map';
import { Token } from '../models/token';
import { CommonModule } from '@angular/common';
import { TokenService } from '../services/token.service';
import { File } from '../models/file';

export interface MapCell {
  token: Token | null
  image: string | null;
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
    private tokenService: TokenService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      const mapId = url[url.length -1];
      this.mapService.getMap((parseInt(mapId.toString()))).subscribe(map => {
        this.map = map;
        this.tokenService.getTokensWithImages().subscribe(tokens => {
          this.map.tokens = tokens;
          this.generateMapMatrix();
        })
      })
    })

  }

  generateMapMatrix() {
    this.mapMatrix = new Array(this.map.length);
    for(let i =0; i < this.map.length; i++ ) {
      this.mapMatrix[i] = new Array(this.map.width);
      for(let j = 0; j < this.map.width; j++) {
        this.mapMatrix[i][j] = {token: null, image: null}
      }
    }
    this.map.tokens.forEach(token => {
      
      this.mapMatrix[token.xPosition][token.yPosition].token = token; 
      if (token.image) {
        var src = 'data:image/jpeg;base64,'+ token.image.fileContents;
        this.mapMatrix[token.xPosition][token.yPosition].image = src;
      }
    })
  }

  // readImage(image: File) {
  //   var reader = new FileReader();
  //   var buffer = Buffer.from(image.fileContents, 'base64');// atob(image.fileContents);
  //   reader.r(buffer)
  // }
}
