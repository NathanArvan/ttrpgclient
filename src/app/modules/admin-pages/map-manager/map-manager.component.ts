import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Map, MapCreateDTO } from '../../../models/map';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-map-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-manager.component.html',
  styleUrl: './map-manager.component.css'
})
export class MapManagerComponent implements OnInit{

  public maps: Map[] = [];
  public createMapForm = new FormBuilder().group({
    width: new FormControl<number | null>(null, Validators.required),
    length: new FormControl<number | null>(null, Validators.required),
  }
  )
    


  constructor(
    private mapService: MapService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.mapService.getMaps().subscribe(maps => {
      this.maps = maps;
    })
  }

  createSubmitClicked() {
    if (this.createMapForm.valid) {
      const payload: MapCreateDTO = {
        width: this.createMapForm.controls.width.value as number,
        length: this.createMapForm.controls.length.value as number,
        campaignId: null,
        image: null,
      }
      this.mapService.createMap(payload)
    }
  }
}
