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
      this.load.setBaseURL('https://labs.phaser.io');

      this.load.image('sky', 'assets/skies/space3.png');
      this.load.image('logo', 'assets/sprites/phaser3-logo.png');
      this.load.image('red', 'assets/particles/red.png');
  }

  create ()
  {
      this.add.image(400, 300, 'sky');

      const particles = this.add.particles(0, 0, 'red', {
          speed: 100,
          scale: { start: 1, end: 0 },
          blendMode: 'ADD'
      });

      const logo = this.physics.add.image(400, 100, 'logo');

      logo.setVelocity(100, 200);
      logo.setBounce(1, 1);
      logo.setCollideWorldBounds(true);

      particles.startFollow(logo);
  }

  
}