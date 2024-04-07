import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Map, MapCreateDTO } from '../../../models/map';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-map-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './map-manager.component.html',
  styleUrl: './map-manager.component.css'
})
export class MapManagerComponent implements OnInit{

  public maps: Map[] = [];
  public createMapForm = new FormGroup({
    width: new FormControl<number | null>(null, Validators.required),
    length: new FormControl<number | null>(null, Validators.required),
  }
  )
    


  constructor(
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
    this.mapService.getMaps().subscribe(maps => {
      this.maps = maps;
    })
  }

  createSubmitClicked() {
    console.log(this.createMapForm)
    if (this.createMapForm.valid) {
      const payload: MapCreateDTO = {
        width: this.createMapForm.controls.width.value as number,
        length: this.createMapForm.controls.length.value as number,
        campaignId: null,
        image: null,
      }
      console.log(payload)
      this.mapService.createMap(payload).subscribe(map => {
        this.maps.push(map);
      })
    }
  }
}
