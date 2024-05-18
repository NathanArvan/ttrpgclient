import { Token } from '../../../models/token';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapCell, Map } from '../../../models/map';
import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-grid.component.html',
  styleUrl: './map-grid.component.css'
})
export class MapGridComponent {
  @Input() map: Map = {campaignId: 0, mapId: 0, length: 0, width:0, image: '', tokens: []};
  @Output() tokenPositionChanged: EventEmitter<Token> = new EventEmitter<Token>()
  public mapMatrix: MapCell[][] = [];
  public selectedPosition : {xPosition: number, yPosition: number} | null = null;
  public selectedToken: Token | null = null;
  public showMoveMessage: boolean = false;
  public moveMessage: string | null = null;

  constructor(
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.tokenService.getTokensWithImages().subscribe(tokens => {
      this.map.tokens = tokens;
      this.generateMapMatrix();
    })
  }

  generateMapMatrix() {
    this.mapMatrix = new Array(this.map.length);
    for(let i =0; i < this.map.length; i++ ) {
      this.mapMatrix[i] = new Array(this.map.width);
      for(let j = 0; j < this.map.width; j++) {
        this.mapMatrix[i][j] = {token: null, image: null, borderClass: null}
        if(this.selectedToken?.xPosition === i && this.selectedToken.yPosition === j) {
          this.mapMatrix[i][j].borderClass = 'red-border';
        }
        if(this.selectedPosition?.xPosition === i && this.selectedPosition.yPosition === j) {
          this.mapMatrix[i][j].borderClass = 'green-border';
        }
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

  onCellClicked(xPosition : number, yPosition: number) {
    this.selectedPosition = {xPosition, yPosition};
    var tokenAtPosition = this.map.tokens.find(token => {
      return token.xPosition === xPosition && token.yPosition === yPosition
    })
    if (tokenAtPosition && tokenAtPosition !== undefined) {
      this.selectedToken = tokenAtPosition;
    }
    if(this.selectedToken && (
      this.selectedToken.xPosition !== this.selectedPosition.xPosition || this.selectedToken.yPosition !== this.selectedToken.yPosition
      )) {
        this.showMoveMessage = true;
        this.moveMessage = `Move token from ${this.selectedToken.xPosition}, ${this.selectedToken.yPosition} to ${this.selectedPosition.xPosition}, ${this.selectedPosition.yPosition}?` 
    }
    this.generateMapMatrix();
  }

  onMoveButtonClicked() {
    const index = this.map.tokens.findIndex(token => {
      return token.tokenId === this.selectedToken?.tokenId
    })
    if (this.selectedPosition !== null) {
      this.map.tokens[index].xPosition = this.selectedPosition.xPosition;
      this.map.tokens[index].yPosition = this.selectedPosition.yPosition;
    }
    this.generateMapMatrix();
    this.tokenService.updateToken(this.map.tokens[index]).subscribe();
  }
}
