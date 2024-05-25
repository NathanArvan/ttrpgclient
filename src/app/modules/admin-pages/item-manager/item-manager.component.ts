import { Component, OnInit } from '@angular/core';
import { CreateItemDto, Item } from '../../../models/item';
import { ItemService } from '../../../services/item.service';
import { AbilityService } from '../../../services/ability.service';
import { Ability } from '../../../models/ability';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-manager',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './item-manager.component.html',
  styleUrl: './item-manager.component.css'
})
export class ItemManagerComponent implements OnInit {

  items: Item[] | null = null;
  abilities: Ability[] | null = null;
  createItemForm = new FormGroup({
    name: new FormControl<string|null>(null),
    weight: new FormControl<number | null>(null),
    abilities: new FormControl<Ability[]>([])
  })

  constructor(
    private itemService: ItemService,
    private abilityService: AbilityService
  ){}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    })
    this.abilityService.getAbilities().subscribe(abilities => {
      this.abilities = abilities;
    })
  }

  createItem() {
    if(this.createItemForm.valid && this.createItemForm.controls.name.value !== null) {
      const abilities = this.createItemForm.controls.abilities.value;
      let abilityIds: number[] = [];
      if (abilities !== null && abilities.length > 0) {
        abilityIds = abilities.map(ability => ability.abilityId)
      }
      const payload : CreateItemDto = {
        name: this.createItemForm.controls.name.value,
        weight: this.createItemForm.controls.weight.value,
        abilityIds: abilityIds
      }

      this.itemService.createItem(payload).subscribe();
    }
  }
}
