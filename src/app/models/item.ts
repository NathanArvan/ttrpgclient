import { Ability } from "./ability";
import { Position} from "./position"

export interface Item {
    itemId: number;
    name: string;
    weight: number;
    abilities: Ability[];
    position: Position;
}

export interface CreateItemDto {
    name: string;
    weight: number | null;
    abilityIds: number[] | null;
}