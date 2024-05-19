import { Component, OnInit } from '@angular/core';
import { Ability, CreateAbilityDTO } from '../../../models/ability';
import { AbilityService } from '../../../services/ability.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ability-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ability-manager.component.html',
  styleUrl: './ability-manager.component.css'
})
export class AbilityManagerComponent implements OnInit{

  abilities: Ability[] | null = null;
  createAbilityForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null),
    target: new FormControl<any | null>(null),
    effect: new FormControl<any | null>(null),
    range: new FormControl<number | null>(null),
    duration: new FormControl<number | null>(null),
    requirements: new FormControl<any | null>(null)
  })

  constructor(
    private abilityService: AbilityService
  ) {

  }

  ngOnInit(): void {
    this.abilityService.getAbilities().subscribe(abilities => {
      this.abilities = abilities;
    })
  }

  createAbility() {
    if (this.createAbilityForm.valid && this.createAbilityForm.controls.name.value !== null) {
      const payload : CreateAbilityDTO = {
        name: this.createAbilityForm.controls.name.value,
        description: this.createAbilityForm.controls.description.value,
        target: this.createAbilityForm.controls.target.value,
        effect: this.createAbilityForm.controls.effect.value,
        range: this.createAbilityForm.controls.range.value,
        duration: this.createAbilityForm.controls.duration.value,
        requirements: this.createAbilityForm.controls.requirements.value
      };
      this.abilityService.createAbility(payload).subscribe();
    }

  }

}
