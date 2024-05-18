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