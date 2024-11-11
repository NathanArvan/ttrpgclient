import { Ability } from "./ability";

export interface Item {
    itemId: number;
    name: string;
    weight: number;
    abilities: Ability[];
    xPosition: number;
    yPosition: number;
}

export interface CreateItemDto {
    name: string;
    weight: number | null;
    abilityIds: number[] | null;
}