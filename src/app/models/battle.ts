import { Character } from "./character";
import { Item } from "./item";
import { User } from "./user";

export interface Battle {
    battleId: number;
    turn: number;
    characters: Character[] | null;
    items: Item[];
}

export interface UserJoinedDTO {
    battleId: number;
    user: User;
}

export interface CharacterMessageDTO {
    battleId: number;
    character: Character;
}