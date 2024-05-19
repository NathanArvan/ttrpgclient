export interface Ability {
    abilityId: number;
    name: string;
    description: string;
    target: any;
    effect: any;
    range: number;
    duration: number;
    requirements: any;
}

export interface CreateAbilityDTO {
    name: string;
    description: string | null;
    target: any | null;
    effect: any | null;
    range: number | null;
    duration: number | null;
    requirements: any | null;
}