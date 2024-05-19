import { Ability } from "./ability";

export interface Item {
    itemId: number;
    name: string;
    weight: number;
    abilities: Ability[];
}

export interface CreateItemDto {
    name: string;
    weight: number | null;
    abilities: Ability[] | null;
}