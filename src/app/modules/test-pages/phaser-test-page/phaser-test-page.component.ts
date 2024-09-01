import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';

@Component({
  selector: 'app-phaser-test-page',
  standalone: true,
  imports: [],
  templateUrl: './phaser-test-page.component.html',
  styleUrl: './phaser-test-page.component.css'
})
export class PhaserTestPageComponent implements OnInit {
  public phaserGame!: Phaser.Game;
  private config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x:0, y: 200 }
        }
    }
  };

  constructor() {  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }
}

class Example extends Phaser.Scene {
  preload ()
  {
      this.load.setBaseURL('http://localhost:4200');

      this.load.image('background', 'assets/game-art/World-Atlas/Social/01.png');
  }

  create ()
  {
      this.add.image(400, 300, 'background');
  }

  
}