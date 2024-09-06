import { Character } from "./character";

export interface Battle {
    battleId: number;
    turn: number;
    characters: Character[] | null;
}